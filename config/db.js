const mongoose = require('mongoose');

const uri = "mongodb+srv://sagarsangwan479:EOu1TgeY6unkgPJT@bingo-db.aisilnt.mongodb.net/main-db?retryWrites=true&w=majority&appName=Bingo-db";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop the app if connection fails
  }
};

module.exports = connectDB;
