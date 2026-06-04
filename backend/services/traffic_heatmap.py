import random

class TrafficHeatMap:

    def generate(self):

        zones = []

        for i in range(100):

            zones.append({

                "x":
                    random.randint(0,100),

                "y":
                    random.randint(0,100),

                "intensity":
                    random.random()
            })

        return zones