const express = require("express");
const router = express.Router();
const db = require("../db");

/* ADD EXPENSE */
router.post("/add", (req, res) => {
    const { user_id, title, amount, category, expense_date } = req.body;

    const sql = `
        INSERT INTO expenses (user_id, title, amount, category, expense_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [user_id, title, amount, category, expense_date], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Expense added" });
    });
});

/* GET EXPENSES BY USER */
router.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query(
        "SELECT * FROM expenses WHERE user_id=? ORDER BY expense_date DESC",
        [userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

/* DELETE EXPENSE */
router.delete("/delete/:id/:userId", (req, res) => {
    const { id, userId } = req.params;

    db.query(
        "DELETE FROM expenses WHERE id=? AND user_id=?",
        [id, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Deleted" });
        }
    );
});

module.exports = router;
