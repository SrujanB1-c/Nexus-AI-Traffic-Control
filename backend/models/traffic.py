from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import DateTime

from database.postgres import Base

class TrafficData(Base):

    __tablename__ = "traffic_data"

    id = Column(Integer, primary_key=True)

    vehicle_count = Column(Integer)

    avg_speed = Column(Float)

    congestion = Column(Float)

    created_at = Column(DateTime)