import sequelize from "../config/database.js";

import User from "./User.js";
import Event from "./Event.js";
import Registration from "./registration.js";
import Category from "./Category.js";
import Analytics from "./analytics.js";

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
| Event → Registration
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

export { sequelize, User, Event, Registration, Category, Analytics };
