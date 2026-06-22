# TenderFlow Backend

Minimal Express + MongoDB backend for the TenderFlow project.

Prerequisites
- Node.js (>=16)
- MongoDB running (local or remote)

Install

```powershell
cd backend
npm install
```

Create environment (copy `.env.example` to `.env`) and adjust `MONGO_URI` and `JWT_SECRET`.

Run

```powershell
npm run dev   # uses nodemon
npm start     # production
```

API quick list
- `POST /api/auth/register` {name,email,password}
- `POST /api/auth/login` {email,password}
- `GET /api/offers`
- `POST /api/offers` (auth)
- `GET /api/submissions/offer/:offerId` (auth)
- `POST /api/documents/upload` (auth, form-data file=file)
