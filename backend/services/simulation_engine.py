import random

class SimulationEngine:

    def __init__(self):

        self.time = 0

    def tick(self):

        self.time += 1

        return {

            "time": self.time,

            "traffic_density":
                random.randint(10,100),

            "average_speed":
                random.randint(20,80),

            "signal_efficiency":
                random.randint(50,100),

            "fuel_consumption":
                random.randint(500,2000)
        }