const express = require("express");
const sequelize = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");

require("./models/user");
require("./models/bus");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bus Booking App");
});

app.use("/users", userRoutes);
app.use("/buses", busRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log("Server running on 3000"));
  })
  .catch((err) => console.log("Unable to sync database:", err));
