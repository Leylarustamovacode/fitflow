
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Clock, Target, Star, MapPin, Phone, Mail } from 'lucide-react';
import './about.scss';
import { Link } from 'react-router-dom';
const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTrainer, setCurrentTrainer] = useState(0);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  // Sample data
  const gymImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=500&fit=crop'
  ];

 const trainers = [
  {
    name: "Rashad Mammadov",
    specialty: "Personal Trainer | Specialized in TRX and bodyweight training",
    image: "https://static.vecteezy.com/system/resources/thumbnails/046/836/912/small_2x/confident-young-male-russian-fitness-trainer-in-gym-environment-for-health-and-wellness-promotion-photo.jpg",
    experience: "5+ years of experience"
  },
  {
    name: "Aynur Aliyeva",
    specialty: "Group Workouts | Expert in Yoga and Pilates",
    image: "https://t3.ftcdn.net/jpg/05/62/09/28/360_F_562092860_mWJBNRqTg4rarfoJaSdkaLlfy1dkrP33.jpg",
    experience: "7+ years of experience"
  },
  {
    name: "Farid Gasimov",
    specialty: "Strength Training | Bodybuilding and CrossFit",
    image: "https://images.squarespace-cdn.com/content/v1/5ede457a2188e55de5de09a7/1591718388454-L555WHFDDZ0UI5ZCWXEQ/Personal+Trainer+Profile+%28Full+Size%29.jpg",
    experience: "8+ years of experience"
  }
];

const workoutImages = [
 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&h=400&fit=crop',
     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&h=400&fit=crop'
 
];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gymImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkout((prev) => (prev + 1) % workoutImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const nextTrainer = () => {
    setCurrentTrainer((prev) => (prev + 1) % trainers.length);
  };

  const prevTrainer = () => {
    setCurrentTrainer((prev) => (prev - 1 + trainers.length) % trainers.length);
  };

  return (
    <div className="fitflow-container">
      {/* Hero Section */}
      <section className="hero-section">
  <div className="hero-content">
    <div className="hero-inner">
      <div className="hero-badge">
        <span>🏋️‍♂️ Premium Fitness Experience</span>
      </div>

      <h1 className="hero-title">
        Stay fit with 
        <span className="hero-title-gradient">
          FitFlow!
        </span>
      </h1>

      <p className="hero-description">
        We bring together professional gym experience and the comfort of home workouts.
        <span className="hero-subtitle">
          For all levels, anywhere – your fitness journey starts with us
        </span>
      </p>

    
<div className="hero-buttons">
  <Link to="/reservation" className="btn-primary">
    <span>Book a Gym Session</span>
    <div className="btn-overlay"></div>
  </Link>

  <Link to="/practice" className="btn-secondary">
    <span className="btn-content">
      <Play className="btn-icon" />
      Start at Home
    </span>
    <div className="btn-overlay"></div>
    <span className="btn-hover-content">
      <Play className="btn-icon" />
      Start at Home
    </span>
  </Link>
</div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">5+</div>
          <div className="stat-label">Trainers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100+</div>
          <div className="stat-label">Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </div>
    </div>
  </div>

  {/* Background Elements */}
  <div className="bg-element bg-element-1"></div>
  <div className="bg-element bg-element-2"></div>
  <div className="bg-element bg-element-3"></div>
  <div className="bg-element bg-element-4"></div>

  {/* Floating Elements */}
  <div className="floating-element floating-1">
    <div className="floating-dot floating-dot-1"></div>
  </div>
  <div className="floating-element floating-2">
    <div className="floating-dot floating-dot-2"></div>
  </div>
  <div className="floating-element floating-3">
    <div className="floating-dot floating-dot-3"></div>
  </div>
</section>


      {/* About Section */}
     <section className="about-section">
  <div className="container">
    <div className="section-header">
      <h2 className="section-title">About Us</h2>
      <div className="section-divider"></div>
    </div>

    <div className="about-content">
      <div className="about-cards">
        <div className="card1">
          <h3 className="card-title">
            <MapPin className="card-icon card-icon-purple" />
            About the Gym
          </h3>
          <ul className="card-list">
            <li>• FitFlow has been operating since 2019.</li>
            <li>• We have 5 professional trainers and a fully equipped gym.</li>
            <li>• We offer personalized and group workouts for all levels.</li>
          </ul>
        </div>

        <div className="card1">
          <h3 className="card-title">
            <Target className="card-icon card-icon-blue" />
            Home Workouts
          </h3>
          <p className="card-text">
            Don’t fall behind on the days you can’t make it to the gym — try our quick and simple workouts at home.
          </p>
        </div>

        <div className="card1">
          <h3 className="card-title">
            <Star className="card-icon card-icon-yellow" />
            The Best of Both Worlds
          </h3>
          <p className="card-text">
            FitFlow provides consistency and flexibility through both a real gym experience and home alternatives.
          </p>
        </div>
      </div>

      {/* Image Slider */}
      <div className="image-slider-container">
        <div className="image-slider">
          <img 
            src={gymImages[currentSlide]} 
            alt="Gym" 
            className="slider-image"
            key={currentSlide}
          />
          <div className="slider-overlay"></div>
        </div>

        {/* Slide indicators */}
        <div className="slider-indicators">
          {gymImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`indicator ${currentSlide === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</section>





      {/* Gym Reservation CTA */}
  <section className="cta-section">
  <div className="container">
    <h2 className="cta-title">
      Book now to start training at our gym!
    </h2>
    <p className="cta-description">
      Begin your fitness journey with our professional trainers and fully equipped gym.
    </p>
    <Link to="/reservation" className="cta-button">
  Book a Gym Session
</Link>
  </div>
</section>


      {/* Home Workout Section */}
     <section className="home-workout-section">
  <section className="home-workout-info">
    <section className="home-workout-card">
      <h3 className="home-workout-title">Why Home Workouts?</h3>
      <p className="home-workout-description">
        Don’t fall behind even on the days you can’t make it to the gym. FitFlow keeps you in shape.
      </p>

      <section className="home-feature-list">
        <section className="home-feature-item">
          <Users className="home-feature-icon icon-purple" />
          <span>Different workout plans by gender</span>
        </section>
        <section className="home-feature-item">
          <Clock className="home-feature-icon icon-blue" />
          <span>Timer-based rests and circuits</span>
        </section>
        <section className="home-feature-item">
          <Play className="home-feature-icon icon-green" />
          <span>Exercise animations</span>
        </section>
      </section>
    </section>

   <Link to="/practice" className="home-workout-button">
  Start at Home
</Link>
  </section>

  {/* Workout Images Slider */}
  <section className="home-slider-wrapper">
    <section className="home-slider">
      <img 
        src={workoutImages[currentWorkout]} 
        alt="Home Workout" 
        className="home-slider-image"
        key={currentWorkout}
      />
      <section className="home-slider-overlay"></section>
      <section className="home-slider-info">
        <h4 className="home-slider-title">Home Workout</h4>
        <p className="home-slider-subtitle">Anywhere, Anytime</p>
      </section>
    </section>

    {/* Slide Indicators */}
    <section className="home-slider-indicators">
      {workoutImages.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentWorkout(index)}
          className={`home-indicator ${currentWorkout === index ? 'active' : ''}`}
        />
      ))}
    </section>
  </section>
</section>


      
    
    </div>
  );
};

export default About;