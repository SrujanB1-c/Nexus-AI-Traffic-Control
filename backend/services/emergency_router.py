import networkx as nx

class EmergencyRouter:

    def route(
        self,
        graph,
        source,
        destination
    ):

        return nx.shortest_path(
            graph,
            source,
            destination,
            weight="travel_time"
        )