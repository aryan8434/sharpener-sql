const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.js");

const Bus = sequelize.define("Bus", {
  busNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  totalSeats: { type: DataTypes.INTEGER, allowNull: false },
  availableSeats: { type: DataTypes.INTEGER, allowNull: false },
});

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Booking = sequelize.define("Booking", {
  seatNumber: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(Booking, { as: "Bookings", foreignKey: "UserId" });
Booking.belongsTo(User, { as: "user", foreignKey: "UserId" });

Bus.hasMany(Booking, { as: "Bookings", foreignKey: "BusId" });
Booking.belongsTo(Bus, { as: "bus", foreignKey: "BusId" });

module.exports = { sequelize, Bus, User, Booking };
