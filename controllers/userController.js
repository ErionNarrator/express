const User = require('../config/db');
const pool = require("../config/db");

exports.getUsers = async (req, res) => {
    try {
        const result = await  pool.query('SELECT * FROM users');
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (name, email,password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE password = $3 RETURNING *', [name, email, password]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { name } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [name]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};