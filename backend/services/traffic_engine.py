import random

class TrafficEngine:

    def generate(self):

        return {

            "vehicles":
                random.randint(5000, 20000),

            "avg_speed":
                random.randint(20, 70),

            "congestion":
                random.randint(10, 95),

            "signals":
                64,

            "incidents":
                random.randint(0, 5)
        }