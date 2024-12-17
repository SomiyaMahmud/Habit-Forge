const { deleteHabit } = require("../model");

const deleteHabitControl = (req, res) => {
  const { id } = req.params; 
  const userId = req.user.id; 
  deleteHabit(id, userId, (err, success) => {
    if (err) {
      return res.status(500).send("Error deleting habit.");
    }
    if (success) {
      return res.status(200).send("Habit deleted.");
    } else {
      return res.status(404).send("Habit not found or you do not have permission to delete it.");
    }
  });
};

module.exports = deleteHabitControl;
