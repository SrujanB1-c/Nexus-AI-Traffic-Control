import random

class ParkingEngine:

    def status(self):

        return {

            "available":
                random.randint(
                    100,
                    1000
                ),

            "occupied":
                random.randint(
                    1000,
                    5000
                )
        }