# Project Structure


event-ticketing-platform/

event-ticketing-platform/

│
├── src/
│
├── config/
│      database.js
│      mail.js
│
├── constants/
│      roles.js
│      eventStatus.js
│      paymentStatus.js
│      ticketTypes.js
│
├── controllers/
│      auth.controller.js
│      admin.controller.js
│      organizer.controller.js
│      attendee.controller.js
│      event.controller.js
│      ticket.controller.js
│      registration.controller.js
│      payment.controller.js
│      checkin.controller.js
│      analytics.controller.js
│
├── middleware/
│      auth.middleware.js
│      role.middleware.js
│      upload.middleware.js
│      validate.middleware.js
│      error.middleware.js
│
├── models/
│      User.js
│      Event.js
│      TicketCategory.js
│      Registration.js
│      Payment.js
│      CheckIn.js
│      index.js
│
├── routes/
│      auth.routes.js
│      admin.routes.js
│      organizer.routes.js
│      attendee.routes.js
│      event.routes.js
│      ticket.routes.js
│      registration.routes.js
│      payment.routes.js
│      analytics.routes.js
│
├── services/
│      auth.service.js
│      organizer.service.js
│      event.service.js
│      ticket.service.js
│      registration.service.js
│      payment.service.js
│      qr.service.js
│      email.service.js
│      analytics.service.js
│
├── middleware/
│      auth.middleware.js
│      role.middleware.js
│      upload.middleware.js
│      validate.middleware.js
│      error.middleware.js
│
├── utils/
│      generateLink.js
│      generateTicket.js
│      generateQRCode.js
│      pagination.js
│      response.js
│      paystack.js
│
├── validators/
│      auth.validator.js
│      organizer.validator.js
│      event.validator.js
│      ticket.validator.js
│      registration.validator.js
│      payment.validator.js
│
├── uploads/
│      banners/
│
├── templates/
│      confirmationEmail.html
│      paymentReceipt.html
│      eventUpdate.html
│
├── database/
│      migrations/
│      seeders/
│
├── docs/
│      postman_collection.json
│      swagger.yaml
│
├── app.js
├── server.js
│
├── .env
├── package.json
│
└── README.md


## Packages 

npm init -y

npm install express

npm install sequelize pg pg-hstore

npm install jsonwebtoken

npm install bcryptjs

npm install dotenv

npm install cors

npm install helmet

npm install multer

npm install nodemailer

npm install qrcode

npm install express-validator

npm install uuid

npm install dayjs

npm install morgan

npm install slugify
npm install joi
npm install express-rate-limit


Development dependencies:

npm install -D nodemon

npm install axios //for paystack


### Relationships

User
  |
  | hasMany
  |
Events
  |
  | hasMany
  |
Registrations


#### Authentication


Admin

Organizer

can login.

Attendees never login.


##### Registration Flow

Organizer
    │
    ▼
Creates Event
    │
    ▼
Creates Ticket Types
    │
    ▼
Publishes Event
    │
    ▼
Registration Link Generated
    │
    ▼
Attendee Opens Link
    │
    ▼
Views Event Details
    │
    ▼
Chooses Ticket Type
    │
    ▼
Fills Registration Form
    │
    ▼
Free Event? ──► Yes ──► Generate Ticket + QR Code
      │
      No
      ▼
Initialize Paystack Payment
      │
      ▼
Payment Successful
      │
      ▼
Generate Ticket + QR Code
      │
      ▼
Send Confirmation Email



###### 📚 API Documentation (Current Version)

Authentication (User)
| Method | Endpoint                                   | Description                | Auth |
| ------ | ------------------------------------------ | -------------------------- | ---- |
| POST   | `/api/v1/auth/register`                    | Register a new organizer   | ❌    |
| POST   | `/api/v1/auth/login`                       | Login user                 | ❌    |
| POST   | `/api/v1/auth/logout` *(planned)*          | Logout current user        | ✅    |
| GET    | `/api/v1/auth/profile` *(planned)*         | Get logged-in user profile | ✅    |
| PUT    | `/api/v1/auth/profile` *(planned)*         | Update profile             | ✅    |
| POST   | `/api/v1/auth/verify-email` *(planned)*    | Verify email address       | ❌    |
| POST   | `/api/v1/auth/forgot-password` *(planned)* | Request password reset     | ❌    |
| POST   | `/api/v1/auth/reset-password` *(planned)*  | Reset password             | ❌    |


# 📂 Categories

| Method | Endpoint                 | Description        | Auth      |
| ------ | ------------------------ | ------------------ | ----------|
| POST   | `/api/v1/categories`     | Create category    | ✅ Admin |
| GET    | `/api/v1/categories`     | Get all categories | ❌       |
| GET    | `/api/v1/categories/:id` | Get category by ID | ❌       |
| PUT    | `/api/v1/categories/:id` | Update category    | ✅ Admin |
| DELETE | `/api/v1/categories/:id` | Delete category    | ✅ Admin |



# 🎉 Events
Public Endpoints

| Method | Endpoint             | Description                 | Auth |
| ------ | -------------------- | --------------------------- | ---- |
| GET    | `/api/v1/events`     | Browse all published events | ❌    |
| GET    | `/api/v1/events/:id` | Get event details           | ❌    |


Organizer Endpoints

| Method | Endpoint                       | Description             | Auth        |
| ------ | ------------------------------ | ----------------------- | ----------- |
| GET    | `/api/v1/events/my-events`     | View organizer's events | ✅ Organizer |
| POST   | `/api/v1/events`               | Create event            | ✅ Organizer |
| PUT    | `/api/v1/events/:id`           | Update event            | ✅ Organizer |
| DELETE | `/api/v1/events/:id`           | Delete event            | ✅ Organizer |
| PATCH  | `/api/v1/events/:id/publish`   | Publish event           | ✅ Organizer |
| PATCH  | `/api/v1/events/:id/unpublish` | Unpublish event         | ✅ Organizer |


