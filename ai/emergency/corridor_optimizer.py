import networkx as nx

class CorridorOptimizer:

    def build_route(
        self,
        graph,
        source,
        destination
    ):

        path = nx.shortest_path(

            graph,

            source,

            destination,

            weight="time"
        )

        return path