import sequelize from "./src/config/database.js";
import User from "./src/models/User.js";

async function seed() {
  try {
    await sequelize.sync();

await User.bulkCreate(
      [
        { 
          firstName: "Alex", 
          lastName: "Morgan", 
          email: "user1@example.com" 
        },
        { 
          firstName: "Taylor", 
          lastName: "Swift", 
          email: "user2@example.com" 
        },
      ],
      { ignoreDuplicates: true }
    );
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sequelize.close(); // Cleanly closes DB pool before exit
  }
}

seed();