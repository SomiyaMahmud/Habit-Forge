const { addHabit, getCategoryByName, addCategory, addGoal } = require("../model");

const addHabitControl = (req, res) => {
  const { habitName, description, category, startDate, endDate, userId, goal } = req.body;

  if (!habitName || !description || !startDate || !endDate || !goal) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (isNaN(goal) || goal <= 0) {
    return res.status(400).json({ error: "Goal must be a positive integer." });
  }

  const categoryName = category || "Miscellaneous";

  getCategoryByName(categoryName, userId, (err, existingCategory) => {
    if (err) {
      return res.status(500).json({ error: "An error occurred while processing the category." });
    }

    const categoryId = existingCategory ? existingCategory.cat_id : null;

    const handleAddHabit = (categoryId) => {
      addHabit(habitName, description, userId, categoryId, startDate, endDate, (err, newHabit) => {
        if (err) {
          return res.status(500).json({ error: "An error occurred while adding the habit." });
        }

        addGoal(newHabit.id, goal, (err) => {
          if (err) {
            return res.status(500).json({ error: "An error occurred while adding the goal." });
          }
          res.status(201).json({ id: newHabit.id, message: "Habit and goal added successfully." });
        });
      });
    };

    if (!categoryId) {
      addCategory(categoryName, userId, (err, newCategory) => {
        if (err) {
          return res.status(500).json({ error: "An error occurred while creating the category." });
        }
        handleAddHabit(newCategory.id);
      });
    } else {
      handleAddHabit(categoryId);
    }
  });
};

module.exports = addHabitControl;
