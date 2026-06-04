import random

class AirQualityEngine:

    def calculate(self):

        return {

            "pm25":
                random.randint(
                    20,
                    200
                ),

            "co2":
                random.randint(
                    300,
                    1200
                ),

            "index":
                random.randint(
                    10,
                    100
                )
        }