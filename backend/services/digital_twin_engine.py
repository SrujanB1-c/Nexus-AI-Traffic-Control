import random
import uuid
from datetime import datetime

class Vehicle:

    def __init__(self):

        self.id = str(uuid.uuid4())

        self.x = random.randint(0, 100)

        self.y = random.randint(0, 100)

        self.speed = random.randint(20, 70)

        self.type = random.choice([
            "car",
            "bike",
            "bus",
            "truck"
        ])

    def update(self):

        self.x += self.speed * 0.01

        if self.x > 100:
            self.x = 0

class DigitalTwinEngine:

    def __init__(self):

        self.vehicles = [
            Vehicle()
            for _ in range(1000)
        ]

    def tick(self):

        for vehicle in self.vehicles:
            vehicle.update()

        return {

            "timestamp":
                datetime.utcnow().isoformat(),

            "vehicles": [

                {
                    "id": v.id,
                    "x": v.x,
                    "y": v.y,
                    "speed": v.speed,
                    "type": v.type
                }

                for v in self.vehicles
            ]
        }