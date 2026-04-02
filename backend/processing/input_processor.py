import os

from openai import OpenAI

client = None
try:
    if os.getenv("OPENAI_API_KEY"):
        client = OpenAI()
except Exception:
    # If OpenAI client initialization fails, fall back to offline mode.
    client = None

cache = {}


class InputProcessor:
    def process(self, prompt: str):
        prompt = (prompt or "").strip()
        if not prompt:
            return {"raw": "", "analysis": ""}

        if prompt in cache:
            return cache[prompt]

        if client is None:
            # Offline fallback so the demo works without an API key.
            result = {
                "raw": prompt,
                "analysis": f"Offline analysis (no OPENAI_API_KEY). Prompt: {prompt}",
            }
            cache[prompt] = result
            return result

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": f"Extract topics, entities, sentiment:\n{prompt}",
                }
            ],
        )

        result = {
            "raw": prompt,
            "analysis": response.choices[0].message.content,
        }

        cache[prompt] = result
        return result
