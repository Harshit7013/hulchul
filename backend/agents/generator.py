from core.agent import AgentGenerator as CoreGenerator

class AgentGenerator:
    def generate_agents(self, count: int = 150):
        # returns List[Agent]
        return CoreGenerator.generate(count)

