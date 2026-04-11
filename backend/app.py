from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import events, reservations

# tables in mysql
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zero Waste Pantry API")

# backend -> frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# connect routers
app.include_router(events.router)
app.include_router(reservations.router)

@app.get("/")
def root():
    return {"message": "Zero Waste Pantry API is running!"}