# 👨‍💼 Admin (Planned)

| Method | Endpoint                           | Description     | Auth    |
| ------ | ---------------------------------- | --------------- | ------- |
| GET    | `/api/v1/admin/events`             | View all events | ✅ Admin |
| PATCH  | `/api/v1/admin/events/:id/approve` | Approve event   | ✅ Admin |
| PATCH  | `/api/v1/admin/events/:id/cancel`  | Cancel event    | ✅ Admin |
| DELETE | `/api/v1/admin/events/:id`         | Remove event    | ✅ Admin |


# Ticket

Public

| Method | Endpoint                          | Description                 |
| ------ | --------------------------------- | --------------------------- |
| GET    | `/api/v1/events/:eventId/tickets` | View available ticket types |


Organizer

| Method | Endpoint                         | Description        |
| ------ | -------------------------------- | ------------------ |
| POST   | `/api/v1/tickets`                | Create ticket type |
| GET    | `/api/v1/tickets/:id`            | View ticket type   |
| PUT    | `/api/v1/tickets/:id`            | Update ticket      |
| DELETE | `/api/v1/tickets/:id`            | Delete ticket      |
| PATCH  | `/api/v1/tickets/:id/activate`   | Activate ticket    |
| PATCH  | `/api/v1/tickets/:id/deactivate` | Deactivate ticket  |



| Method | Endpoint                             | Purpose                      |
| ------ | ------------------------------------ | ---------------------------- |
| POST   | `/api/v1/register/:registrationLink` | Public attendee registration |
| GET    | `/api/v1/register/details/:id`       | View a registration          |
| GET    | `/api/v1/register/event/:eventId`    | View event attendees         |
| PATCH  | `/api/v1/register/:id/cancel`        | Cancel registration          |



#

| Step               | Method | Endpoint                                      | Body Required    |
| ------------------ | ------ | --------------------------------------------- | ---------------- |
| Register Attendee  | POST   | `/api/v1/register/:registrationLink`          | ✅                |
| Initialize Payment | POST   | `/api/v1/payments/initialize/:registrationId` | ❌                |
| Verify Payment     | GET    | `/api/v1/payments/verify?reference=...`       | ❌                |
| Paystack Webhook   | POST   | `/api/v1/payments/webhook`                    | Sent by Paystack |
| Check-in           | POST   | `/api/v1/check-in`                            | ✅                |





seedAdmin

{
    "email":"admin@example.com",
    "password":"Admin@123"
}


FOR CREATING USER-Organizer
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": ""
}


FOR ORGANIZER LOGIN

{
  "email": "john@example.com",
  "password": "Password@123"
}


FOR CREATING EVENT CATEGORY

{
  "name": "Conference",
  "description": "Business conferences and summits"
}

OR

{
  "name": "Music",
  "description": "Concerts and music festivals"
}



FOR CREATING EVENT

{
  "categoryId": "73549a34-8eb5-47d3-9ad0-8426f5045c10",
  "title": "TechCrunch Africa Summit 2026",
  "description": "Africa's biggest technology conference.",
  "venue": "International Conference Centre",
  "address": "Area 10, Abuja",
  "state": "FCT",
  "startDate": "2026-09-15T09:00:00.000Z",
  "endDate": "2026-09-15T18:00:00.000Z",
  "registrationDeadline": "2026-09-10T23:59:59.000Z",
  "capacity": 500,
  "isPaid": true
}



FOR CREATING TICKET
{
  "eventId": "bc02862e-03d6-4d5f-a1c9-f1a730adaf05",
  "name": "Regular",
  "description": "General admission ticket",
  "price": 5000,
  "quantity": 300,
  "salesStart": "2026-08-01T00:00:00.000Z",
  "salesEnd": "2026-09-10T23:59:59.000Z",
  "maxPerAttendee": 5
}

OR

{
  "eventId": "bc02862e-03d6-4d5f-a1c9-f1a730adaf05",
  "name": "VIP",
  "description": "VIP Access",
  "price": 25000,
  "quantity": 100,
  "salesStart": "2026-08-01T00:00:00.000Z",
  "salesEnd": "2026-09-10T23:59:59.000Z",
  "maxPerAttendee": 2
}

OR

{
  "eventId": "bc02862e-03d6-4d5f-a1c9-f1a730adaf05",
  "name": "Early Bird",
  "description": "Discounted ticket",
  "price": 3000,
  "quantity": 100,
  "salesStart": "2026-08-01T00:00:00.000Z",
  "salesEnd": "2026-08-20T23:59:59.000Z",
  "maxPerAttendee": 2
},


Register for Event

POST /api/v1/register/:registrationLink

Replace:

PUT_TICKET_TYPE_UUID_HERE

with the ID returned from:

GET /api/v1/tickets

eg: POST /api/v1/register/7da41b9d885bf881ad72ea0214e6469d

{
  "ticketTypeId": "PUT_TICKET_TYPE_UUID_HERE",
  "firstName": "David",
  "lastName": "Johnson",
  "email": "david@example.com",
  "phone": "08011223344",
  "quantity": 2
}

OR

{
  "ticketTypeId": "ce1963fd-b347-4da2-9c9c-852f5e8aac24",
  "firstName": "Sarah",
  "lastName": "Williams",
  "email": "sarah@example.com",
  "phone": "08099887766",
  "quantity": 1
}