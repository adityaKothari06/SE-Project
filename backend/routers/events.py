from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Event
from schemas import EventCreate, EventResponse
from datetime import datetime, timedelta
from typing import List

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)

# CREATE EVENT
@router.post("/", response_model=EventResponse)
def create_event(event: EventCreate, donor_uid: str, db: Session = Depends(get_db)):
    
    pickup_end = datetime.utcnow() + timedelta(minutes=event.duration_minutes)
    
    new_event = Event(
        institution_name=event.institution_name,
        address=event.address,
        city=event.city,
        poc_name=event.poc_name,
        poc_mobile=event.poc_mobile,
        food_type=event.food_type,
        food_quantity=event.food_quantity,
        duration_minutes=event.duration_minutes,
        pickup_end=pickup_end,
        donor_firebase_uid=donor_uid
    )
    
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


# GET ALL ACTIVE EVENTS BY CITY
@router.get("/", response_model=List[EventResponse])
def get_events(city: str, db: Session = Depends(get_db)):
    
    # auto expire events first
    now = datetime.utcnow()
    db.query(Event).filter(
        Event.status == "active",
        Event.pickup_end < now
    ).update({"status": "expired"})
    db.commit()
    
    events = db.query(Event).filter(
        Event.city == city,
        Event.status == "active"
    ).all()
    
    return events


# GET SINGLE EVENT
@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    
    event = db.query(Event).filter(Event.id == event_id).first()
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    return event     