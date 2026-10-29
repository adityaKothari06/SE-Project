from config import settings
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv
import time
import os
import certifi

# Determine port (TiDB uses 4000, local MySQL uses 3306)
db_port = int(getattr(settings, "DB_PORT", os.getenv("DB_PORT", 4000)))

DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username=settings.DB_USER,
    password=settings.DB_PASSWORD,
    host=settings.DB_HOST,
    port=db_port,
    database=settings.DB_NAME,
)

# Enable SSL automatically if connecting to TiDB Cloud
connect_args = {}
if "tidbcloud.com" in str(settings.DB_HOST):
    connect_args = {
        "ssl": {
            "ca": certifi.where(),
            "check_hostname": True,
        }
    }

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
)

# Wait for MySQL / TiDB
connected = False

for attempt in range(20):
    try:
        connection = engine.connect()
        connection.close()
        connected = True
        print("Connected to MySQL / TiDB!")
        break
    except OperationalError as e:
        print(f"Database not ready... retrying ({attempt + 1}/20). Error: {e}")
        time.sleep(3)

if not connected:
    raise RuntimeError("Could not connect to Database after multiple attempts.")

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