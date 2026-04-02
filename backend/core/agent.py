import random
from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class Agent(BaseModel):
    id: str
    persona: str
    name: str # Adding name for better simulation logs
    language: str
    bias_score: float  # 0.0 to 1.0
    activity_level: float # 0.0 to 1.0 (frequency of participation)
    region: str # North, South, East, West
    emotional_state: str = "neutral" # current emotion
    thresholds: Dict[str, float] # anger, fear, pride thresholds
    memory: List[Dict] = [] # Past messages/narratives
    trust_profile: Dict[str, float] = {} # agent_id -> trust_score (0-1)
    platform_preference: List[str] = ["WhatsApp"] # Primary platforms used

class AgentGenerator:
    PERSONAS = [
        {"type": "Forwarding Aunty", "base_bias": 0.6, "activity": 0.8, "platforms": ["WhatsApp", "ShareChat"]},
        {"type": "Engineering Student", "base_bias": 0.3, "activity": 0.6, "platforms": ["Twitter", "Reddit"]},
        {"type": "Rural Smartphone User", "base_bias": 0.5, "activity": 0.7, "platforms": ["ShareChat", "WhatsApp"]},
        {"type": "NRI", "base_bias": 0.4, "activity": 0.5, "platforms": ["WhatsApp", "Twitter"]},
        {"type": "Religious Influencer", "base_bias": 0.8, "activity": 0.9, "platforms": ["YouTube", "Twitter", "WhatsApp"]},
        {"type": "Retired Government Officer", "base_bias": 0.2, "activity": 0.4, "platforms": ["WhatsApp", "Facebook"]}
    ]
    
    REGIONS = ["North", "South", "East", "West"]
    LANGUAGES = ["Hinglish", "Tamil", "Bengali", "English"]
    
    NAMES = {
        "North": ["Amit", "Rajesh", "Sunita", "Priyanka", "Vikram", "Sanjay"],
        "South": ["Karthik", "Lakshmi", "Venkatesh", "Anitha", "Sridhar", "Meena"],
        "East": ["Subhash", "Debasmita", "Joyjeet", "Ananya", "Prabir", "Rupa"],
        "West": ["Parth", "Dhwani", "Sagar", "Bhakti", "Rahul", "Tanvi"]
    }

    @classmethod
    def generate(cls, count: int = 100) -> List[Agent]:
        agents = []
        for i in range(count):
            p_config = random.choice(cls.PERSONAS)
            region = random.choice(cls.REGIONS)
            name = random.choice(cls.NAMES[region]) + f"_{i}"
            
            # Persona-specific language bias
            if p_config["type"] in ["Engineering Student", "NRI"]:
                language = "English" if random.random() > 0.3 else "Hinglish"
            elif p_config["type"] == "Rural Smartphone User":
                language = random.choice(["Hindi", "Tamil", "Bengali"]) if region != "North" else "Hindi"
            else:
                language = random.choice(cls.LANGUAGES)

            # Generate thresholds based on persona
            thresholds = {
                "anger": random.uniform(0.4, 0.9),
                "fear": random.uniform(0.3, 0.8),
                "pride": random.uniform(0.3, 0.9)
            }
            
            # Adjust based on persona
            if p_config["type"] == "Religious Influencer":
                thresholds["pride"] = random.uniform(0.1, 0.4) # Easily triggered by pride
            if p_config["type"] == "Forwarding Aunty":
                thresholds["fear"] = random.uniform(0.1, 0.4) # Easily triggered by fear

            agents.append(Agent(
                id=f"agent_{i:03d}",
                persona=p_config["type"],
                name=name,
                language=language,
                bias_score=min(1.0, max(0.0, p_config["base_bias"] + random.uniform(-0.2, 0.2))),
                activity_level=min(1.0, max(0.0, p_config["activity"] + random.uniform(-0.1, 0.1))),
                region=region,
                thresholds=thresholds,
                platform_preference=p_config["platforms"]
            ))
        return agents

