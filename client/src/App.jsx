import { useState} from "react"
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
const App = () => {
  let heroData = [
    {text1: "A Balanced Life is", text2:"a Healthy Life"},
    {text1: "Stay Active,", text2: "Stay Energized"},
    {text1:"Find Your", text2: "Inner Calm"},
    {text1: "Feed Your", text2:"Mind"},
    {text1:"Build Better Habits,", text2:"Achieve More!"}
  ]
  const [heroCount, setHeroCount] = useState(0); 
  return (
    <div>
      <Background heroCount={heroCount}/>
      <Navbar/>
      <Hero
        heroData={heroData}
        heroCount={heroCount}
        setHeroCount={setHeroCount}

      />
      

      
    </div>
  )
}

export default App
