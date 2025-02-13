const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

require("dotenv").config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/user", authRoute);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/toposel")
  .then(() => {
    console.log("DB Connected")
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, (error) => {
  if (error) console.log("Not started " + error);
  else console.log(`Server started on port ${PORT}`);
});
