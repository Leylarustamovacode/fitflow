import React, { useState, useEffect, useRef } from 'react';
import "./practice.scss";
// --- AudioManager Class  ---
class AudioManager {
  constructor() {
    this.audioContext = null;
    this.oscillator = null;
    this.gainNode = null;
    this.backgroundMusicGain = null;
    this.isPlaying = false;
    this.currentTrack = 0;
    this.workoutTracks = [
      { name: "Energetic Beat", bpm: 128 },
      { name: "Power Pump", bpm: 135 },
      { name: "High Energy", bpm: 140 },
      { name: "Workout Zone", bpm: 125 }
    ];
  }

  async init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.backgroundMusicGain = this.audioContext.createGain();
      this.backgroundMusicGain.connect(this.audioContext.destination);
      this.backgroundMusicGain.gain.value = 0.3;
    }
  }

  playBeep(frequency = 800, duration = 200) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.value = 0.1;
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  startWorkoutMusic() {
    if (!this.audioContext || this.isPlaying) return;

    this.isPlaying = true;
    this.playBackgroundMusic();
  }

  stopWorkoutMusic() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator = null;
    }
    this.isPlaying = false;
  }

  playBackgroundMusic() {
    if (!this.audioContext || !this.isPlaying) return;

    const track = this.workoutTracks[this.currentTrack];
    const beatInterval = 60000 / track.bpm;

    this.oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    this.oscillator.connect(gainNode);
    gainNode.connect(this.backgroundMusicGain);

    this.oscillator.frequency.value = 80;
    this.oscillator.type = 'sawtooth';

    gainNode.gain.value = 0;

    const now = this.audioContext.currentTime;
    for (let i = 0; i < 32; i++) {
      const time = now + (i * beatInterval / 1000);
      if (i % 4 === 0) {
        gainNode.gain.setValueAtTime(0.2, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
      } else if (i % 2 === 0) {
        gainNode.gain.setValueAtTime(0.1, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
      }
    }

    this.oscillator.start(now);
    this.oscillator.stop(now + (32 * beatInterval / 1000));

    this.oscillator.onended = () => {
      if (this.isPlaying) {
        this.currentTrack = (this.currentTrack + 1) % this.workoutTracks.length;
        setTimeout(() => this.playBackgroundMusic(), 500);
      }
    };
  }

  playCountdownBeep() {
    this.playBeep(600, 150);
  }

  playStartBeep() {
    this.playBeep(1000, 300);
  }

  playEndBeep() {
    this.playBeep(400, 500);
  }

  playRestBeep() {
    this.playBeep(300, 400);
  }
}

// --- Exercise Data ---
const exercises = {
  male: [
    { name: "Push Up", duration: 30, description: "Place hands shoulder-width apart and perform push-ups" },
    { name: "Squat", duration: 30, description: "Stand with feet shoulder-width apart and squat down" },
    { name: "Plank", duration: 30, description: "Hold plank position on your forearms" },
    { name: "Burpees", duration: 30, description: "Full body movement - squat, jump, push-up, jump up" },
    { name: "Mountain Climbers", duration: 30, description: "From plank position, alternate bringing knees to chest" },
    { name: "Lunges", duration: 30, description: "Alternate forward lunges with each leg" },
    { name: "Jumping Jacks", duration: 30, description: "Jump while spreading arms and legs, then return" },
    { name: "High Knees", duration: 30, description: "Run in place bringing knees up high" },
    { name: "Russian Twists", duration: 30, description: "Sit and rotate torso side to side" },
    { name: "Wall Sit", duration: 30, description: "Lean against wall in sitting position" }
  ],
  female: [
    { name: "Squats", duration: 30, description: "Stand with feet shoulder-width apart and squat down" },
    { name: "Lunges", duration: 30, description: "Alternate forward lunges with each leg" },
    { name: "Plank", duration: 30, description: "Hold plank position on your forearms" },
    { name: "Glute Bridges", duration: 30, description: "Lie down and lift hips up, squeezing glutes" },
    { name: "Jumping Jacks", duration: 30, description: "Jump while spreading arms and legs, then return" },
    { name: "Crunches", duration: 30, description: "Lie down and perform abdominal crunches" },
    { name: "Side Plank", duration: 30, description: "Hold side plank position, switch sides halfway" },
    { name: "Leg Raises", duration: 30, description: "Lie down and raise legs up and down" },
    { name: "Bicycle Crunches", duration: 30, description: "Alternate elbow to opposite knee movement" },
    { name: "Wall Push-ups", duration: 30, description: "Stand arm's length from wall and do push-ups" }
  ]
};

// Gender Selection Component
function GenderSelection({ onSelect }) {
  return (
    <div className="practice-gender-selection">
      <div className="practice-container">
        <h1>🏋️‍♀️ Home Fitness</h1>
        <h2>Choose Your Gender</h2>
        <div className="practice-gender-buttons">
          <button 
            className="practice-gender-btn practice-male-btn" 
            onClick={() => onSelect("male")}
          >
            <span className="icon">👨</span>
            <span>Male</span>
          </button>
          <button 
            className="practice-gender-btn practice-female-btn" 
            onClick={() => onSelect("female")}
          >
            <span className="icon">👩</span>
            <span>Female</span>
          </button>
        </div>
        <p className="practice-description">
          Get fit with 10 home exercises and energetic workout music!
        </p>
      </div>
    </div>
  );
}

// Exercise Screen Component
function ExerciseScreen({ gender, onFinish, onRestart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRest, setIsRest] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioManager = useRef(new AudioManager());

  const exerciseList = exercises[gender];
  const currentExercise = exerciseList[currentIndex];
  const progress = ((currentIndex + (isRest ? 0.5 : 0)) / exerciseList.length) * 100;

  useEffect(() => {
    const initAudio = async () => {
      await audioManager.current.init();
      if (!isMuted) {
        audioManager.current.startWorkoutMusic();
        audioManager.current.playStartBeep();
      }
    };
    initAudio();

    return () => {
      audioManager.current.stopWorkoutMusic();
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 3 && prev > 1 && !isMuted) {
          audioManager.current.playCountdownBeep();
        }
        if (prev <= 1) {
          if (isRest) {
            if (currentIndex < exerciseList.length - 1) {
              setCurrentIndex(prev => prev + 1);
              setIsRest(false);
              if (!isMuted) audioManager.current.playStartBeep();
              return 30;
            } else {
              if (!isMuted) audioManager.current.playEndBeep();
              audioManager.current.stopWorkoutMusic();
              onFinish();
              return 0;
            }
          } else {
            if (currentIndex < exerciseList.length - 1) {
              setIsRest(true);
              if (!isMuted) audioManager.current.playRestBeep();
              return 10;
            } else {
              if (!isMuted) audioManager.current.playEndBeep();
              audioManager.current.stopWorkoutMusic();
              onFinish();
              return 0;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, isRest, isPaused, exerciseList.length, onFinish, isMuted]);

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      audioManager.current.stopWorkoutMusic();
    } else {
      if (!isMuted) audioManager.current.startWorkoutMusic();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      audioManager.current.stopWorkoutMusic();
    } else {
      if (!isPaused) audioManager.current.startWorkoutMusic();
    }
  };

  const skipExercise = () => {
    if (isRest) {
      if (currentIndex < exerciseList.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsRest(false);
        setTimeLeft(30);
        if (!isMuted) audioManager.current.playStartBeep();
      } else {
        if (!isMuted) audioManager.current.playEndBeep();
        audioManager.current.stopWorkoutMusic();
        onFinish();
      }
    } else {
      if (currentIndex < exerciseList.length - 1) {
        setIsRest(true);
        setTimeLeft(10);
        if (!isMuted) audioManager.current.playRestBeep();
      } else {
        if (!isMuted) audioManager.current.playEndBeep();
        audioManager.current.stopWorkoutMusic();
        onFinish();
      }
    }
  };

  return (
    <div className="practice-exercise-screen">
      <div className="practice-header">
        <button className="practice-back-btn" onClick={onRestart}>← Back</button>
        <div className="practice-progress-container">
          <div className="practice-progress-bar">
            <div className="practice-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="practice-progress-text">{currentIndex + 1}/{exerciseList.length}</span>
        </div>
        <button className="practice-mute-btn" onClick={toggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
      <div className="practice-exercise-content">
        {isRest ? (
          <div className="practice-rest-screen">
            <h2 className="practice-rest-title">🧘‍♀️ Rest Time</h2>
            <div className="practice-rest-animation">
              <div className="practice-pulse-circle"></div>
            </div>
            <p className="practice-next-exercise">
              Next: {exerciseList[currentIndex] ? exerciseList[currentIndex].name : 'Complete'}
            </p>
            <div className="practice-music-indicator">
              {!isMuted && <span className="practice-music-note">♪ Chill beats playing ♪</span>}
            </div>
          </div>
        ) : (
          <div className="practice-exercise-info">
            <h2 className="practice-exercise-name">{currentExercise.name}</h2>
            <div className="practice-exercise-visual">
              <div className="practice-exercise-icon">{gender === 'male' ? '🏋️‍♂️' : '🤸‍♀️'}</div>
            </div>
            <p className="practice-exercise-description">{currentExercise.description}</p>
            <div className="practice-music-indicator">
              {!isMuted && <span className="practice-music-note">♪ Workout beats playing ♪</span>}
            </div>
          </div>
        )}
        <div className="practice-timer-section">
          <div className={`practice-timer-circle ${isRest ? 'rest' : 'exercise'} ${timeLeft <= 3 && timeLeft > 0 ? 'warning' : ''}`}>
            <div className="practice-timer-number">{timeLeft}</div>
            <div className="practice-timer-label">seconds</div>
          </div>
        </div>
        <div className="practice-controls">
          <button className="practice-control-btn practice-pause-btn" onClick={togglePause}>
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button className="practice-control-btn practice-skip-btn" onClick={skipExercise}>⏭️ Skip</button>
        </div>
      </div>
    </div>
  );
}

// Completion Screen Component
function CompletionScreen({ onRestart, gender }) {
  const exerciseCount = exercises[gender].length;
  const totalTime = exerciseCount * 30 + (exerciseCount - 1) * 10;
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <div className="practice-completion-screen">
      <div className="practice-completion-content">
        <div className="practice-success-icon">🎉</div>
        <h1>Congratulations!</h1>
        <p className="practice-completion-message">You've successfully completed your workout!</p>
        <div className="practice-stats">
          <div className="practice-stat">
            <span className="practice-stat-number">{exerciseCount}</span>
            <span className="practice-stat-label">Exercises</span>
          </div>
          <div className="practice-stat">
            <span className="practice-stat-number">{minutes}:{seconds.toString().padStart(2, '0')}</span>
            <span className="practice-stat-label">Minutes</span>
          </div>
          <div className="practice-stat">
            <span className="practice-stat-number">100%</span>
            <span className="practice-stat-label">Complete</span>
          </div>
        </div>
        <button className="practice-restart-btn" onClick={onRestart}>🔄 Start Again</button>
      </div>
    </div>
  );
}

function Practice() {
  const [gender, setGender] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setIsCompleted(false);
  };

  const handleWorkoutComplete = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setGender(null);
    setIsCompleted(false);
  };

  return (
    <div className="practice-app">
      {!gender ? (
        <GenderSelection onSelect={handleGenderSelect} />
      ) : isCompleted ? (
        <CompletionScreen onRestart={handleRestart} gender={gender} />
      ) : (
        <ExerciseScreen gender={gender} onFinish={handleWorkoutComplete} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default Practice;
