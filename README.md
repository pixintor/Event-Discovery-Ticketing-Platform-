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

Organizer creates event

↓

System generates

https://domain.com/register/9fh8329d

↓

Organizer shares link

↓

Attendee opens link

↓

Views event
↓
Registers
↓
Initialize Payment
↓
Complete Payment
↓
Verify Payment
↓
Create Registration
↓
Generate Ticket ID
↓
Generate QR Code
↓
Send Email Confirmation



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

| Method | Endpoint                 | Description        | Auth    |
| ------ | ------------------------ | ------------------ | ------- |
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




seedAdmin

{
    "email":"admin@example.com",
    "password":"Admin@123"
}


FOR CREATING USER
{
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": ""
}


FOR CREATING TICKET
{
  "eventId": "17245ff1-b244-45f1-b14d-10dee9709727",
  "name": "Early Bird",
  "price": 5000,
  "quantity": 100,
  "salesStart": "2026-08-05",
  "salesEnd": "2026-08-20",
  "maxPerAttendee": 2
}



###### Project Foundation (Completed)
✔ Project Structure
✔ Express Setup
✔ PostgreSQL Configuration
✔ Sequelize Configuration
✔ Environment Variables
✔ Mail Configuration
✔ User Model
✔ Authentication
✔ JWT
✔ Authorization
✔ Organizer Management
✔ API Testing with Postman