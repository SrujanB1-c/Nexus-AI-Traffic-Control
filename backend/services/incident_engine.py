import random

class IncidentEngine:

    INCIDENTS = [

        "Accident",

        "Road Closure",

        "Heavy Traffic",

        "Emergency Vehicle",

        "Weather Hazard"
    ]

    def generate(self):

        if random.random() > 0.9:

            return {

                "type":
                    random.choice(
                        self.INCIDENTS
                    ),

                "severity":
                    random.choice([
                        "LOW",
                        "MEDIUM",
                        "HIGH"
                    ])
            }

        return None