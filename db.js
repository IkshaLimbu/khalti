import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance using the variables from .env
export const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database user
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST,   // Host
    dialect: "mysql",            // MySQL dialect
  }
);

// Function to connect to MySQL and sync models
export const connectToMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL successfully.");
    
    // Sync all models with the database
    await sequelize.sync({ alter: true }); // Or force: true for dropping and recreating tables
    console.log("Models synced successfully.");
    
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
};
