from typing import List, Dict, Any
from core.mutation import Narrative

class SimulationState:
    def __init__(self):
        self.narratives: List[Narrative] = []
        self.step: int = 0
        self.global_emotion: Dict[str, float] = {"anger": 0.0, "fear": 0.0, "pride": 0.0}
        self.active_platforms: Dict[str, int] = {} # platform -> msg_count

    def update(self, narrative: Narrative):
        self.narratives.append(narrative)
        self.step += 1
        
        # Update global emotional pressure
        if narrative.mutation_type == "AGITATION":
            self.global_emotion["anger"] += 0.05
        elif narrative.mutation_type == "PANIC":
            self.global_emotion["fear"] += 0.05
        elif narrative.mutation_type == "GLORIFICATION":
            self.global_emotion["pride"] += 0.05
        
        # Decay global emotion slowly 
        for k in self.global_emotion:
            self.global_emotion[k] = max(0.0, min(1.0, self.global_emotion[k] * 0.98))

        # Platform stats
        self.active_platforms[narrative.platform] = self.active_platforms.get(narrative.platform, 0) + 1

    def get_summary(self):
        return {
            "step": self.step,
            "total_messages": len(self.narratives),
            "global_emotion": self.global_emotion,
            "platforms": self.active_platforms
        }
