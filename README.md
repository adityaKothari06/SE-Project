# Zero Waste Pantry (ZWP)

**Zero Waste Pantry (ZWP)** is a web-based coordination platform designed to redistribute large-scale food surplus to NGOs and individual volunteers. By acting as a communication bridge between institutional donors and food collectors, ZWP aims to significantly reduce food wastage.

### 🎯 SDG Alignment
This project directly contributes to the United Nations Sustainable Development Goals:
* **SDG 2 (Zero Hunger):** Facilitates the redistribution of surplus food to those in need, improving food security.
* **SDG 12 (Responsible Consumption and Production):** Intervenes before edible surplus becomes waste, promoting sustainable resource management.

---

## ✨ Core Features

* **Role-Based Access:** Dedicated interfaces for **Donors** (institutions posting food) and **Recipients** (users reserving food).
* **Event Creation & Listing:** Donors can post active surplus "Events" detailing food type, quantity, location, and a strict pickup window.
* **Real-Time Expiry Management:** Events feature a live countdown timer. The system automatically marks listings as "Expired" and disables reservations the exact minute the pickup window closes.
* **Secure Reservations:** Authenticated recipients can lock in reservations, while the backend prevents overbooking.
* **Collection Verification (Anti No-Show):** Recipients must report the exact percentage of food collected (0-100%) upon arriving at the donor site. The system automatically relists uncollected food and tracks user reliability to flag repeated "no-shows".
* **OTP Authentication:** Secure mobile verification ensures reliable communication and user accountability.

---

## 🏗️ System Architecture

The platform operates as a standalone web application using a standard three-tier architecture:
* **Frontend (User Interface):** Responsive web interface accessible via mobile and desktop browsers.
* **Backend (Business Logic Layer):** Handles REST-based request-response communication and core application logic (e.g., expiry triggers, validation).
* **Database (Data Storage Layer):** Stores critical entities including Event IDs, User Details, Timestamps, and Collection Percentages. 

---

## 🚀 Future Scope

The architecture is designed to scale to multiple cities with planned future enhancements including:
* GPS-based event filtering
* AI-based demand forecasting
* Automated SMS notifications
* Verified donor badges and user rating systems

---

## 👥 Team ZWP

*Developed as part of the Software Engineering coursework at Punjab Engineering College.*

* **Hitesh Kumar** 
* **Aditya Kothari**
* **Harshpreet Singh**

## 🛠️ Local Setup & Installation

### Prerequisites
* Python 3.12+
* Node.js 18+
* Docker & Docker Compose (recommended, handles MySQL for you)

### Quick Start (Docker Compose)
```bash
git clone https://github.com/adityakothari06/SE-Project.git
cd SE-Project
docker compose up --build
```
This spins up the backend (FastAPI), frontend (React/Vite), and a MySQL instance together, matching production behavior locally.

### Manual Setup (without Docker)

**Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # fill in your local DB credentials
uvicorn app:app --reload
```

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env        # set VITE_API_URL to your backend URL
npm run dev
```

**Database**
Run the schema in `database/init/zero_waste_pantry.sql` against your local MySQL instance to create the required tables.

---

## ☁️ Deployment Architecture

ZWP is deployed as two independently hosted services:

* **Backend + Database:** Hosted on **[Railway](https://railway.app)** — the FastAPI backend runs from its Dockerfile, connected to a managed MySQL instance provisioned in the same project.
* **Frontend:** Hosted on **[Vercel](https://vercel.com)**, built from the `frontend/` directory as a static Vite build, configured to call the Railway backend via the `VITE_API_URL` environment variable.

This split lets each layer scale and redeploy independently — a `git push` to the tracked branch triggers an automatic rebuild on both platforms.

*Project submitted to: Dr. Rakesh Bhatia*

---
*Note: This system does not guarantee food safety or provide delivery services; responsibility for food quality lies with the institutional donor.*
