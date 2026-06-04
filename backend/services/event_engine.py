import random

class EventEngine:

    def generate_incident(self):

        probability = random.random()

        if probability > 0.98:

            return {

                "type":
                    "accident",

                "severity":
                    random.choice([
                        "low",
                        "medium",
                        "high"
                    ])
            }

        return None