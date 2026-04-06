from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Event, Reservation
from schemas import ReservationCreate, CollectionUpdate, ReservationResponse
from datetime import datetime

router = APIRouter(
    prefix="/reservations",
    tags=["Reservations"]
)

# RESERVE FOOD
@router.post("/{event_id}", response_model=ReservationResponse)
def reserve_event(
    event_id: int,
    reservation: ReservationCreate,
    recipient_uid: str,
    db: Session = Depends(get_db)
):
    # check if event exists
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # check if event is active
    if event.status != "active":
        raise HTTPException(status_code=400, detail="Event is not active")

    # check if enough food is available
    if reservation.quantity_requested > event.food_quantity:
        raise HTTPException(status_code=400, detail="Not enough food available")

    # deduct quantity from event
    event.food_quantity -= reservation.quantity_requested

    # if no food left mark event as reserved
    if event.food_quantity == 0:
        event.status = "reserved"

    # create reservation record
    new_reservation = Reservation(
        event_id=event_id,
        recipient_firebase_uid=recipient_uid,
        quantity_requested=reservation.quantity_requested
    )

    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)
    return new_reservation


# UNRESERVE FOOD
@router.post("/{event_id}/unreserve")
def unreserve_event(
    event_id: int,
    recipient_uid: str,
    db: Session = Depends(get_db)
):
    # find the active reservation
    reservation = db.query(Reservation).filter(
        Reservation.event_id == event_id,
        Reservation.recipient_firebase_uid == recipient_uid,
        Reservation.status == "active"
    ).first()

    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    # add quantity back to event
    event = db.query(Event).filter(Event.id == event_id).first()
    event.food_quantity += reservation.quantity_requested
    event.status = "active"

    # cancel reservation
    reservation.status = "cancelled"

    db.commit()
    return {"message": "Reservation cancelled successfully"}


# REPORT COLLECTION AFTER PICKUP
@router.post("/{event_id}/collect")
def collect_food(
    event_id: int,
    collection: CollectionUpdate,
    recipient_uid: str,
    db: Session = Depends(get_db)
):
    # find the active reservation
    reservation = db.query(Reservation).filter(
        Reservation.event_id == event_id,
        Reservation.recipient_firebase_uid == recipient_uid,
        Reservation.status == "active"
    ).first()

    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")

    # save collection percentage
    reservation.collection_percentage = collection.collection_percentage
    reservation.status = "collected"

    db.commit()
    return {"message": "Collection reported successfully"}