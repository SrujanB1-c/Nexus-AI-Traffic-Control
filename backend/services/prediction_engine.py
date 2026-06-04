import random

class PredictionEngine:

    def predict(self):

        return {

            "5min":
                random.randint(10, 30),

            "15min":
                random.randint(20, 50),

            "30min":
                random.randint(30, 80),

            "1hour":
                random.randint(40, 100)
        }