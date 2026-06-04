class EmissionsEngine:

    def calculate(
        self,
        vehicles,
        avg_speed
    ):

        emissions = (
            vehicles * 0.2
        )

        reduction = (
            avg_speed * 0.1
        )

        return {

            "co2":
                emissions,

            "saved":
                reduction
        }