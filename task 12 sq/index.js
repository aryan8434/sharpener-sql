const express = require("express");
const { sequelize, Bus, Booking, User } = require("./models/models");

const app = express();
app.use(express.json());

sequelize.sync({ alter: true }).then(async () => {
  const bus = await Bus.findOrCreate({
    where: { busNumber: "BUS-101" },
    defaults: { totalSeats: 40, availableSeats: 30 },
  });

  const user = await User.findOrCreate({
    where: { email: "john@example.com" },
    defaults: { name: "John Doe" },
  });

  await Booking.findOrCreate({
    where: { seatNumber: 1, UserId: user[0].id, BusId: bus[0].id },
  });

  app.listen(4000, () => console.log("Server running on port 4000"));
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/buses", async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;
    const booking = await Booking.create({
      UserId: userId,
      BusId: busId,
      seatNumber,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users/:id/bookings", async (req, res) => {
  const bookings = await Booking.findAll({
    where: { UserId: req.params.id },
    attributes: ["id", "seatNumber"],
    include: [{ model: Bus, as: "bus", attributes: ["busNumber"] }],
  });
  res.json(bookings);
});

app.get("/buses/:id/bookings", async (req, res) => {
  const bookings = await Booking.findAll({
    where: { BusId: req.params.id },
    attributes: ["id", "seatNumber"],
    include: [{ model: User, as: "user", attributes: ["name", "email"] }],
  });
  res.json(bookings);
});
