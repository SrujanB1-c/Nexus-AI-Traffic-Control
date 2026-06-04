import random

class WeatherEngine:

    CONDITIONS = [

        "clear",

        "rain",

        "fog",

        "storm"
    ]

    def current(self):

        return {

            "condition":
                random.choice(
                    self.CONDITIONS
                ),

            "temperature":
                random.randint(
                    20,
                    40
                )
        }