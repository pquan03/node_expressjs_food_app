import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/your-database-name";
mongoose.connect(mongoURI)
.then(() => console.log("Connected to database"))
.catch((err: any) => console.log(err.message));

