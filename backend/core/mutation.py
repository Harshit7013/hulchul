import random
import time
from typing import Dict, Optional, List, Any
import networkx as nx
from pydantic import BaseModel

class Narrative(BaseModel):
    id: str
    parent_id: Optional[str] = None
    original_id: str # Root narrative ID
    content: str
    author_id: str
    mutation_type: str = "ORIGINAL" # ORIGINAL, CONSPIRACY, PANIC, etc.
    timestamp: float
    depth: int = 0
    platform: str
    metadata: Dict[str, Any] = {}

class TrustGraph:
    def __init__(self, agents: List[Any]):
        self.G = nx.DiGraph()
        for agent in agents:
            # We use dict(agent) if it's a Pydantic model
            agent_data = agent.model_dump() if hasattr(agent, 'model_dump') else agent
            self.G.add_node(agent_data["id"], **agent_data)
            
        # Initialize sparse trust connections
        agent_ids = [a.id if hasattr(a, 'id') else a["id"] for a in agents]
        for a_id in agent_ids:
            # Each agent trusts a few others initially (e.g., family/friends)
            neighbors = random.sample(agent_ids, min(len(agent_ids), random.randint(3, 8)))
            for n_id in neighbors:
                if a_id != n_id:
                    # Initial trust based on region/persona similarity
                    self.G.add_edge(n_id, a_id, trust=random.uniform(0.4, 0.7))

    def update_trust(self, source_id: str, target_id: str, change: float):
        if self.G.has_edge(source_id, target_id):
            current = self.G[source_id][target_id]["trust"]
            self.G[source_id][target_id]["trust"] = min(1.0, max(0.0, current + change))

    def get_trust(self, source_id: str, target_id: str) -> float:
        if self.G.has_edge(source_id, target_id):
            return self.G[source_id][target_id]["trust"]
        return 0.2 # Base low trust for strangers

class MutationEngine:
    def __init__(self, llm_engine: Any):
        self.llm = llm_engine
        self.narratives: Dict[str, Narrative] = {}
        self.lineage: Dict[str, List[str]] = {} # parent_id -> [child_ids]

    def get_mutation_type(self, agent: Any, emotion: str) -> str:
        if agent.bias_score > 0.8:
            return "CONSPIRACY"
        if emotion == "anger":
            return "AGITATION"
        if emotion == "fear":
            return "PANIC"
        if emotion == "pride":
            return "GLORIFICATION"
        if agent.bias_score < 0.3:
            return "FACTUAL_CORRECTION"
        return "SIMPLIFICATION"

    def calculate_mutation_probability(self, agent: Any, narrative: Narrative) -> float:
        # Base probability of forwarding
        prob = 0.1
        # Emotion boost
        if agent.emotional_state in ["anger", "fear", "pride"]:
            prob += 0.4
        # Bias alignment (simplified check)
        prob += agent.bias_score * 0.3
        # Activity level
        prob *= agent.activity_level
        return min(0.95, prob)

    async def process_message(self, agent: Any, parent_narrative: Narrative, trust_score: float) -> Optional[Narrative]:
        # Decode whether to forward/mutate
        forward_prob = self.calculate_mutation_probability(agent, parent_narrative)
        forward_prob *= (0.5 + 0.5 * trust_score)

        if random.random() > forward_prob:
            return None # Ignored

        # Reinforce with memory (justifying new beliefs)
        memory_context = ". ".join([m.get("content", "") for m in agent.memory[-3:]]) if agent.memory else None

        # Decide if it mutates or stays same
        mutation_chance = 0.3 + (agent.bias_score * 0.5)
        if random.random() < mutation_chance:
            m_type = self.get_mutation_type(agent, agent.emotional_state)
            new_content = await self.llm.mutate_text(
                text=parent_narrative.content,
                mutation_type=m_type,
                persona=agent.persona,
                language=agent.language,
                context=memory_context
            )
        else:
            m_type = "REPOST"
            new_content = parent_narrative.content

        new_narrative = Narrative(
            id=f"msg_{int(time.time()*1000)}_{random.randint(0,999)}",
            parent_id=parent_narrative.id,
            original_id=parent_narrative.original_id,
            content=new_content,
            author_id=agent.id,
            mutation_type=m_type,
            timestamp=time.time(),
            depth=parent_narrative.depth + 1,
            platform=random.choice(agent.platform_preference)
        )
        
        # Add to agent's own memory record
        agent.memory.append({"id": new_narrative.id, "content": new_narrative.content})
        
        self.narratives[new_narrative.id] = new_narrative
        if parent_narrative.id not in self.lineage:
            self.lineage[parent_narrative.id] = []
        self.lineage[parent_narrative.id].append(new_narrative.id)
        
        return new_narrative


