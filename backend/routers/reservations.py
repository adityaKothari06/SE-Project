from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Event, Reservation
from schemas import ReservationCreate, ReservationResponse
from datetime import datetime, timezone
from pydantic import BaseModel

router = APIRouter(
    prefix="/reservations",
    tags=["Reservations"]
)

class MessageResponse(BaseModel):
    message: str

# RESERVE FOOD
@router.post("/{event_id}", response_model=ReservationResponse)
def reserve_event(
    event_id: int,
    reservation: ReservationCreate,
    recipient_uid: str,
    db: Session = Depends(get_db)
):
    try:
        event = db.query(Event).filter(Event.id == event_id).with_for_update().first()
        
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        print(event.pickup_end)
        print("current time: ", datetime.utcnow())
        # event expiry check    
        if event.pickup_end < datetime.utcnow():
            event.status = "expired"
            db.commit()
            raise HTTPException(status_code=400, detail="Event Expired")

        if event.status != "active":
            raise HTTPException(status_code=400, detail="Event is not active")

        if reservation.quantity_requested > event.food_quantity:
            raise HTTPException(status_code=400, detail="Not enough food available")

        event.food_quantity -= reservation.quantity_requested

        event.status = "reserved" if event.food_quantity <= 0 else "active"

        new_reservation = Reservation(
            event_id=event_id,
            recipient_firebase_uid=recipient_uid,
            quantity_requested=reservation.quantity_requested,
            reserved_at=datetime.now()
        )

        db.add(new_reservation)
        db.commit()
        db.refresh(new_reservation)
        return new_reservation
    
    except Exception as e:
        db.rollback()
        raise e


# UNRESERVE FOOD
@router.post("/{event_id}/unreserve",response_model=MessageResponse)
def unreserve_event(
    event_id: int,
    recipient_uid: str,
    db: Session = Depends(get_db)
):
    try:
        reservation = db.query(Reservation).filter(
            Reservation.event_id == event_id,
            Reservation.recipient_firebase_uid == recipient_uid,
            Reservation.is_collected == 0
        ).first()

        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")

        event = db.query(Event).filter(Event.id == event_id).first()
        if not event:
            raise HTTPException(status_code=404,detail="Event not found")
        
        event.food_quantity += reservation.quantity_requested
        event.status = "active"

        db.delete(reservation)
        db.commit()
        return {"message": "Reservation cancelled successfully"}

    except Exception as e:
        db.rollback()
        raise e


# MARK AS COLLECTED
@router.post("/{event_id}/collect",response_model=MessageResponse)
def collect_food(
    event_id: int,
    recipient_uid: str,
    db: Session = Depends(get_db)
):
    try:
        reservation = db.query(Reservation).filter(
            Reservation.event_id == event_id,
            Reservation.recipient_firebase_uid == recipient_uid,
            Reservation.is_collected == 0
        ).first()

        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")

        reservation.is_collected = 1
        db.commit()
        return {"message": "Marked as collected successfully"}
    
    except Exception as e:
        db.rollback()
        raise e