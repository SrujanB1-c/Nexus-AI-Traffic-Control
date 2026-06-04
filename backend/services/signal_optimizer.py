class SignalOptimizer:

    def optimize(
        self,
        queue_length,
        congestion
    ):

        if congestion > 70:

            return {

                "green":
                    70,

                "red":
                    20
            }

        return {

            "green":
                45,

            "red":
                45
        }