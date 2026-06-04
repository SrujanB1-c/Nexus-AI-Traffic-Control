class AccidentDetector:

    def detect(
        self,
        speed_drop,
        collision_score
    ):

        if (
            speed_drop > 0.8
            and
            collision_score > 0.7
        ):

            return True

        return False