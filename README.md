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



###### Current API Summary



| Method | Endpoint                        | Description                   | Access |
| ------ | ------------------------------- | ----------------------------- | ------ |
| POST   | `/api/v1/auth/login`            | Login                         | Public |
| POST   | `/api/v1/organizers`            | Create Organizer              | Admin  |
| GET    | `/api/v1/organizers`            | Get All Organizers            | Admin  |
| GET    | `/api/v1/organizers/:id`        | Get Organizer                 | Admin  |
| PUT    | `/api/v1/organizers/:id`        | Update Organizer              | Admin  |
| PATCH  | `/api/v1/organizers/:id/status` | Activate/Deactivate Organizer | Admin  |


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