
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Clock, Target, Star, MapPin, Phone, Mail } from 'lucide-react';
import './about.scss';

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
      name: "Rəşad Məmmədov",
      specialty: "Fərdi məşqçi | TRX və bədən çəkisi üzrə ixtisaslaşmış",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=300&h=400&fit=crop",
      experience: "5+ il təcrübə"
    },
    {
      name: "Aynur Əliyeva",
      specialty: "Qrup məşqləri | Yoga və Pilates üzrə mütəxəssis",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
      experience: "7+ il təcrübə"
    },
    {
      name: "Fərid Qasımov",
      specialty: "Güc məşqləri | Bodybuilding və crossfit",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      experience: "8+ il təcrübə"
    }
  ];

  const workoutImages = [
    'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
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
              FitFlow ilə 
              <span className="hero-title-gradient">
                formada qal!
              </span>
            </h1>
            
            <p className="hero-description">
              Peşəkar zal təcrübəsini və evdə rahat məşqləri bir arada təqdim edirik.
              <span className="hero-subtitle">
                Hər səviyyədə, hər yerdə - fitness səyahətiniz bizimlədir
              </span>
            </p>
            
            <div className="hero-buttons">
              <button 
                onClick={() => setCurrentPage('reservation')}
                className="btn-primary"
              >
                <span>Zala Rezerv Et</span>
                <div className="btn-overlay"></div>
              </button>
              
              <button 
                onClick={() => setCurrentPage('practice')}
                className="btn-secondary"
              >
                <span className="btn-content">
                  <Play className="btn-icon" />
                  Evdə Başla
                </span>
                <div className="btn-overlay"></div>
                <span className="btn-hover-content">
                  <Play className="btn-icon" />
                  Evdə Başla
                </span>
              </button>
            </div>

            {/* Stats Section */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">2019</div>
                <div className="stat-label">İldən bəri</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Məşqçi</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Üzv</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Dəstək</div>
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
            <h2 className="section-title">Haqqımızda</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="about-content">
            <div className="about-cards">
              <div className="card">
                <h3 className="card-title">
                  <MapPin className="card-icon card-icon-purple" />
                  Zal haqqında
                </h3>
                <ul className="card-list">
                  <li>• FitFlow 2019-cu ildən fəaliyyət göstərir.</li>
                  <li>• 5 peşəkar məşqçimiz və tam təchizatlı zalımız var.</li>
                  <li>• Fərdi və qrup məşqləri ilə istənilən səviyyəyə uyğun proqramlar təqdim edirik.</li>
                </ul>
              </div>
              
              <div className="card">
                <h3 className="card-title">
                  <Target className="card-icon card-icon-blue" />
                  Ev məşqləri
                </h3>
                <p className="card-text">
                  Zala gələ bilmədiyiniz günlər üçün sadə və qısa məşqlərlə geri qalmayın.
                </p>
              </div>
              
              <div className="card">
                <h3 className="card-title">
                  <Star className="card-icon card-icon-yellow" />
                  İki sistemin üstünlüyü
                </h3>
                <p className="card-text">
                  FitFlow həm real zal, həm də ev alternativi ilə sizə davamlılıq və rahatlıq təqdim edir.
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

      {/* Trainers Section */}
      <section className="trainers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Məşqçilərimiz</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="trainers-container">
            <div className="trainer-card">
              <div className="trainer-content">
                <div className="trainer-image-container">
                  <img 
                    src={trainers[currentTrainer].image} 
                    alt={trainers[currentTrainer].name}
                    className="trainer-image"
                  />
                  <div className="trainer-badge">
                    {trainers[currentTrainer].experience}
                  </div>
                </div>
                
                <div className="trainer-info">
                  <h3 className="trainer-name">
                    {trainers[currentTrainer].name}
                  </h3>
                  <p className="trainer-specialty">
                    {trainers[currentTrainer].specialty}
                  </p>
                  <button className="trainer-cta-button">
                    Rezervasiya et
                  </button>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevTrainer}
              className="trainer-nav-btn trainer-nav-prev"
            >
              <ChevronLeft className="nav-icon" />
            </button>
            <button 
              onClick={nextTrainer}
              className="trainer-nav-btn trainer-nav-next"
            >
              <ChevronRight className="nav-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Gym Reservation CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            Zalımızda məşqə başlamaq üçün rezerv et!
          </h2>
          <p className="cta-description">
            Peşəkar məşqçilərimiz və tam təchizatlı zalımızla fitness səyahətinizə başlayın
          </p>
          <button 
            onClick={() => setCurrentPage('reservation')}
            className="cta-button"
          >
            Zala Rezerv Et
          </button>
        </div>
      </section>

      {/* Home Workout Section */}
      <section className="workout-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Evdə Məşq Alternativi</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="workout-content">
            <div className="workout-info">
              <div className="card">
                <h3 className="card-title">Niyə evdə məşqlər?</h3>
                <p className="card-text">
                  Zala gələ bilmədiyiniz günlərdə belə geri qalmayın. FitFlow sizi formada saxlayır.
                </p>
                
                <div className="feature-list">
                  <div className="feature-item">
                    <Users className="feature-icon feature-icon-purple" />
                    <span>Cinsə görə fərqli məşq planı</span>
                  </div>
                  <div className="feature-item">
                    <Clock className="feature-icon feature-icon-blue" />
                    <span>Taymerlə istirahət və dövrələr</span>
                  </div>
                  <div className="feature-item">
                    <Play className="feature-icon feature-icon-green" />
                    <span>Hərəkət animasiyaları</span>
                  </div>
                </div>
              </div>
              
              <button className="workout-cta-button">
                Evdə Başla
              </button>
            </div>
            
            {/* Workout Images Slider */}
            <div className="workout-slider-container">
              <div className="workout-slider">
                <img 
                  src={workoutImages[currentWorkout]} 
                  alt="Home Workout" 
                  className="workout-image"
                  key={currentWorkout}
                />
                <div className="workout-overlay"></div>
                <div className="workout-info-overlay">
                  <h4 className="workout-overlay-title">Evdə Məşq</h4>
                  <p className="workout-overlay-text">Hər yerdə, hər zaman</p>
                </div>
              </div>
              
              {/* Slide indicators */}
              <div className="slider-indicators">
                {workoutImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentWorkout(index)}
                    className={`indicator ${currentWorkout === index ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
    
    </div>
  );
};

export default About;