import React, { useState, useEffect } from 'react';
import { ChevronDown, Dumbbell, Home, Target, Calendar, Users, Star, Award, Phone, Mail, MapPin } from 'lucide-react';
import './fag.scss'
const Fag = () => {
  const [activeGymFAQ, setActiveGymFAQ] = useState(null);
  const [activeHomeFAQ, setActiveHomeFAQ] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-section').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const gymFAQs = [
    {
      question: "How often should I go to the gym as a beginner?",
      answer: "As a beginner, start with 3-4 gym sessions per week, allowing at least one rest day between workouts. This gives your muscles time to recover and adapt. Focus on full-body workouts initially, then progress to split routines as you advance. Consistency is more important than frequency."
    },
    {
      question: "What equipment should I use first at the gym?",
      answer: "Start with basic machines like leg press, chest press, lat pulldown, and seated row. These provide stability and safety while you learn proper form. Gradually progress to free weights like dumbbells and barbells as your confidence and technique improve."
    },
    {
      question: "How long should my gym workout be?",
      answer: "Aim for 45-90 minutes per session, including warm-up and cool-down. Beginners should start with 45-60 minutes, while more advanced trainees can extend to 90 minutes. Quality over quantity - focus on proper form rather than duration."
    },
    {
      question: "Should I do cardio before or after weight training?",
      answer: "For muscle building, do weight training first when you have the most energy. For fat loss, you can do light cardio as a warm-up (5-10 minutes) and save intense cardio for after weights or on separate days to maximize both strength and cardiovascular benefits."
    },
    {
      question: "What's the best gym routine for muscle gain?",
      answer: "Focus on compound movements like squats, deadlifts, bench press, and rows. Use progressive overload by gradually increasing weight, reps, or sets. A push-pull-legs split or upper-lower split works well for intermediate to advanced trainees, while beginners should stick to full-body routines."
    },
    {
      question: "How do I avoid gym intimidation?",
      answer: "Remember everyone started somewhere. Go during off-peak hours initially, bring a structured workout plan, and don't hesitate to ask staff for help. Focus on your own progress rather than comparing yourself to others. Most gym-goers are supportive and willing to help."
    },
    {
      question: "What should I eat before and after workouts?",
      answer: "Before: Eat a balanced meal 2-3 hours prior, or a light snack 30-60 minutes before. Include carbs for energy and some protein. After: Consume protein and carbs within 2 hours post-workout to aid recovery and muscle building."
    },
    {
      question: "How do I track my progress effectively?",
      answer: "Keep a workout log noting exercises, sets, reps, and weights used. Take progress photos monthly, measure body composition, and track performance metrics like strength gains. Use fitness apps or a simple notebook to maintain consistency."
    }
  ];

  const homeFAQs = [
    {
      question: "Can I build muscle effectively at home?",
      answer: "Absolutely! With bodyweight exercises, resistance bands, and basic equipment like dumbbells, you can build significant muscle. Focus on progressive overload by increasing reps, sets, or time under tension. Consistency and proper nutrition are key to success."
    },
    {
      question: "What equipment do I need for home workouts?",
      answer: "Start with basics: yoga mat, resistance bands, and adjustable dumbbells. Add a pull-up bar, kettlebell, and stability ball as you progress. You can achieve excellent results with minimal equipment and creativity in exercise variations."
    },
    {
      question: "How do I stay motivated for home workouts?",
      answer: "Set a dedicated workout space, schedule specific times, and track your progress. Use workout apps or videos for guidance. Set short-term goals and reward yourself for achievements. Find an accountability partner or join online fitness communities."
    },
    {
      question: "What are the best bodyweight exercises?",
      answer: "Push-ups (and variations), pull-ups/chin-ups, squats, lunges, planks, burpees, and mountain climbers. These compound movements work multiple muscle groups and can be modified for any fitness level, from beginner to advanced."
    },
    {
      question: "How long should home workouts be?",
      answer: "20-45 minutes is ideal for home workouts. High-intensity sessions can be shorter (15-20 minutes), while strength-focused workouts might be longer (30-45 minutes). Consistency matters more than duration - aim for regular, sustainable sessions."
    },
    {
      question: "Can I lose weight with home workouts?",
      answer: "Yes! Combine cardio exercises (jumping jacks, burpees, high knees) with strength training. HIIT workouts are particularly effective for fat loss. Remember, diet plays a crucial role - combine exercise with proper nutrition for best results."
    },
    {
      question: "How do I create a home gym on a budget?",
      answer: "Start with free bodyweight exercises, then gradually add affordable equipment: resistance bands ($10-20), yoga mat ($15-30), dumbbells ($30-50). Check second-hand stores and online marketplaces for deals on quality equipment."
    },
    {
      question: "What's the best home workout schedule?",
      answer: "Aim for 3-5 sessions per week, alternating between strength and cardio days. For example: Monday (Full body), Wednesday (HIIT), Friday (Strength), Saturday (Yoga/Flexibility). Adjust based on your fitness level and schedule."
    }
  ];

  const toggleGymFAQ = (index) => {
    setActiveGymFAQ(activeGymFAQ === index ? null : index);
  };

  const toggleHomeFAQ = (index) => {
    setActiveHomeFAQ(activeHomeFAQ === index ? null : index);
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="fitness-faq">
      

      <div className="container">
        <header className="header">
          <div className="header-content">
            <h1 className="main-title">💪 FitFlow FAQ</h1>
            <p className="subtitle">Your Ultimate Professional Guide to Gym and Home Workouts</p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Satisfied Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Expert Trainers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support Available</span>
              </div>
             
            </div>
          </div>
        </header>

        <div className="cta-section1">
          <div className="cta-card" onClick={() => openModal('advice')}>
            <div className="cta-icon">
              <Target />
            </div>
            <h3 className="cta-title">Get Free Professional Advice</h3>
            <p className="cta-description">
              Personalized fitness consultation with certified trainers. 
              Get expert guidance tailored to your goals and fitness level.
            </p>
            <button className="cta-button">Get Advice Now</button>
          </div>
          
          <div className="cta-card" onClick={() => openModal('plans')}>
            <div className="cta-icon">
              <Calendar />
            </div>
            <h3 className="cta-title">View Comprehensive Workout Plans</h3>
            <p className="cta-description">
              Access our extensive library of workout plans designed for all fitness levels,
              from beginner to advanced athletes.
            </p>
            <button className="cta-button">View Plans</button>
          </div>
        </div>

        <div className="faq-sections">
          <div className={`faq-section animate-section ${isVisible['gym-section'] ? 'visible' : ''}`} id="gym-section">
            <div className="section-header">
              <div className="section-icon">
                <Dumbbell />
              </div>
              <h2 className="section-title">Gym Workouts</h2>
            </div>
            
            {gymFAQs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${activeGymFAQ === index ? 'active' : ''}`}
                  onClick={() => toggleGymFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`faq-arrow ${activeGymFAQ === index ? 'rotated' : ''}`} size={20} />
                </button>
                <div className={`faq-answer ${activeGymFAQ === index ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`faq-section animate-section ${isVisible['home-section'] ? 'visible' : ''}`} id="home-section">
            <div className="section-header">
              <div className="section-icon">
                <Home />
              </div>
              <h2 className="section-title">Home Workouts</h2>
            </div>
            
            {homeFAQs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${activeHomeFAQ === index ? 'active' : ''}`}
                  onClick={() => toggleHomeFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`faq-arrow ${activeHomeFAQ === index ? 'rotated' : ''}`} size={20} />
                </button>
                <div className={`faq-answer ${activeHomeFAQ === index ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'advice' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">🎯 Get Free Professional Advice</h2>
              <p className="modal-subtitle">Personalized Fitness Consultation with Certified Experts</p>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>What We Offer</h3>
                <ul className="modal-list">
                  <li>Comprehensive fitness assessment and goal setting</li>
                  <li>Personalized workout program recommendations</li>
                  <li>Nutrition guidance and meal planning advice</li>
                  <li>Exercise form correction and technique improvement</li>
                  <li>Injury prevention and recovery strategies</li>
                  <li>Progress tracking and performance optimization</li>
                  <li>Supplement recommendations based on your goals</li>
                  <li>Lifestyle integration and habit formation</li>
                </ul>
              </div>

              <div className="modal-section">
                <h3>Consultation Process</h3>
                <ul className="modal-list">
                  <li>Initial health and fitness assessment (30 minutes)</li>
                  <li>Goal setting and expectation management</li>
                  <li>Customized program design and explanation</li>
                  <li>Exercise demonstration and form coaching</li>
                  <li>Q&A session for all your fitness concerns</li>
                  <li>Follow-up support and progress check-ins</li>
                </ul>
              </div>

              <div className="modal-section">
                <h3>Our Expert Team</h3>
                <ul className="modal-list">
                  <li>ACSM and NASM certified personal trainers</li>
                  <li>Sports nutrition specialists</li>
                  <li>Physical therapy and rehabilitation experts</li>
                  <li>Former professional athletes and coaches</li>
                  <li>Specialized trainers for seniors and special populations</li>
                </ul>
              </div>

              <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="contact-item">
                  <Phone className="contact-icon" size={18} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" size={18} />
                  <span>advice@fitnessfaq.com</span>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" size={18} />
                  <span>Available online and in-person consultations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'plans' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">📋 Comprehensive Workout Plans</h2>
              <p className="modal-subtitle">Professionally Designed Programs for Every Fitness Level</p>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Beginner Programs (0-6 months experience)</h3>
                <ul className="modal-list">
                  <li>Foundation Builder - Full body strength training (3 days/week)</li>
                  <li>Home Starter Program - Bodyweight exercises and basic equipment</li>
                  <li>Gym Introduction - Machine-based routine with proper form focus</li>
                  <li>Cardio Kickstart - Low-impact cardiovascular conditioning</li>
                  <li>Flexibility & Mobility - Daily stretching and movement patterns</li>
                </ul>
              </div>

              <div className="modal-section">
                <h3>Intermediate Programs (6-18 months experience)</h3>
                <ul className="modal-list">
                  <li>Push/Pull/Legs Split - 4-5 days per week progressive program</li>
                  <li>Upper/Lower Split - Balanced strength and hypertrophy focus</li>
                  <li>HIIT & Strength Combo - Fat loss and muscle building</li>
                  <li>Athletic Performance - Sport-specific conditioning</li>
                  <li>Home Advanced - Minimal equipment, maximum results</li>
                </ul>
              </div>

              <div className="modal-section">
                <h3>Advanced Programs (18+ months experience)</h3>
                <ul className="modal-list">
                  <li>Powerlifting Progression - Squat, bench, deadlift optimization</li>
                  <li>Bodybuilding Split - 5-6 days intensive muscle building</li>
                  <li>Strength & Conditioning - Elite athlete training protocols</li>
                  <li>Competition Prep - Contest preparation and peak performance</li>
                  <li>Specialized Training - Olympic lifting, strongman, CrossFit</li>
                </ul>
              </div>

              <div className="modal-section">
                <h3>Specialized Programs</h3>
                <ul className="modal-list">
                  <li>Weight Loss Focus - Combined cardio and resistance training</li>
                  <li>Muscle Building - Hypertrophy-focused programming</li>
                  <li>Endurance Training - Marathon, cycling, triathlon preparation</li>
                  <li>Functional Fitness - Real-world movement patterns</li>
                  <li>Senior Fitness (55+) - Age-appropriate exercise modifications</li>
                  <li>Pregnancy & Postpartum - Safe exercise during and after pregnancy</li>
                  <li>Injury Rehabilitation - Return-to-activity protocols</li>
                  <li>Youth Training (13-18) - Age-appropriate strength development</li>
                </ul>
              </div>

              <div className="modal-section">
                <h3>What's Included in Each Plan</h3>
                <ul className="modal-list">
                  <li>Detailed exercise descriptions with proper form cues</li>
                  <li>Progressive overload guidelines and periodization</li>
                  <li>Warm-up and cool-down routines</li>
                  <li>Nutrition recommendations and meal timing</li>
                  <li>Recovery protocols and sleep optimization</li>
                  <li>Progress tracking templates and benchmarks</li>
                  <li>Video demonstrations for complex movements</li>
                  <li>Modification options for injuries or limitations</li>
                </ul>
              </div>

              <div className="modal-section">
                <h3>Premium Features</h3>
                <ul className="modal-list">
                  <li>Mobile app integration with workout tracking</li>
                  <li>Monthly program updates and variations</li>
                  <li>Direct access to certified trainers for questions</li>
                  <li>Community forum for support and motivation</li>
                  <li>Nutritional calculators and meal planning tools</li>
                  <li>Progress photos and measurement tracking</li>
                </ul>
              </div>

              <div className="contact-info">
                <h3>Access Your Programs</h3>
                <div className="contact-item">
                  <Mail className="contact-icon" size={18} />
                  <span>plans@fitnessfaq.com</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" size={18} />
                  <span>+1 (555) 123-4568</span>
                </div>
                <div className="contact-item">
                  <Award className="contact-icon" size={18} />
                  <span>Free 7-day trial available for all programs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fag; 