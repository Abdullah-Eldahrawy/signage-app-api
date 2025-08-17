// api/index.js
import serverless from "serverless-http";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// Connect DB (done once, reused by warm lambdas)
await connectDB();

export default serverless(app);
