const Student = require("../models/student");

const getAllStudents = async (req, res) => {
    try {
        const results = await Student.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send("Error");
    }
};

const updateEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const student = await Student.findByPk(id);
        if (!student) {
            res.status(404).send("User is not found");
        }
        student.name = name;
        await student.save();
        res.status(200).send("User has been updated!");
    } catch (error) {
        res.status(500).send("User cannot be updated");
    }
};

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.destroy({
            where: { id: id }
        });
        if (!student) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User have deleted");
    } catch (err) {
        return res.status(500).send("User cannot be deleted ");
    }
};

module.exports = {
    getAllStudents,
    updateEntry
};
