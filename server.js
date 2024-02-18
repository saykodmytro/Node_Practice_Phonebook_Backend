import { connectDb } from "./db/connect-db.js";
import app from "./app.js";
import dotenv from "dotenv"
dotenv.config(); 
const {PORT} = process.env;

  const  startServer = async () => {
    try {
       await connectDb();
       app.listen(PORT, () => {
        console.log("Server is running. Use our API on port: 8000");
      });
    } catch (error) {
        console.log('error: ', error);
        process.exit(1);
    }
  }

  startServer();