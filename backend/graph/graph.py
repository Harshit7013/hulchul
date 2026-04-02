import networkx as nx


class KnowledgeGraph:
    def __init__(self):
        self.graph = nx.Graph()

    def add_interaction(self, a1, a2):
        self.graph.add_edge(a1, a2)
