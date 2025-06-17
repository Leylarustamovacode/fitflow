import React from 'react'
import { useState } from "react";
import './exercise.scss'
function Exercise() {
    const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [glasses, setGlasses] = useState(0);

  const handleBmi = () => {
    if (height && weight) {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      const bmiValue = (w / (h * h)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  const handleDrink = () => {
    if (glasses < 8) setGlasses(glasses + 1);
  };
  return (
    <div>
      <div className="contain">
      <h1>FitFlow</h1>

      <div className="circle-tracker">
        <svg width="150" height="150">
          <circle cx="75" cy="75" r="60" stroke="#eee" strokeWidth="12" fill="none" />
          <circle
            cx="75"
            cy="75"
            r="60"
            stroke="#00aaff"
            strokeWidth="12"
            fill="none"
            strokeDasharray={377}
            strokeDashoffset={377 - (377 * glasses) / 8}
            transform="rotate(-90 75 75)"
          />
        </svg>
        <div className="water-drop">💧</div>
      </div>

      <div className="glasses">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={i < glasses ? "glass full" : "glass"}></div>
        ))}
      </div>

      <button onClick={handleDrink}>Drink 250ml</button>

      <div className="input-area">
        <label>Height (cm):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <button onClick={handleBmi}>Calculate BMI</button>
        {bmi && <p>Your BMI: <strong>{bmi}</strong></p>}
      </div>
    </div>
    </div>
  )
}

export default Exercise




