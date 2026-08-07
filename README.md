# Project Structure


event-ticketing-platform/

event-ticketing-platform/

```text
captstone-project/
│
├── src/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── database.js
│   │   ├── mail.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── category.controller.js
│   │   ├── event.controller.js
│   │   ├── ticket.controller.js
│   │   ├── registration.controller.js
│   │   ├── payment.controller.js
│   │   ├── paymentSetup.controller.js
│   │   ├── upload.controller.js
│   │   ├── checkin.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── analytics.controller.js
│   │   ├── emailCampaign.controller.js
│   │   └── export.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── upload.middleware.js
│   │   ├── error.middleware.js
│   │   └── notFound.middleware.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   ├── Category.js
│   │   ├── Event.js
│   │   ├── TicketType.js
│   │   ├── Registration.js
│   │   └── index.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── category.routes.js
│   │   ├── event.routes.js
│   │   ├── ticket.routes.js
│   │   ├── registration.routes.js
│   │   ├── payment.routes.js
│   │   ├── paymentSetup.routes.js
│   │   ├── upload.routes.js
│   │   ├── checkin.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── analytics.routes.js
│   │   ├── emailCampaign.routes.js
│   │   └── export.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── category.service.js
│   │   ├── event.service.js
│   │   ├── ticket.service.js
│   │   ├── registration.service.js
│   │   ├── payment.service.js
│   │   ├── paymentSetup.service.js
│   │   ├── upload.service.js
│   │   ├── checkin.service.js
│   │   ├── dashboard.service.js
│   │   ├── analytics.service.js
│   │   ├── emailCampaign.service.js
│   │   └── export.service.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   ├── category.validator.js
│   │   ├── event.validator.js
│   │   ├── ticket.validator.js
│   │   ├── registration.validator.js
│   │   ├── payment.validator.js
│   │   └── paymentSetup.validator.js
│   │
│   ├── utils/
│   │   ├── cloudinaryUpload.js
│   │   ├── deleteImage.js
│   │   ├── email.js
│   │   ├── generateQRCode.js
│   │   ├── generateRegistrationLink.js
│   │   ├── generateTicketNumber.js
│   │   ├── generateEventCode.js
│   │   ├── generateSlug.js
│   │   ├── paystack.js
│   │   ├── pagination.js
│   │   ├── response.js
│   │   └── token.js
│   │
│   ├── errors/
│   │   ├── AppError.js
│   │   ├── BadRequestError.js
│   │   ├── UnauthorizedError.js
│   │   ├── ForbiddenError.js
│   │   ├── NotFoundError.js
│   │   └── ConflictError.js
│   │
│   ├── templates/
│   │   ├── verificationEmail.html
│   │   ├── resetPassword.html
│   │   ├── eventTicket.html
│   │   ├── paymentSuccessful.html
│   │   └── campaignEmail.html
│   │
│   └── app.js
│
├── uploads/
│   └── (development only, optional)
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
├── swagger.js
└── README.md
```



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

npm install cloudinary

npm install streamifier

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

Base URL: http://localhost:5000

###### 📚 API Documentation (Current Version)

# Authentication (User)
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

# New Endpoints
GET  /api/v1/auth/google
GET  /api/v1/auth/google/callback



# Organizer Payment Setup (MVP)

| Method | Endpoint                                  | Purpose                     |
| ------ | ----------------------------------------- | --------------------------- |
| GET    | `/api/v1/payment-setup/banks`             | Get Nigerian banks          |
| POST   | `/api/v1/payment-setup/verify-account`    | Verify account number       |
| POST   | `/api/v1/payment-setup/create-subaccount` | Create Paystack subaccount  |
| GET    | `/api/v1/payment-setup/me`                | Get organizer payment setup |




# Organizer Profile
| Method | Endpoint                 | Purpose                 |
| ------ | ------------------------ | ----------------------- |
| POST   | `/api/v1/upload/profile` | Upload profile picture  |
| PUT    | `/api/v1/upload/profile` | Replace profile picture |
| DELETE | `/api/v1/upload/profile` | Remove profile picture  |





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


# Organizer Endpoints

| Method | Endpoint                       | Description             | Auth        |
| ------ | ------------------------------ | ----------------------- | ----------- |
| GET    | `/api/v1/events/my-events`     | View organizer's events | ✅ Organizer |
| POST   | `/api/v1/events`               | Create event            | ✅ Organizer |
| PUT    | `/api/v1/events/:id`           | Update event            | ✅ Organizer |
| DELETE | `/api/v1/events/:id`           | Delete event            | ✅ Organizer |
| PATCH  | `/api/v1/events/:id/publish`   | Publish event           | ✅ Organizer |
| PATCH  | `/api/v1/events/:id/unpublish` | Unpublish event         | ✅ Organizer |





# Event Banner
| Method | Endpoint                               | Purpose              |
| ------ | -------------------------------------- | -------------------- |
| POST   | `/api/v1/upload/event-banner/:eventId` | Upload event banner  |
| PUT    | `/api/v1/upload/event-banner/:eventId` | Replace event banner |
| DELETE | `/api/v1/upload/event-banner/:eventId` | Remove event banner  |


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

# Register for Event

| Method | Endpoint                             | Purpose                      |
| ------ | ------------------------------------ | ---------------------------- |
| POST   | `/api/v1/register/:registrationLink` | Public attendee registration |
| GET    | `/api/v1/register/details/:id`       | View a registration          |
| GET    | `/api/v1/register/event/:eventId`    | View event attendees         |
| PATCH  | `/api/v1/register/:id/cancel`        | Cancel registration          |



# UsernPayment Setup

| Step               | Method | Endpoint                                      | Body Required    |
| ------------------ | ------ | --------------------------------------------- | ---------------- |
| Register Attendee  | POST   | `/api/v1/register/:registrationLink`          | ✅                |
| Initialize Payment | POST   | `/api/v1/payments/initialize/:registrationId` | ❌                |
| Verify Payment     | GET    | `/api/v1/payments/verify?reference=...`       | ❌                |
| Paystack Webhook   | POST   | `/api/v1/payments/webhook`                    | Sent by Paystack |
| Check-in           | POST   | `/api/v1/check-in`                            | ✅                |


# Admin Management APIs

| Method | Endpoint                          | Who Can Use |
| ------ | --------------------------------- | ----------- |
| POST   | `/api/v1/admin/admins`            | Super Admin |
| GET    | `/api/v1/admin/admins`            | Super Admin |
| PATCH  | `/api/v1/admin/admins/:id`        | Super Admin |
| PATCH  | `/api/v1/admin/admins/:id/status` | Super Admin |
| DELETE | `/api/v1/admin/admins/:id`        | Super Admin |


# Check in

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| POST   | `/api/v1/check-in/scan`             |
| GET    | `/api/v1/check-in/history/:eventId` |



# Organizer Dashboard

GET /api/v1/dashboard/overview
GET /api/v1/dashboard/revenue
GET /api/v1/dashboard/events
GET /api/v1/dashboard/registrations

Statistics:

Total Events
Tickets Sold
Revenue
Upcoming Events
Check-ins
Pending Registrations

# Admin Dashboard

GET /api/v1/admin/dashboard
GET /api/v1/admin/analytics

Statistics:

Organizers
Events
Registrations
Revenue
Platform Commission

# Email Campaign

POST /api/v1/events/:id/send-email



# seedAdmin

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




Check-in

JSON Body

e.g
{
  "ticketNumber": "TCA-2026-EARLY_BIRD-000001"
}

Or, if your QR code contains the registration ID:

{
  "registrationId": "REGISTRATION_UUID"
}