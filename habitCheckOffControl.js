const { checkOffHabit, undoHabitCheckOff, checkIfHabitCheckedOffToday } = require("../model");

const checkOffHabitControl = (req, res) => {
  const { id } = req.params;
  const { date_completed } = req.body;
  const today = new Date().toISOString().split('T')[0]; 

  checkIfHabitCheckedOffToday(id, today, (err, results) => {
    if (err) {
      return res.status(500).send("Error checking the habit status.");
    }

    if (results.length > 0) {
      undoHabitCheckOff(id, today, (err, result) => {
        if (err) {
          return res.status(500).send("Error undoing the habit check-off.");
        }
        return res.status(200).send("Habit check-off undone.");
      });
    } else {
      checkOffHabit(id, today, (err, result) => {
        if (err) {
          return res.status(500).send("Error checking off the habit.");
        }
        return res.status(200).send("Habit checked off.");
      });
    }
  });
};

module.exports = checkOffHabitControl;
