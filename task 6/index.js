const express = require("express");
const { DataTypes } = require("sequelize");
const sequelize = require("./db/db");

const app = express();
app.use(express.json());

const Student = sequelize.define("students", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

sequelize.sync();

app.get("/students", async (req, res) => {
    try {
        const results = await Student.findAll();
        res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

app.listen(3000);
