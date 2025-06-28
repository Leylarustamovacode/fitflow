import React, { useState, useEffect } from "react";
import "./healthtracker.scss";

function HealthTracker() {
  // Mövcud state-lər
  const [height, setHeight] = useState(localStorage.getItem("height") || "");
  const [weight, setWeight] = useState(localStorage.getItem("weight") || "");
  const [bmi, setBmi] = useState(localStorage.getItem("bmi") || null);
  const [glasses, setGlasses] = useState(Number(localStorage.getItem("glasses")) || 0);

  // Yuxu üçün state-lər
  const [bedTime, setBedTime] = useState(localStorage.getItem("bedTime") || "");
  const [wakeUpTime, setWakeUpTime] = useState(localStorage.getItem("wakeUpTime") || "");
  const [sleepDuration, setSleepDuration] = useState(
    localStorage.getItem("sleepDuration") ? Number(localStorage.getItem("sleepDuration")) : null
  );
  const [sleepStatus, setSleepStatus] = useState(localStorage.getItem("sleepStatus") || "");

  // Həftəlik yuxu məlumatları: Array of objects {day: "Mon", duration: minutes}
  // localStorage-dan yüklə, yoxdursa sıfırla
  const [sleepData, setSleepData] = useState(() => {
    const data = localStorage.getItem("sleepData");
    if (data) return JSON.parse(data);
    // Default 7 gün, sıfır dəqiqə yuxu
    return [
      { day: "Mon", duration: 0 },
      { day: "Tue", duration: 0 },
      { day: "Wed", duration: 0 },
      { day: "Thu", duration: 0 },
      { day: "Fri", duration: 0 },
      { day: "Sat", duration: 0 },
      { day: "Sun", duration: 0 },
    ];
  });

  // Bu günün indeksi (0=Mon, 6=Sun)
  const getTodayIndex = () => {
    const d = new Date();
    let day = d.getDay(); // 0=Sun, 1=Mon...
    return day === 0 ? 6 : day - 1; // Bizdə həftə Mon-dan başladığı üçün 0=Mon
  };

  // Yuxu müddətini hesabla
  const calculateSleep = () => {
    if (!bedTime || !wakeUpTime) {
      setSleepDuration(null);
      setSleepStatus("");
      return;
    }

    const [bedH, bedM] = bedTime.split(":").map(Number);
    const [wakeH, wakeM] = wakeUpTime.split(":").map(Number);

    const bedDate = new Date();
    bedDate.setHours(bedH, bedM, 0, 0);

    const wakeDate = new Date();
    if (wakeH < bedH || (wakeH === bedH && wakeM <= bedM)) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }
    wakeDate.setHours(wakeH, wakeM, 0, 0);

    const diffMs = wakeDate - bedDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    setSleepDuration(diffMinutes);

    if (diffMinutes >= 7 * 60) setSleepStatus("Good");
    else if (diffMinutes >= 5 * 60) setSleepStatus("Average");
    else setSleepStatus("Poor");

    // Həftəlik yuxu məlumatını güncəllə
    const todayIdx = getTodayIndex();
    const newSleepData = [...sleepData];
    newSleepData[todayIdx] = { ...newSleepData[todayIdx], duration: diffMinutes };
    setSleepData(newSleepData);
  };

  // Effektlər
  useEffect(() => {
    calculateSleep();
  }, [bedTime, wakeUpTime]);

  useEffect(() => {
    localStorage.setItem("bedTime", bedTime);
  }, [bedTime]);

  useEffect(() => {
    localStorage.setItem("wakeUpTime", wakeUpTime);
  }, [wakeUpTime]);

  useEffect(() => {
    if (sleepDuration !== null) {
      localStorage.setItem("sleepDuration", sleepDuration.toString());
      localStorage.setItem("sleepStatus", sleepStatus);
    }
  }, [sleepDuration, sleepStatus]);

  useEffect(() => {
    localStorage.setItem("height", height);
  }, [height]);

  useEffect(() => {
    localStorage.setItem("weight", weight);
  }, [weight]);

  useEffect(() => {
    if (bmi !== null) {
      localStorage.setItem("bmi", bmi);
    }
  }, [bmi]);

  useEffect(() => {
    localStorage.setItem("glasses", glasses);
  }, [glasses]);

  useEffect(() => {
    localStorage.setItem("sleepData", JSON.stringify(sleepData));
  }, [sleepData]);

  // Alert gecə 23:00 üçün
  useEffect(() => {
    const now = new Date();
    const alertTime = new Date();
    alertTime.setHours(23, 0, 0, 0);
    let msUntilAlert = alertTime - now;
    if (msUntilAlert < 0) msUntilAlert += 24 * 60 * 60 * 1000;

    const timer = setTimeout(() => {
      alert("Time to sleep for better health!");
    }, msUntilAlert);

    return () => clearTimeout(timer);
  }, []);

  // Funksiyalar
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

  const getBmiStatus = (value) => {
    if (value < 18.5) return "Underweight";
    if (value >= 18.5 && value < 25) return "Normal";
    if (value >= 25 && value < 30) return "Overweight";
    return "Obese";
  };

  const getBmiPercentage = (value) => {
    const min = 10;
    const max = 40;
    let percent = ((value - min) / (max - min)) * 100;
    return Math.max(0, Math.min(percent, 100));
  };

  const getSleepPercent = (minutes) => {
    if (!minutes) return 0;
    return Math.min(100, (minutes / 600) * 100);
  };

  const formatDuration = (min) => {
    if (!min) return "--";
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="contain">
      <h1>Health Tracker</h1>

      {/* Üst sıra: BMI və Water Tracker yan-yana */}
      <div className="main-row">
        {/* BMI */}
        <div className="card bmi-area">
          <h2>BMI Calculator</h2>
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
          <button className="hbtn" onClick={handleBmi}>Calculate BMI</button>
          {bmi && (
            <>
              <p>Your BMI: <strong>{bmi}</strong></p>
              <div className="bmi-indicator">
                <div className="bmi-bar-wrapper">
                  <div className="bmi-bar"></div>
                  <div
                    className="bmi-marker"
                    style={{ left: `${getBmiPercentage(bmi)}%` }}
                  ></div>
                </div>
                <div className="bmi-labels">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <p className="bmi-status">
                  Status: <strong>{getBmiStatus(bmi)}</strong>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Water Tracker */}
        <div className="card water-area">
          <h2>Water Reminder</h2>
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
            <div className="water-drop" role="img" aria-label="Water drop">💧</div>
          </div>
          <div className="glasses">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={i < glasses ? "glass full" : "glass"}></div>
            ))}
          </div>
          <button className="hbtn" onClick={handleDrink}>Drink 250ml</button>
        </div>
      </div>

      {/* Alt sıra: Sleep Tracker */}
      <div className="card sleep-area">
        <h2>
          Sleep Tracker <span className="sleep-icon" role="img" aria-label="Moon">🌙</span>
        </h2>
        <label>Bed Time:</label>
        <input
          type="time"
          value={bedTime}
          onChange={(e) => setBedTime(e.target.value)}
        />
        <label>Wake Up Time:</label>
        <input
          type="time"
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
        />

        <div className="sleep-duration-bar-wrapper">
          <div className="sleep-duration-bar" style={{ width: `${getSleepPercent(sleepDuration)}%` }}></div>
        </div>

        <p>Sleep Duration: <strong>{formatDuration(sleepDuration)}</strong></p>
        <p>Status: <strong>{sleepStatus || "--"}</strong></p>
      </div>

      {/* Alt sıra: Weekly Sleep Chart */}
      <div className="weekly-sleep-graph-area">
        <h2>Weekly Sleep Chart</h2>
        <div className="sleep-graph">
          {/* Y oxu sınıq xətləri */}
          {[10, 8, 6, 4, 2, 0].map((val) => (
            <div key={val} className={`y-grid-line y-${val}`}>
              {val}h
            </div>
          ))}
          <div className="sleep-line"></div>

          {/* Sleep points */}
          <div className="sleep-points">
            {sleepData.map((day, idx) => (
              <div
                key={idx}
                className="sleep-point"
                style={{ bottom: `${(day.duration / 600) * 100}%` }}
                title={`${day.day}: ${formatDuration(day.duration)}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="sleep-labels">
          {sleepData.map((day) => (
            <span key={day.day}>{day.day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthTracker;
