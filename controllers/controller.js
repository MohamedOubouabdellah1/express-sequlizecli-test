const db = require('../models/index.js')
const User = require('../models/user');
const Item = require('../models/item');

const createUser = async (req, res) => {
    try {
        const {firstName,lastName,email,password} = req.body;
        const user = await db.User.create({
            firstName,lastName,email,password
        });
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.User.findOne({
            where: { id: id }
        });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send('User with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await db.User.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await db.User.findOne({ where: { id: id } });
            return res.status(200).json({ user: updatedUser });
        }
        throw new Error('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await db.User.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}