import express from "express";
import bodyParser from "body-parser";
import { connectToMySQL } from "./db.js"; // Import MySQL connection function
import { initializeKhaltiPayment, verifyKhaltiPayment } from "./khalti.js";
import Payment from "./paymentModel.js";
import PurchasedItem from "./purchasedItemModel.js";
import Item from "./itemModel.js";

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables if not in production
if (process.env.NODE_ENV !== "production") {
  import('dotenv').then((dotenv) => dotenv.config());
}

// Middleware
app.use(bodyParser.json());

// Connect to MySQL
connectToMySQL();

// Example route
app.get("/", (req, res) => {
  res.send("Hello, MySQL is connected!");
});

// route to initialize Khalti payment gateway
app.post("/initialize-khali", async (req, res) => {
  try {
    const { itemId, totalPrice, website_url } = req.body;

    // Find the item in the database
    const itemData = await Item.findOne({
      _id: itemId,
      price: Number(totalPrice),
    });

    if (!itemData) {
      return res.status(400).send({
        success: false,
        message: "Item not found",
      });
    }

    // Create a purchase document to store purchase info
    const purchasedItemData = await PurchasedItem.create({
      item: itemId,
      paymentMethod: "khalti",
      totalPrice: totalPrice * 100, // Convert totalPrice to paisa
    });


    console.log("This is purchased order Id", purchasedItemData.id)
    // Initialize Khalti payment
    const paymentInitiate = await initializeKhaltiPayment({
      amount: totalPrice * 100, // Amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedItemData.id, // Purchase order ID for later verification
      purchase_order_name: itemData.name,
      return_url: `${process.env.BACKEND_URI}/complete-khalti-payment`, // Return URL after payment
      website_url,
    });

    res.json({
      success: true,
      purchasedItem: purchasedItemData,
      payment: paymentInitiate,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// Route to complete Khalti payment verification
app.get("/complete-khalti-payment", async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);

    // Check if payment is completed and details match
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete information",
        paymentInfo,
      });
    }

    // Check if payment was done for a valid item
    const purchasedItemData = await PurchasedItem.findOne({
      where: {
        id: purchase_order_id,
        totalPrice: amount,
      }
    });

    if (!purchasedItemData) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found",
      });
    }

    // Update purchase record to 'completed'
    // Update purchase record to 'completed'
    const purchasedItem = await PurchasedItem.findByPk(purchase_order_id);
    if (purchasedItem) {
      // Update the status field to "completed"
      await purchasedItem.update({ status: 'completed' });
      console.log('Status updated to completed');
    } else {
      console.log('Item not found');
    }

    // Create a new payment record
    const paymentData = await Payment.create({
      pidx,
      transactionId: transaction_id,
      productId: purchase_order_id,
      amount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "khalti",
      status: "success",
    });

    console.log("This is the payment Data ", paymentData)
    // Send success response
    res.json({
      success: true,
      message: "Payment Successful",
      paymentData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error,
    });
  }
});

app.get("/create-item", async (req, res) => {
  try {
    // Create a new item using Sequelize's create method
    const itemData = await Item.create({
      name: "Headphone",
      price: 500,
      inStock: true,
      category: "vayo pardaina",
    });

    // Send a JSON response with the created item
    res.json({
      success: true,
      item: itemData,
    });
  } catch (error) {
    // Handle error case
    res.status(500).json({
      success: false,
      message: "Error creating item",
      error: error.message,
    });
  }
});



// Initialize MySQL connection and sync models
const startServer = async () => {
  try {
    await connectToMySQL();  // Connect to MySQL and sync models

    // You can add any initial logic here if needed, like creating some initial data
    app.listen(3000, () => {
      console.log(`Server is running on port `);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
