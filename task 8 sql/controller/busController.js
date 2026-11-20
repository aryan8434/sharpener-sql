const { Op } = require("sequelize");
const Bus = require("../models/bus");

const addBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;
    if (!busNumber || totalSeats == null || availableSeats == null) {
      return res
        .status(400)
        .send("busNumber, totalSeats and availableSeats are required");
    }
    const bus = await Bus.create({ busNumber, totalSeats, availableSeats });
    res.status(201).json(bus);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).send("Bus number already exists");
    }
    console.log(err);
    res.status(500).send("Bus cannot be added");
  }
};

const getAvailableBuses = async (req, res) => {
  try {
    const seats = Number(req.params.seats);
    if (!Number.isInteger(seats) || seats < 0) {
      return res.status(400).send("seats must be a non-negative integer");
    }
    const buses = await Bus.findAll({
      where: { availableSeats: { [Op.gt]: seats } },
    });
    res.status(200).json(buses);
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot fetch buses");
  }
};

module.exports = { addBus, getAvailableBuses };
