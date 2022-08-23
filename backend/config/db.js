// FILE MAIN NOTE:
// - In this file we connect to MONGODB using MONGOOSE

// Import Mongoose
const mongoose = require('mongoose')

// Asynchronous function to connect to DB. All mongoose methods are asynchronous and return promises.
const connectDB = async () => {
  try {
    // Connect with MONGO_URI variable from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI)
    // Once connection successful, console log success message.
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB