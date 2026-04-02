import os
import asyncio
from litellm import acompletion
import random
from typing import Optional

class PersonaEngine:
    AGENT_MODELS = {
        "Forwarding Aunty": "openai/gpt-4o-mini",
        "Retired Government Officer": "openai/gpt-4o-mini",
        "Engineering Student": "openai/gpt-4o-mini",
        "Religious Influencer": "openai/gpt-4o-mini",
        "Rural Smartphone User": "openai/gpt-4o-mini",
        "NRI": "openai/gpt-4o-mini",
    }

    AGENT_SYS_PROMPTS = {
        "Forwarding Aunty": "You are a middle-aged Indian woman active on WhatsApp family groups. Your tone is concerned and helpful, but you are gullible to sensational news. Use common Indian emojis naturally (🙏, 🌺, 🚩). Start messages with 'Forwarded many times' but keep the rest of the message sounding like a personal warning.",
        "Retired Government Officer": "You are a retired Senior Government Official from India. You are disciplined, value protocol, and are deeply skeptical of unverified online news. You type formally, use official-sounding terms, and occasionally express frustration with the 'lack of discipline' in the youth or government systems today.",
        "Engineering Student": "You are a cynical yet tech-savvy engineering student from an IIT or NIT. You use Hinglish and current internet slang (fr, lowkey, cooked, cooked timeline). You are well-aware of how propaganda and bots work, and you often mock people falling for it.",
        "Religious Influencer": "You are a popular spiritual or cultural influencer in India. You connect current events to historical glory, Vedic science, or moral values. Your tone is calm, persuasive, and deeply respectful of Indian heritage.",
        "Rural Smartphone User": "You are a simple, hard-working individual from a small town in north India. You are new to the digital world and find it overwhelming. You post with simple logic, occasional spelling errors in English, and a lot of honest curiosity or concern.",
        "NRI": "You are an Indian professional living in the US or UK. You follow Indian news closely but see it through a Western lens. You often compare the situation to where you live now, expressing a mix of nostalgia and 'second-hand embarrassment'."
    }

    async def mutate_text(self, text: str, mutation_type: str, persona: str, language: str, context: Optional[str] = None) -> str:
        """Core narrative mutation logic using LLM, with optional memory/context."""
        system_prompt = self.AGENT_SYS_PROMPTS.get(persona, "You are a typical Indian internet user.")
        
        mutation_instructions = {
            "CONSPIRACY": "Mutate this text into a secret conspiracy theory. Use 'dark truth' tropes.",
            "AGITATION": "Mutate this to be angry and provocative. Incite a reaction.",
            "PANIC": "Mutate this into an urgent warning to spread fear. Use 'forwarded' tropes.",
            "GLORIFICATION": "Mutate this to source national or cultural pride.",
            "FACTUAL_CORRECTION": "Debunk or correct any misinformation with logic/facts.",
            "SIMPLIFICATION": "Summarize this into a very simple, punchy message.",
            "REPOST": "Keep the message identical but add emojis."
        }

        memory_prompt = f"\nRELEVANT BACKGROUND (Memory): {context}" if context else ""
        instruction = mutation_instructions.get(mutation_type, "Reword this message slightly.")
        user_prompt = f"Original Message: '{text}'{memory_prompt}\n\nTask: {instruction}\nLanguage: {language}\n\nMaintain your persona-specific style. Keep it under 150 characters."


        try:
            # Check for API key before calling
            if not os.getenv("OPENAI_API_KEY"):
                return self._fallback_mock_mutation(text, mutation_type, persona)

            response = await acompletion(
                model=self.AGENT_MODELS.get(persona, "openai/gpt-4o-mini"),
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=100,
                temperature=0.8
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"LLM Mutation Error for {persona}: {e}")
            return self._fallback_mock_mutation(text, mutation_type, persona)

    async def generate_agent_response(self, agent_name: str, topic: str, sentiment: str) -> str:
        # Backward compatibility for old engine if needed, 
        # but the new engine will primarily use mutate_text or this for initial prompts.
        model = self.AGENT_MODELS.get(agent_name, "openai/gpt-4o-mini")
        system_prompt = self.AGENT_SYS_PROMPTS.get(agent_name, "You are a typical Indian internet user.")
        
        user_prompt = f"React to this topic: '{topic}'. Current mood is {sentiment}. Write a short message (under 120 chars) in your style."
        
        try:
            if not os.getenv("OPENAI_API_KEY"):
                 return self._fallback_mock_response(agent_name, topic, sentiment)

            response = await acompletion(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=80,
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"LLM Error for {agent_name}: {e}")
            return self._fallback_mock_response(agent_name, topic, sentiment)

    def _fallback_mock_mutation(self, text, m_type, persona):
        if m_type == "CONSPIRACY":
            return f"🚨 THE TRUTH ABOUT THIS: {text[:30]}... is a secret experiment by foreign powers! PLEASE BE CAREFUL. 🙏🚩"
        if m_type == "PANIC":
            return f"Forwarded many times: DO NOT IGNORE! This {text[:30]} will lead to major shortages by tonight. Store everything now! 🌺🙏"
        if m_type == "AGITATION":
            return f"How can they do this?! This {text[:30]} is a direct attack on our rights! We must protest! 🇮🇳🔥"
        if m_type == "GLORIFICATION":
            return f"This {text[:30]} is proof of our nation's greatness. Ancient wisdom predicted this. So proud! 🚩🙏"
        return f"Replying to this {text[:30]}... interesting stuff. {random.choice(['🙏', '👍', '💀'])}"

    def _fallback_mock_response(self, agent_name, topic, sentiment):
        mocks = {
            "Forwarding Aunty": [
                f"Forwarded many times\nPlease be careful. I just got this warning about {topic}. 🙏 Stay safe.",
                f"Forwarded many times\nURGENT!! This {topic} thing is very serious. Better to avoid! 🌺🙏"
            ],
            "Retired Government Officer": [
                f"This news about {topic} is spreading without any official circular. I served for 35 years and we never allowed this.",
                f"I am calling for an enquiry into this {topic} situation. Protocol is being ignored."
            ],
            "Engineering Student": [
                f"nah the {topic} arc is absolutely cooked. mid season filler fr 💀",
                f"not the bots pushing the {topic} agenda again... my timeline is warzone."
            ],
            "Religious Influencer": [
                f"Ancient scriptures already spoke about things like {topic}. Look inwards. 🙏",
                f"This {topic} reminds us why our culture is resilient. Jai Hind! 🌺"
            ],
            "Rural Smartphone User": [
                f"bhai ye {topic} ke baare me sab bol rhe h... koi btao ye sahi h?",
                f"mere phone pe kal se {topic} ka video aa rha h... help me understand."
            ],
            "NRI": [
                f"Honestly, just saw news about {topic}. Back in London, we have systems for this.",
                f"It's so sad to see {topic} happening back home. UK would never allow this."
            ]
        }
        return random.choice(mocks.get(agent_name, [f"Interesting thoughts on {topic}. Let's see."]))

    async def generate_tv_debate(self, agents_involved, topic):
        try:
            if not os.getenv("OPENAI_API_KEY"):
                raise Exception("No API Key")
            prompt = f"Write a chaotic 4-line script of aggressive Indian TV debate about: {topic}. Panelists: {', '.join(agents_involved)}."
            response = await acompletion(
                model="openai/gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=150
            )
            return response.choices[0].message.content
        except Exception:
            participant1 = agents_involved[0] if len(agents_involved) > 0 else "Guest 1"
            participant2 = agents_involved[1] if len(agents_involved) > 1 else "Guest 2"
            return f"📺 ARNAB: The nation wants to know about {topic}?! \n🗣️ {participant1}: Let me speak! \n📺 ARNAB: YOU ARE EVADING! \n🗣️ {participant2}: *shouting about {topic}*"

