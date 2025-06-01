import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";
import PurchasedItem from "./purchasedItemModel.js";

const Payment = sequelize.define("Payment", {
  transactionId: {
    type: DataTypes.STRING,
    unique: true,
  },
  pidx: {
    type: DataTypes.STRING,
    unique: true,
  },
  productId: {
    type: DataTypes.UUID,
    references: {
      model: PurchasedItem, // Name of the referenced model
      key: "id", // Key in the referenced model
    },
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER, // Amount in paisa (integer)
    allowNull: false,
  },
  dataFromVerificationReq: {
    type: DataTypes.JSON, // Storing data in JSON format
  },
  apiQueryFromUser: {
    type: DataTypes.JSON, // Storing data in JSON format
  },
  paymentGateway: {
    type: DataTypes.ENUM("khalti", "esewa", "connectIps"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("success", "pending", "failed"),
    defaultValue: "pending",
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Payment.belongsTo(PurchasedItem, { foreignKey: 'productId' });
// PurchasedItem.hasMany(Payment, { foreignKey: 'productId'});


export default Payment;
