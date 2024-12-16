const express = require("express");
const router = express.Router();
const { getAllHabits } = require("../model");

const addHabitControl = require("./habitAddControl");
const deleteHabitControl = require("./habitDeleteControl");
const checkOffHabitControl = require("./habitCheckOffControl");


const authMiddleware = (req, res, next) => {
    const userId = req.headers["x-user-id"]; // Simulated user authentication
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: No user ID provided" });
    }
    req.user = { id: userId }; // Attach user to request
    next();
};

router.use(authMiddleware);

router.get("/habits", (req, res) => {
    const userId = req.user.id;
    const habits = getAllHabits(userId);
    res.json(habits);
});

router.post("/habits", addHabitControl);

router.put("/habits/:id", checkOffHabitControl);

router.delete("/habits/:id", deleteHabitControl);

module.exports = router;
