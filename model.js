const db = require("./control/connect");

// Fetch category by name and user ID
const getCategoryByName = (categoryName, userId, callback) => {
  db.query(
    "SELECT * FROM category WHERE cat_name = ? AND cat_user_id = ?",
    [categoryName, userId],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]); // Return the first matching row or null
    }
  );
};

// Add a new category
const addCategory = (categoryName, userId, callback) => {
  db.query(
    "INSERT INTO category (cat_name, cat_user_id) VALUES (?, ?)",
    [categoryName, userId],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { id: result.insertId, name: categoryName });
    }
  );
};

// Add a habit
const addHabit = (habitName, description, userId, categoryId, startDate, endDate, callback) => {
  db.query(
    "INSERT INTO habits (habit_name, description, user_id, habit_cat_id, created_at, habit_end) VALUES (?, ?, ?, ?, ?, ?)",
    [habitName, description, userId, categoryId, startDate, endDate],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, { id: result.insertId, name: habitName });
    }
  );
};

// Fetch habits by user ID
const getHabitsByUser = (userId, callback) => {
  db.query(
    "SELECT * FROM habits WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

// Delete a habit by habit ID and user ID
const deleteHabit = (habitId, userId, callback) => {
  const query = "DELETE FROM habits WHERE hid = ? AND user_id = ?";

  db.query(query, [habitId, userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows > 0);
  });
};

// Function to mark a habit as checked off
const checkOffHabit = (habitId, dateCompleted, callback) => {
  const query = `INSERT INTO daily_checklist (habit_id, date, is_completed) VALUES (?, ?, ?)`;

  db.query(query, [habitId, dateCompleted, true], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Function to undo the habit check-off
const undoHabitCheckOff = (habitId, dateCompleted, callback) => {
  const query = `DELETE FROM daily_checklist WHERE habit_id = ? AND date = ?`;

  db.query(query, [habitId, dateCompleted], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Function to check if the habit has already been checked off today
const checkIfHabitCheckedOffToday = (habitId, date, callback) => {
  const query = `SELECT * FROM daily_checklist WHERE habit_id = ? AND date = ?`;

  db.query(query, [habitId, date], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const addGoal = (habitId, streak, callback) => {
  const query = "INSERT INTO goals (hid, streak) VALUES (?, ?)";
  db.query(query, [habitId, streak], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, { id: result.insertId, habitId, streak });
  });
};


module.exports = {
  getCategoryByName,
  addCategory,
  addHabit,
  getHabitsByUser,
  deleteHabit,
  checkOffHabit,
  undoHabitCheckOff,
  checkIfHabitCheckedOffToday,
  addGoal,
};
