import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import Payment from "./paymentModel.js"; 
import Item from "./itemModel.js";

const PurchasedItem = sequelize.define("PurchasedItem", {
  id: {
    type: DataTypes.UUID, // Use UUID for primary key
    defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
    primaryKey: true,
  },
  item: {
    type: DataTypes.UUID,
    references: {
      model: Item, // Name of the referenced model
      key: "id",
    },
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER, // Store price in integer (paisa)
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  paymentMethod: {
    type: DataTypes.ENUM("khalti"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "refunded"),
    defaultValue: "pending",
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});


// PurchasedItem.hasMany(Payment, { foreignKey: 'productId'});
// Payment.belongsTo(PurchasedItem, { foreignKey: 'productId' });

export default PurchasedItem;
