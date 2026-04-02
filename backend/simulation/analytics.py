import numpy as np
from typing import List, Dict, Any
from core.mutation import Narrative

class AnalyticsLayer:
    @staticmethod
    def calculate_divergence(original_prompt: str, narratives: List[Narrative]) -> Dict[str, Any]:
        """Calculates how much the current narratives deviate from truth."""
        if not narratives:
            return {"divergence_index": 0, "belief_clusters": {}}

        # Logic: 
        # 0: FACTUAL_CORRECTION, ORIGINAL, REPOST, SIMPLIFICATION (Low divergence)
        # 0.5: GLORIFICATION
        # 0.8: PANIC, AGITATION
        # 1.0: CONSPIRACY (High divergence)
        
        weights = {
            "ORIGINAL": 0.0,
            "REPOST": 0.0,
            "SIMPLIFICATION": 0.1,
            "FACTUAL_CORRECTION": -0.2, # Actually reduces divergence
            "GLORIFICATION": 0.4,
            "PANIC": 0.7,
            "AGITATION": 0.8,
            "CONSPIRACY": 1.0
        }

        total_score = 0
        counts = {}
        for n in narratives:
            m_type = n.mutation_type
            total_score += weights.get(m_type, 0.2)
            counts[m_type] = counts.get(m_type, 0) + 1

        avg_divergence = max(0, min(1, total_score / len(narratives)))
        
        return {
            "divergence_index": round(avg_divergence * 100, 2),
            "belief_clusters": counts,
            "total_messages": len(narratives)
        }

    @staticmethod
    def get_virality_score(lineage: Dict[str, List[str]]) -> float:
        """Calculates a simple virality score based on branch factor."""
        if not lineage:
            return 0.0
        # Average number of children per parent
        total_children = sum(len(children) for children in lineage.values())
        return round(total_children / len(lineage), 2)
