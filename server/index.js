const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const supportRequestRouter = require("./routes/supportRequest");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongo db connected with DB");
});

mongoose.connection.on("error", () => {
  console.log("error occured while connection to database");
});

app.use(userRouter);
app.use(supportRequestRouter);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
