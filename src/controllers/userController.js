const pool = require('../config/connectDB');
const { getUsers, createUser, checkEmail, getUser, deleteUser, updateUser } = require('../queries/user');
const userController = {
    getUser: async (req, res) => {
        const id = req.params.id;
        try {
            const [rows] = await pool.execute(getUser, [id]);
            console.log(rows[0]);
            if (!rows[0]?.id) {
                return res.status(404).json("User not found.");
            }
            return res.status(200).json(rows[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    getUsers: async (req, res) => {
        try {
            const [rows] = await pool.execute(getUsers);
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    createUser: async (req, res) => {
        try {
            const { email, password, createAt } = req.body;
            const [rows] = await pool.execute(checkEmail, [email]);
            if (rows.length) {
                return res.status(400).json("Email already exists.");
            }
            await pool.execute(createUser, [email, password, createAt ?? new Date()]);
            return res.status(201).json("Created user successfully.");
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;
        try {
            const [rows] = await pool.execute(getUser, [id]);
            if (!rows[0]?.id) {
                return res.status(404).json("User not found.");
            }
            await pool.execute(deleteUser, [id]);
            return res.status(200).json("Deleted user successfully.");
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        try {
            const { email, password, createAt } = req.body;
            const [rows] = await pool.query(getUser, [id]);
            const data = await pool.execute(checkEmail, [email]);
            if (data[0].length) {
                return res.status(400).json("Email already exists.");
            }

            if (!rows[0]?.id) {
                return res.status(404).json("User not found.");
            }
            await pool.execute(updateUser, [email ?? rows[0]?.email, password ?? rows[0]?.password, createAt ?? rows[0]?.createAt, id]);
            return res.status(200).json("Updated user successfully.");

        } catch (error) {
            console.log(error);
            return res.status(500).json(error);

        }
    }
}

module.exports = userController;