import asyncio
import random
import time
from typing import List, Dict, Any, AsyncGenerator

from simulation.state import SimulationState
from simulation.llm import PersonaEngine
from simulation.analytics import AnalyticsLayer
from core.agent import Agent, AgentGenerator
from core.mutation import MutationEngine, TrustGraph, Narrative

class SimulationEngine:
    def __init__(self):
        self.ai = PersonaEngine()
        self.mutation_engine = MutationEngine(self.ai)
        self.state = SimulationState()
        self.trust_graph = None
        self.agents: List[Agent] = []

    async def stream_simulation(self, processed: Dict[str, Any], agents: List[Agent]) -> AsyncGenerator[Dict[str, Any], None]:
        """Main entry point for starting a simulation stream."""
        self.agents = agents
        self.trust_graph = TrustGraph(agents)
        self.state = SimulationState()
        
        # 1. Create the Seed Narrative (Ground Truth)
        seed_narrative = Narrative(
            id=f"msg_000_root",
            parent_id=None,
            original_id="msg_000_root",
            content=processed["raw"],
            author_id="SYSTEM_SOURCE",
            mutation_type="ORIGINAL",
            timestamp=time.time(),
            depth=0,
            platform="NEWS"
        )
        self.state.update(seed_narrative)
        self.mutation_engine.narratives[seed_narrative.id] = seed_narrative
        
        yield {
            "event": "SIMULATION_START",
            "seed": seed_narrative.model_dump(),
            "agents_count": len(agents),
            "state": self.state.get_summary()
        }

        # 2. Simulation Loop (Discrete Steps)
        MAX_STEPS = 12
        for step in range(1, MAX_STEPS + 1):
            await asyncio.sleep(0.5) # Small gap between steps
            
            # Identify active agents for this step
            active_agents = [a for a in self.agents if random.random() < a.activity_level]
            
            step_actions = 0
            # Each active agent processes some narratives
            for agent in active_agents:
                # Agent reads 1-3 random recent narratives
                accessible_narratives = self.state.narratives[-20:] 
                if not accessible_narratives:
                    continue
                    
                target_count = random.randint(1, 2)
                to_read = random.sample(accessible_narratives, min(len(accessible_narratives), target_count))
                
                for parent_msg in to_read:
                    if parent_msg.author_id == agent.id:
                        continue
                        
                    trust_score = self.trust_graph.get_trust(agent.id, parent_msg.author_id)
                    new_narrative = await self.mutation_engine.process_message(agent, parent_msg, trust_score)
                    
                    if new_narrative:
                        self.state.update(new_narrative)
                        self.trust_graph.update_trust(agent.id, parent_msg.author_id, 0.05)
                        step_actions += 1
                        
                        yield {
                            "event": "NEW_MESSAGE",
                            "message": new_narrative.model_dump(),
                            "author": agent.model_dump(),
                            "mutation_type": new_narrative.mutation_type
                        }
                        await asyncio.sleep(random.uniform(0.1, 0.4)) # Stream jitter

            # Check for escalation
            if self.state.global_emotion["anger"] > 0.6 or self.state.global_emotion["fear"] > 0.7:
                participants = [a.name for a in random.sample(active_agents, min(len(active_agents), 3))]
                debate_script = await self.ai.generate_tv_debate(participants, processed['raw'])
                yield {
                    "event": "TV_DEBATE",
                    "participants": participants,
                    "script": debate_script
                }
                self.state.global_emotion["anger"] *= 0.7

            # Step Summary
            analytics = AnalyticsLayer.calculate_divergence(processed["raw"], self.state.narratives)
            yield {
                "event": "STEP_COMPLETE",
                "step": step,
                "telemetry": {
                    "global_emotion": self.state.global_emotion,
                    "divergence": analytics["divergence_index"],
                    "virality": AnalyticsLayer.get_virality_score(self.mutation_engine.lineage)
                }
            }


        # 3. Simulation End (Final Analytics)
        final_analytics = AnalyticsLayer.calculate_divergence(processed["raw"], self.state.narratives)
        final_analytics["virality"] = AnalyticsLayer.get_virality_score(self.mutation_engine.lineage)
        
        # Identify top influencers
        influencer_counts = {}
        for n in self.state.narratives:
            influencer_counts[n.author_id] = influencer_counts.get(n.author_id, 0) + 1
        
        top_influencers = sorted(influencer_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        yield {
            "event": "SIMULATION_END",
            "final_analytics": final_analytics,
            "top_influencers": top_influencers,
            "total_messages": len(self.state.narratives)
        }

