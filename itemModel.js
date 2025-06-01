import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

const Item = sequelize.define("Item", {
  id: {
    type: DataTypes.UUID, // Use UUID for primary key
    defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER, // Store price in integer (paisa)
    allowNull: false,
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  category: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default Item;
