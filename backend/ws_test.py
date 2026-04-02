import asyncio
import json

import websockets


async def main() -> None:
    uri = "ws://localhost:8000/stream"
    async with websockets.connect(uri) as ws:
        await ws.send(json.dumps({"prompt": "Test prompt for streaming"}))

        # Read a few messages then exit.
        for _ in range(3):
            msg = await ws.recv()
            print(msg)


if __name__ == "__main__":
    asyncio.run(main())

