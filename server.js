require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const usersRoute = require("./routes/usersRoute");

app.use("/api/users", usersRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on ${process.env.APP_PORT}`);
});
