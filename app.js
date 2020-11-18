require("dotenv").config();
const express = require("express");
const app = express();

//Config middleware
app.set("json spaces", 2); // Set json pretty printing

//Import routes
const api = require("./routes");
app.use("/api/", api);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
