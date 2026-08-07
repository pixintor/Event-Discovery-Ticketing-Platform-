import sequelize from "../config/database.js";

import User from "./user.js";
import Event from "./event.js";
import Registration from "./registration.js";
import Category from "./category.js";
import TicketType from "./TicketType.js";
import CampaignModel from "./Campaign.js";


const Campaign = CampaignModel(sequelize);
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


/*
|--------------------------------------------------------------------------
| Ticket Type → Registration
|--------------------------------------------------------------------------
*/

TicketType.hasMany(Registration, {
  foreignKey: "ticketTypeId",
  as: "registrations",
});

Registration.belongsTo(TicketType, {
  foreignKey: "ticketTypeId",
  as: "ticketType",
});


/*
|--------------------------------------------------------------------------
| Ticket Type → Registration
|--------------------------------------------------------------------------
*/

Event.hasMany(Campaign, {
  foreignKey: "eventId",
  as: "campaigns",
});

Campaign.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});

User.hasMany(Campaign, {
  foreignKey: "organizerId",
  as: "campaigns",
});

Campaign.belongsTo(User, {
  foreignKey: "organizerId",
  as: "organizer",
});




export {
  sequelize,
  User,
  Event,
  Registration,
  Category,
  TicketType,
  Campaign,
};