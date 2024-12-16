import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Home from "./pages/Home/Home";
import Challenges from "./pages/Challenges/Challenges";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";

const App = () => {
  let heroData = [
    { text1: "Welcome to", text2: "HabitForge" },
    { text1: "Stay Active,", text2: "Stay Energized" },
    { text1: "Find Your", text2: "Inner Calm" },
    { text1: "Feed Your", text2: "Mind" },
    { text1: "Build Better Habits,", text2: "Achieve More!" }
  ];

  const [heroCount, setHeroCount] = useState(0);

  return (
    <Router>
      <Background heroCount={heroCount} />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>

      <Hero
        heroData={heroData}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
      />
    </Router>
  );
};

export default App;
