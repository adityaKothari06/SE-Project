from config import settings
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv
import time
import os


DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username=settings.DB_USER,
    password=settings.DB_PASSWORD,
    host=settings.DB_HOST,
    database=settings.DB_NAME,
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

# Wait for MySQL
connected = False

for attempt in range(20):
    try:
        connection = engine.connect()
        connection.close()
        connected = True
        print("Connected to MySQL!")
        break
    except OperationalError:
        print(f"MySQL not ready... retrying ({attempt + 1}/20)")
        time.sleep(3)

if not connected:
    raise RuntimeError("Could not connect to MySQL after multiple attempts.")

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()