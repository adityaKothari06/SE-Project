from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    institution_name = Column(String(255), nullable=True)
    address = Column(String(500), nullable=False)
    city = Column(String(255), nullable=False)
    poc_name = Column(String(255), nullable=False)
    poc_mobile = Column(String(10), nullable=False)
    food_type = Column(Enum("veg", "non-veg"), nullable=False)
    food_quantity = Column(Integer, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    pickup_end = Column(DateTime, nullable=False)
    status = Column(Enum("active", "reserved", "expired"), default="active")
    created_at = Column(DateTime,default=lambda: datetime.now(timezone.utc))
    donor_firebase_uid = Column(String(255), nullable=False)

    reservations = relationship("Reservation", back_populates="event")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    recipient_firebase_uid = Column(String(255), nullable=False)
    quantity_requested = Column(Integer, nullable=False)
    reserved_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    is_collected = Column(Integer, default=0)  # 0 = not collected, 1 = collected

    event = relationship("Event", back_populates="reservations")