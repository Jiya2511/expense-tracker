const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../db");

// SIGN UP
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err) => {
        if (err) return res.status(400).json({ message: "Email already exists" });
        res.json({ message: "User registered" });
    });
});

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
        if (result.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        const valid = await bcrypt.compare(password, result[0].password);
        if (!valid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.json({
            message: "Login successful",
            userId: result[0].id,
            name: result[0].name
        });
    });
});

module.exports = router;
