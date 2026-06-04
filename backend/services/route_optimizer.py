import networkx as nx

class RouteOptimizer:

    def shortest_route(
        self,
        graph,
        start,
        destination
    ):

        return nx.shortest_path(
            graph,
            start,
            destination,
            weight="cost"
        )