import random
import uuid

class Vehicle:

    def __init__(self):

        self.id = str(uuid.uuid4())

        self.x = random.uniform(0, 100)

        self.y = random.uniform(0, 100)

        self.speed = random.uniform(20, 70)

        self.direction = random.uniform(0, 360)

    def update(self):

        self.x += self.speed * 0.01

        if self.x > 100:
            self.x = 0

class VehicleSimulator:

    def __init__(self):

        self.vehicles = [
            Vehicle()
            for _ in range(5000)
        ]

    def tick(self):

        for vehicle in self.vehicles:

            vehicle.update()

        return [

            {
                "id": v.id,
                "x": v.x,
                "y": v.y,
                "speed": v.speed
            }

            for v in self.vehicles
        ]