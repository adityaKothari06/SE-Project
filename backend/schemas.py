from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# EVENT SCHEMAS
class EventCreate(BaseModel):
    institution_name: Optional[str] = None
    address: str
    city: str
    poc_name: str
    poc_mobile: str
    food_type: str
    food_quantity: int
    duration_minutes: int

class EventResponse(BaseModel):
    id: int
    institution_name: Optional[str]
    address: str
    city: str
    poc_name: str
    poc_mobile: str
    food_type: str
    food_quantity: int
    duration_minutes: int
    pickup_end: datetime
    status: str
    created_at: datetime
    donor_firebase_uid: str

    class Config:
        from_attributes = True

# RESERVATION SCHEMAS
class ReservationCreate(BaseModel):
    quantity_requested: int

class CollectionUpdate(BaseModel):
    collection_percentage: float

class ReservationResponse(BaseModel):
    id: int
    event_id: int
    recipient_firebase_uid: str
    quantity_requested: int
    reserved_at: datetime
    collection_percentage: Optional[float]
    status: str

    class Config:
        from_attributes = True