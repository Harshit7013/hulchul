from fastapi import FastAPI, WebSocket
from starlette.websockets import WebSocketDisconnect

from agents.generator import AgentGenerator
from processing.input_processor import InputProcessor
from simulation.engine import SimulationEngine
from fastapi.middleware.cors import CORSMiddleware
import random
import asyncio

app = FastAPI(title="hulchul Production API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = SimulationEngine()
agent_gen = AgentGenerator()
processor = InputProcessor()

# Session storage for agents
sim_agents = []

@app.get("/health")
async def health():
    return {"status": "operational", "version": "1.0.0"}

@app.get("/agents")
async def list_agents():
    global sim_agents
    if not sim_agents:
        sim_agents = agent_gen.generate_agents(150)
    return [a.model_dump() for a in sim_agents]

@app.post("/simulate")
async def simulate(data: dict):
    prompt = data.get("prompt", "").strip()
    if not prompt:
        return {"error": "Prompt is required"}

    processed = processor.process(prompt)
    global sim_agents
    if not sim_agents:
        sim_agents = agent_gen.generate_agents(150)
    
    # Run a single yield for direct API if needed (though stream is preferred)
    async for step in engine.stream_simulation(processed, sim_agents):
        return step # return first step (START)

@app.websocket("/stream")
async def stream(ws: WebSocket):
    await ws.accept()
    try:
        data = await ws.receive_json()
        prompt = (data.get("prompt", "") or "").strip()
        if not prompt:
            await ws.send_json({"error": "Prompt is required"})
            await ws.close()
            return

        processed = processor.process(prompt)
        
        # Fresh agents for each run unless specified
        agents = agent_gen.generate_agents(150)

        async for event in engine.stream_simulation(processed, agents):
            try:
                await ws.send_json(event)
            except WebSocketDisconnect:
                break
        
        await ws.close()
    except Exception as e:
        print(f"WS Error: {e}")
        try:
            await ws.send_json({"error": str(e)})
            await ws.close()
        except:
            pass

@app.websocket("/telemetry")
async def telemetry(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            # Real telemetry from state if possible, else mock
            data = {
                "active_agents": 150,
                "global_volatility": round(random.uniform(0.1, 0.9), 2),
                "messages_per_sec": random.randint(100, 1000),
                "server_load": random.randint(30, 70),
                "divergence_index": random.randint(5, 45)
            }
            await ws.send_json(data)
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        pass

