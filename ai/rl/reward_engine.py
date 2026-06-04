class RewardEngine:

    def calculate(
        self,
        avg_speed,
        queue_length,
        emissions
    ):

        reward = 0

        reward += avg_speed * 0.5

        reward -= queue_length * 0.3

        reward -= emissions * 0.2

        return reward