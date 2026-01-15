<img width="2545" height="1266" alt="Screenshot 2026-01-15 172252" src="https://github.com/user-attachments/assets/b93a8e3b-6ef5-4bc7-8b36-8b9acce1a32d" />
<img width="2554" height="1291" alt="Screenshot 2026-01-15 172303" src="https://github.com/user-attachments/assets/b5b5d7c4-e3b1-4b9d-93ea-5395a69007ad" />
<img width="2545" height="1352" alt="Screenshot 2026-01-15 172516" src="https://github.com/user-attachments/assets/77f50ecb-0fd8-4090-af87-5771bfd1ed1b" />
<img width="2560" height="1440" alt="Screenshot 2026-01-15 171955" src="https://github.com/user-attachments/assets/7ad65290-b72d-4477-a3d1-2ef42891e365" />

<img width="2559" height="1368" alt="Screenshot 2026-01-15 172530" src="https://github.com/user-attachments/assets/46b2ac80-1e72-40a7-96a0-14d370f29bf0" />
<img width="2559" height="1350" alt="Screenshot 2026-01-15 172607" src="https://github.com/user-attachments/assets/573b726b-270d-413c-b1fa-749d85638b25" />
<img width="2559" height="1352" alt="Screenshot 2026-01-15 172618" src="https://github.com/user-attachments/assets/d704c924-e65c-41b3-81d2-eac213cf71df" />
<img width="2559" height="1407" alt="Screenshot 2026-01-15 172326" src="https://github.com/user-attachments/assets/dd7a5797-fedf-47f1-8cc0-9e64f2fa0475" />

1) Root README.md (create at project root)
# EMS (Employee Management System)

Full-stack EMS application.

- **Backend**: Node.js, Express, MongoDB, JWT, Swagger
- **Frontend**: React (Vite), React Router, Bootstrap

---

## Project Structure



ems/
backend/
frontend/
README.md


---

## Prerequisites

- Node.js (LTS recommended)
- MongoDB (local) OR MongoDB Atlas
- Git

---

## Setup & Run (Local)

### 1) Clone
```bash
git clone <your-repo-url>
cd ems

2) Backend setup
cd backend
npm install


Create backend/.env:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ems
JWT_SECRET=supersecret
CLIENT_URL=http://localhost:5173


Run backend:

npm run dev


Swagger docs:

http://localhost:5000/api-docs

3) Frontend setup

Open a new terminal:

cd frontend
npm install
npm run dev
Frontend:

http://localhost:5173

Roles & Permissions
Admin

Can list all non-admin users

Can create users (user/view)

Can edit users (name/role/profileImage)

Can delete users

Cannot assign admin role

Cannot edit/delete another admin

User / View

Can list all non-admin users

Can view/update own profile (name + profileImage URL)

API Overview
Auth

POST /api/auth/signup (user/view only; admin signup blocked)

POST /api/auth/login

GET /api/auth/me

Users

GET /api/users/view/list → list all non-admin users

GET /api/users/me → current user profile

PUT /api/users/me → update own profile (name/profileImage)

POST /api/users/admin/create → admin creates user/view

PUT /api/users/admin/edit/:id → admin edits user/view (cannot set admin)

DELETE /api/users/admin/delete/:id → admin deletes user/view (cannot delete admin)

Notes

profileImage is stored as an image URL.

For real image uploads, add multer + storage (local/cloud) later.


---

##  2) `backend/README.md`
```md
# EMS Backend

Node.js + Express + MongoDB + JWT + Swagger

## Install
```bash
npm install

Environment

Create backend/.env:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ems
JWT_SECRET=supersecret
CLIENT_URL=http://localhost:5173

Run

Dev:

npm run dev


Prod:

npm start

Swagger

http://localhost:5000/api-docs


---

##  3) `frontend/README.md`
```md
# EMS Frontend

React + Vite + Bootstrap + React Router

## Install & Run
```bash
npm install
npm run dev


Frontend runs at:

http://localhost:5173

Pages

/login

/signup

/profile

/users (all logged-in users: view-only list)

/admin/users (admin management)


---

# Now commit & push ONLY README files

Run these commands from your repo root:

```bash
git add README.md backend/README.md frontend/README.md
git commit -m "Add README files"
git push


That’s it.
