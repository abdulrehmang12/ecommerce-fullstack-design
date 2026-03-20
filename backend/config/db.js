const mongoose = require("mongoose");

const connectDb = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set. Add it to backend/.env.");
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000
  });

  return mongoose.connection;
};

module.exports = connectDb;
