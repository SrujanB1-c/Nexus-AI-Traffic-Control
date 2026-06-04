from datetime import datetime

class EmergencyEngine:

    def activate_corridor(
        self,
        vehicle_id,
        route
    ):

        return {

            "vehicle":
                vehicle_id,

            "route":
                route,

            "activated":
                True,

            "timestamp":
                datetime.utcnow().isoformat()
        }