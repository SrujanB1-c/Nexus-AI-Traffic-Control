class RLSignalController:

    def optimize(
        self,
        queue_length,
        avg_speed,
        emergency=False
    ):

        if emergency:
            return {
                "green": 90,
                "red": 10
            }

        if queue_length > 40:
            return {
                "green": 70,
                "red": 20
            }

        return {
            "green": 45,
            "red": 45
        }