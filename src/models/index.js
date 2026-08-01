import sequelize from "../config/database.js";

import User from "./User.js";
import Event from "./Event.js";
import Registration from "./registration.js";
import Category from "./category.js";
import TicketType from "./TicketType.js";

/*
|--------------------------------------------------------------------------
| User → Event
|--------------------------------------------------------------------------
*/

User.hasMany(Event, {
  foreignKey: "organizerId",
  as: "events",
});

Event.belongsTo(User, {
  foreignKey: "organizerId",
  as: "organizer",
});

/*
|--------------------------------------------------------------------------
| Category → Event
|--------------------------------------------------------------------------
*/

Category.hasMany(Event, {
  foreignKey: "categoryId",
  as: "events",
});

Event.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

/*
|--------------------------------------------------------------------------
| Event → type
|--------------------------------------------------------------------------
*/

Event.hasMany(Registration, {
  foreignKey: "eventId",
  as: "registrations",
});

Registration.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});



/*
|--------------------------------------------------------------------------
| Event → Ticket Types
|--------------------------------------------------------------------------
*/

Event.hasMany(TicketType, {
  foreignKey: "eventId",
  as: "ticketTypes",
});

TicketType.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});


export {
  sequelize,
  User,
  Event,
  Registration,
  Category,
  TicketType,
};