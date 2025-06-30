



import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, Users, Clock, Trophy, Dumbbell,  Calendar, BookOpen, 
  Play, Check, ArrowRight, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Twitter,
  Zap, Target, Award, Heart, Shield, Smartphone, Wifi, Camera, MessageCircle
} from 'lucide-react';
import "./home.scss"
const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentWorkout, setCurrentWorkout] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [counters, setCounters] = useState({
    users: 0,
    hours: 0,
    sessions: 0,
    calories: 0
  });

  const heroVideoRef = useRef(null);
  const sectionsRef = useRef([]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const targetValues = { users: 2847, hours: 15000, sessions: 4250, calories: 850000 };
      const duration = 3000;
      const steps = 120;
      const stepTime = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCounters({
          users: Math.floor(targetValues.users * easeOutQuart),
          hours: Math.floor(targetValues.hours * easeOutQuart),
          sessions: Math.floor(targetValues.sessions * easeOutQuart),
          calories: Math.floor(targetValues.calories * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targetValues);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate workout showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWorkout((prev) => (prev + 1) % workoutTypes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Fitness Enthusiast",
      rating: 5,
      text: "FitFlow completely transformed my fitness journey. The AI-powered workouts adapt perfectly to my schedule and fitness level. I've never been more motivated!",
      image: "👩‍💼",
      achievement: "Lost 25 lbs in 4 months"
    },
    {
      name: "Marcus Johnson",
      role: "Professional Athlete",
      rating: 5,
      text: "As a professional athlete, I need cutting-edge training tools. FitFlow's analytics and personalized coaching have taken my performance to the next level.",
      image: "🏃‍♂️",
      achievement: "Improved performance by 40%"
    },
    {
      name: "Emily Chen",
      role: "Busy Mom",
      rating: 5,
      text: "With three kids and a full-time job, finding time for fitness was impossible. FitFlow's flexible home workouts fit perfectly into my hectic schedule.",
      image: "👩‍👧‍👦",
      achievement: "Consistent workouts for 8 months"
    },
    {
      name: "David Rodriguez",
      role: "Senior Executive",
      rating: 5,
      text: "The premium gym network and exclusive training programs are worth every penny. FitFlow understands what busy professionals need.",
      image: "👔",
      achievement: "Reduced stress by 60%"
    }
  ];

  const workoutTypes = [
    {
      title: "HIIT Intensity",
      description: "High-intensity interval training for maximum calorie burn",
      duration: "25 min",
      calories: "400-500",
      difficulty: "Advanced",
      color: "from-red-500 to-pink-600"
    },
    {
      title: "Strength Builder",
      description: "Progressive strength training with professional guidance",
      duration: "45 min",
      calories: "300-400",
      difficulty: "Intermediate",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Yoga Flow",
      description: "Mindful movement and flexibility enhancement",
      duration: "30 min",
      calories: "150-200",
      difficulty: "Beginner",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Cardio Blast",
      description: "Heart-pumping cardio for endurance building",
      duration: "35 min",
      calories: "350-450",
      difficulty: "Intermediate",
      color: "from-purple-500 to-indigo-600"
    }
  ];

  const features = [
    // {
    //   icon: <Smartphone className="w-12 h-12" />,
    //   title: "Smart AI Coaching",
    //   description: "Personalized workouts powered by artificial intelligence",
    //   color: "from-blue-500 to-cyan-500"
    // },
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "Live Streaming",
      description: "Join live classes with world-class instructors",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Form Analysis",
      description: "Real-time form correction using computer vision",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: "Community Support",
      description: "Connect with like-minded fitness enthusiasts",
      color: "from-orange-500 to-red-500"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      features: [
        "Access to basic workouts",
        "Home workout library",
        "Basic progress tracking",
        "Community access",
        "Mobile app support"
      ],
      popular: false,
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Pro",
      price: "$39",
      period: "/month",
      features: [
        "Everything in Starter",
        "Premium gym network access",
        "Personal training sessions",
        "Advanced analytics",
        "Nutrition guidance",
        "Priority support"
      ],
      popular: true,
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Elite",
      price: "$79",
      period: "/month",
      features: [
        "Everything in Pro",
        "Unlimited gym access",
        "1-on-1 coaching sessions",
        "Custom meal plans",
        "Exclusive classes",
        "VIP support",
        "Wellness retreats"
      ],
      popular: false,
      color: "from-gold-400 to-yellow-600"
    }
  ];

  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "Head Trainer",
      specialty: "Strength & Conditioning",
      image: "👨‍🏫",
      experience: "12 years"
    },
    {
      name: "Maria Santos",
      role: "Yoga Instructor",
      specialty: "Mindfulness & Flexibility",
      image: "🧘‍♀️",
      experience: "8 years"
    },
    {
      name: "James Wilson",
      role: "Nutritionist",
      specialty: "Sports Nutrition",
      image: "👨‍⚕️",
      experience: "10 years"
    },
    {
      name: "Lisa Chang",
      role: "Wellness Coach",
      specialty: "Holistic Health",
      image: "👩‍⚕️",
      experience: "15 years"
    }
  ];

  return (
    <div className="fitflow-landing">
      

      

      {/* Hero Section */}
      <section id="home1" className="hero-section1" ref={el => sectionsRef.current[0] = el}>
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            🎉 New AI-Powered Workouts Available Now!
          </div>
          <h1 className="hero-titlem1">Transform Your Fitness Journey with FitFlow</h1>
          <p className="hero-subtitle">
            Experience the perfect blend of professional gym facilities and personalized home workouts, 
            powered by cutting-edge AI technology and expert guidance.
          </p>
          <div className="hero-buttons">
            <a href="/reservation" className="btn-primary">
              <Dumbbell size={20} />
              Start Your Journey
            </a>
            <a href="/practice" className="btn-secondary">
              <Play size={20} />
              Watch Demo
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">2,847+</span>
              <span className="hero-stat-label">Active Members</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">15,000+</span>
              <span className="hero-stat-label">Hours Trained</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">98%</span>
              <span className="hero-stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="features-section" ref={el => sectionsRef.current[1] = el}>
        <div className="features-container">
          <div className="section-header">
            <div className="section-badge">Revolutionary Features</div>
            <h2 className="section-title">Why Choose FitFlow?</h2>
            <p className="section-description">
              Discover the cutting-edge features that make FitFlow the ultimate fitness companion 
              for modern lifestyles.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Workout Showcase */}
      <section id="workouts" className="workout-section" ref={el => sectionsRef.current[2] = el}>
        <div className="workout-bg"></div>
        <div className="workout-showcase">
          <div className="workout-content">
            <div className="section-header">
              <div className="section-badge">Workout Library</div>
              <h2 className="section-title">Tailored Workouts for Every Goal</h2>
              <p className="section-description">
                From high-intensity training to mindful yoga sessions, discover workouts 
                designed by professional trainers for maximum results.
              </p>
            </div>
          </div>
          <div className="workout-card">
            <div className="workout-type">{workoutTypes[currentWorkout].difficulty} Level</div>
            <h3 className="workout-title">{workoutTypes[currentWorkout].title}</h3>
            <p className="workout-description">{workoutTypes[currentWorkout].description}</p>
            <div className="workout-stats">
              <div className="workout-stat">
                <span className="workout-stat-value">{workoutTypes[currentWorkout].duration}</span>
                <span className="workout-stat-label">Duration</span>
              </div>
              <div className="workout-stat">
                <span className="workout-stat-value">{workoutTypes[currentWorkout].calories}</span>
                <span className="workout-stat-label">Calories</span>
              </div>
              <div className="workout-stat">
                <span className="workout-stat-value">{workoutTypes[currentWorkout].difficulty}</span>
                <span className="workout-stat-label">Level</span>
              </div>
            </div>
            <button className="btn-primary">
              <Play size={20} />
              Start Workout
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section id="stats-section" className="stats-section" ref={el => sectionsRef.current[3] = el}>
        <div className="stats-bg"></div>
        <div className="stats-container">
          <div className="section-header">
            <h2 className="section-title">Incredible Results</h2>
            <p className="section-description">
              Join thousands of satisfied members who have transformed their lives with FitFlow
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={30} />
              </div>
              <span className="stat-number">{counters.users.toLocaleString()}+</span>
              <span className="stat-label">Active Members</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Clock size={30} />
              </div>
              <span className="stat-number">{counters.hours.toLocaleString()}+</span>
              <span className="stat-label">Training Hours</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Trophy size={30} />
              </div>
              <span className="stat-number">{counters.sessions.toLocaleString()}+</span>
              <span className="stat-label">Sessions Completed</span>
            </div>
            {/* <div className="stat-card">
              <div className="stat-icon">
                <Zap size={30} />
              </div>
              <span className="stat-number">{(counters.calories / 1000).toFixed(0)}K+</span>
              <span className="stat-label">Calories Burned</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="testimonials-section" ref={el => sectionsRef.current[4] = el}>
        <div className="testimonials-container">
          <div className="section-header">
            <div className="section-badge">Success Stories</div>
            <h2 className="section-title">What Our Members Say</h2>
            <p className="section-description">
              Real stories from real people who transformed their lives with FitFlow
            </p>
          </div>
          <div className="testimonial-card">
            <span className="testimonial-avatar">{testimonials[currentTestimonial].image}</span>
            <div className="testimonial-rating">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} size={24} fill="#ffd700" color="#ffd700" />
              ))}
            </div>
            <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
            <div className="testimonial-achievement">
              {testimonials[currentTestimonial].achievement}
            </div>
            <p className="testimonial-author">{testimonials[currentTestimonial].name}</p>
            <p className="testimonial-role">{testimonials[currentTestimonial].role}</p>
          </div>
          <div className="testimonial-nav">
            <button className="nav-btn" onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}>
              <ChevronLeft size={24} />
            </button>
            <button className="nav-btn" onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section" ref={el => sectionsRef.current[5] = el}>
        <div className="pricing-container">
          <div className="section-header">
            <div className="section-badge">Flexible Plans</div>
            <h2 className="section-title">Choose Your Perfect Plan</h2>
            <p className="section-description">
              Start your fitness journey with a plan that fits your lifestyle and goals
            </p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3 className="pricing-name">{plan.name}</h3>
                  <div>
                    <span className="pricing-price">{plan.price}</span>
                    <span className="pricing-period">{plan.period}</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <button className="pricing-btn">Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section" ref={el => sectionsRef.current[6] = el}>
        <div className="team-container">
          <div className="section-header">
            <div className="section-badge">Expert Team</div>
            <h2 className="section-title">Meet Your Fitness Experts</h2>
            <p className="section-description">
              Our certified trainers and wellness experts are here to guide you every step of the way
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <span className="team-avatar">{member.image}</span>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-specialty">{member.specialty}</p>
                <span className="team-experience">{member.experience} experience</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Blog Section */}
      <section id="blog" className="blog-section" ref={el => sectionsRef.current[7] = el}>
        <div className="blog-container">
          <div className="section-header">
            <div className="section-badge">Latest Insights</div>
            <h2 className="section-title">Fitness Tips & Expert Advice</h2>
            <p className="section-description">
              Stay informed with the latest fitness trends, nutrition tips, and wellness strategies
            </p>
          </div>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-image">💪</div>
              <div className="blog-content">
                <div className="blog-category">Workout Tips</div>
                <h3 className="blog-title">5 Essential Tips for Effective Home Workouts</h3>
                <p className="blog-excerpt">
                  Maximize your fitness results with these proven strategies for home training success...
                </p>
                <div className="blog-meta">
                  <span>3 min read</span>
                  <span className="blog-date">Dec 15, 2024</span>
                </div>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-image">🏋️</div>
              <div className="blog-content">
                <div className="blog-category">Equipment Guide</div>
                <h3 className="blog-title">Understanding TRX: The Complete Suspension Training Guide</h3>
                <p className="blog-excerpt">
                  Discover the benefits of suspension training and how to incorporate TRX into your routine...
                </p>
                <div className="blog-meta">
                  <span>5 min read</span>
                  <span className="blog-date">Dec 12, 2024</span>
                </div>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-image">🥗</div>
              <div className="blog-content">
                <div className="blog-category">Nutrition</div>
                <h3 className="blog-title">Proper Nutrition for Optimal Fitness Performance</h3>
                <p className="blog-excerpt">
                  Learn the fundamentals of sports nutrition and how to fuel your workouts effectively...
                </p>
                <div className="blog-meta">
                  <span>4 min read</span>
                  <span className="blog-date">Dec 10, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section" ref={el => sectionsRef.current[8] = el}>
        <div className="cta-bg"></div>
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Your Life?</h2>
          <p className="cta-description">
            Join thousands of members who have already started their fitness transformation with FitFlow. 
            Your journey to a healthier, stronger you begins today.
          </p>
          <div className="cta-buttons">
            <a href="/signup" className="btn-primary">
              <ArrowRight size={20} />
              Start Free Trial
            </a>
            <a href="/contact" className="btn-secondary">
              <MessageCircle size={20} />
              Talk to Expert
            </a>
          </div>
        </div>
      </section>

     </div> 
);
 
};

export default Home;