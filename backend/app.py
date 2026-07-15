from config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import events, reservations

# tables in mysql
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION
)
# backend -> frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
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