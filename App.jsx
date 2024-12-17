import React, { useState, useEffect } from "react";
import "./App.css";

const Toast = ({ message, type, onClose }) => (
  <div className={`toast ${type}`}>
    <span>{message}</span>
    <button onClick={onClose}>✖</button>
  </div>
);

const App = () => {
  const [userId] = useState(1);
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    category: "",
    goal: "",
  });
  const [toast, setToast] = useState({ message: "", type: "", show: false });

  useEffect(() => {
    fetch("http://localhost:5001/api/habits", {
      //credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch habits.");
        }
        return response.json();
      })
      .then((data) => {
        const updatedData = data.map((habit) => ({
          ...habit,
          progress: habit.streak / habit.goal, // Calculate progress
        }));
        setHabits(updatedData);
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ message: "", type: "", show: false }), 3000);
  };

  const addHabit = () => {
    if (!newHabit.name.trim() || !newHabit.description.trim() || !newHabit.goal.trim()) {
      showToast("Please fill out all fields, including Goal.", "error");
      return;
    }

    if (isNaN(newHabit.goal) || newHabit.goal <= 0) {
      showToast("Goal must be a positive integer.", "error");
      return;
    }

    fetch("http://localhost:5001/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    //  credentials: "include",
      body: JSON.stringify(newHabit),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add habit.");
        }
        return response.json();
      })
      .then((data) => {
        showToast("Habit added successfully!", "success");
        setHabits([
          ...habits,
          {
            ...newHabit,
            id: data.id,
            streak: 0,
            goal: parseInt(newHabit.goal),
            progress: 0,
          },
        ]);
        setNewHabit({ name: "", description: "", category: "", goal: "" });
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };

  const deleteHabit = (id) => {
    fetch(`http://localhost:5001/api/habits/${id}`, {
      method: "DELETE",
    //  credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete habit.");
        }
        showToast("Habit deleted successfully!", "success");
        setHabits(habits.filter((habit) => habit.id !== id));
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };

  const checkOffHabit = (id) => {
    const date = new Date().toISOString().split("T")[0];
    fetch(`http://localhost:5001/api/habits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    //  credentials: "include",
      body: JSON.stringify({ date_completed: date }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to check off habit.");
        }
        setHabits(
          habits.map((habit) => {
            if (habit.id === id) {
              const updatedStreak = habit.streak + 1;

              if (updatedStreak >= habit.goal) {
                showToast(`Goal reached for "${habit.name}"! 🎉`, "success");
              }

              return {
                ...habit,
                streak: updatedStreak,
                progress: updatedStreak / habit.goal,
              };
            }
            return habit;
          })
        );
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };

  const resetStreak = (id) => {
    fetch(`http://localhost:5001/api/habits/reset/${id}`, {
      method: "PUT",
    //  credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reset streak.");
        }
        setHabits(
          habits.map((habit) =>
            habit.id === id ? { ...habit, streak: 0, progress: 0 } : habit
          )
        );
        showToast("Streak reset due to missed day.", "error");
      })
      .catch((error) => {
        showToast(error.message, "error");
      });
  };

  return (
    <div className="App">
      <h1>Habit Forge</h1>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "", show: false })}
        />
      )}

      <div className="container">
        <div className="create-habit-box">
          <h2>Create Habit</h2>
          <input
            placeholder="Habit Name"
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          />
          <input
            placeholder="Description"
            value={newHabit.description}
            onChange={(e) =>
              setNewHabit({ ...newHabit, description: e.target.value })
            }
          />
          <input
            placeholder="Category (optional)"
            value={newHabit.category}
            onChange={(e) =>
              setNewHabit({ ...newHabit, category: e.target.value })
            }
          />
          <input
            placeholder="Goal (days)"
            value={newHabit.goal}
            onChange={(e) =>
              setNewHabit({ ...newHabit, goal: e.target.value })
            }
          />
          <button onClick={addHabit}>Add Habit</button>
        </div>

        <div className="habits-box">
          <h2>My Habits</h2>
          {habits.length === 0 ? (
            <p>No habits added</p>
          ) : (
            habits.map((habit) => (
              <div key={habit.id} className="habit-card">
                <div>
                  <strong>{habit.name}</strong> - {habit.description}
                </div>
                <div>
                  Streak: {habit.streak}/{habit.goal} days
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${habit.progress * 100}%` }}
                  />
                </div>
                <button
                  className="check-off-btn"
                  onClick={() => checkOffHabit(habit.id)}
                >
                  Check Off
                </button>
                <button
                  className="reset-btn"
                  onClick={() => resetStreak(habit.id)}
                >
                  Reset Streak
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteHabit(habit.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;