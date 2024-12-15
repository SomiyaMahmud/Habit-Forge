import './Hero.css';

const Hero = ({ heroData, setHeroCount, heroCount }) => {
  return (
    <div className='hero'>
      {heroCount > 0 && (
        <div className="hero-text">
          <p>{heroData[heroCount].text1}</p>
          <p>{heroData[heroCount].text2}</p>
        </div>
      )}
      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(3)} className={heroCount === 3 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(4)} className={heroCount === 4 ? "hero-dot orange" : "hero-dot"}></li>
        </ul>
      </div>
    </div>
  );
};

export default Hero;

