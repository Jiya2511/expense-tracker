const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
