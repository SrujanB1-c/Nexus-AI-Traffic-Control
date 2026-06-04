class MultiAgentController:

    def __init__(self):

        self.intersections = {}

    def register(
        self,
        intersection_id
    ):

        self.intersections[
            intersection_id
        ] = {}

    def optimize(self):

        for node in self.intersections:

            self.intersections[node] = {

                "green": 60,

                "red": 30
            }

        return self.intersections