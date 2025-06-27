
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Dumbbell, Home, Star, Users, Clock, Trophy, Shield, Heart, X, CheckCircle, Calendar, User, Mail, Phone, Target, Activity } from 'lucide-react';

const Fag = () => {
  const [activeGym, setActiveGym] = useState(null);
  const [activeHome, setActiveHome] = useState(null);
  const [activeTab, setActiveTab] = useState('gym');
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const gymFAQs = [
    {
      question: "What are the best exercises for beginners?",
      answer: "For beginners, compound movements are most effective: Squats, Deadlifts, Bench Press, Pull-ups, and Overhead Press. These exercises work multiple muscle groups simultaneously and build a strong foundation. Focus on proper technique for the first 4-6 weeks, then gradually increase weight."
    },
    {
      question: "How many times per week should I work out at the gym?",
      answer: "Beginners should aim for 3-4 times per week, intermediate levels 4-5 times, and advanced trainees can handle 5-6 times. Allow 48-72 hours of rest between training the same muscle groups. Quality is more important than quantity."
    },
    {
      question: "How should I balance cardio and weight training?",
      answer: "It depends on your goals: For muscle building, do cardio 2-3 times per week (20-30 minutes). For weight loss, aim for 4-5 times per week (30-45 minutes). Cardio after weight training is generally more effective for fat loss."
    },
    {
      question: "Do I need protein powder and supplements?",
      answer: "Protein powder is supplementary, not essential. If you can meet your daily protein needs (1.6-2.2g per kg of body weight) through whole foods, supplements aren't necessary. Creatine and Vitamin D are beneficial additions. Always consult with a healthcare provider."
    },
    {
      question: "When will I see results from my workouts?",
      answer: "Strength gains appear in 2-4 weeks, visual changes start around 6-8 weeks. Significant muscle mass changes take 3-6 months. Patience and consistency are key. Track progress with photos and measurements, not just the scale."
    },
    {
      question: "What gym equipment should I focus on?",
      answer: "Essential equipment includes: Barbells and dumbbells, squat rack, bench, pull-up bar. Machines are safer for beginners, but free weights are more effective overall. Kettlebells and resistance bands are also very versatile."
    },
    {
      question: "What should I eat before and after workouts?",
      answer: "Pre-workout (1-2 hours before): Carbs + small amount of protein (banana + yogurt). Post-workout (within 30 minutes): Protein + carbs (protein shake + fruit). Don't forget hydration - aim for 2-3 liters daily."
    },
    {
      question: "How do I structure my workout plan properly?",
      answer: "Push/Pull/Legs or Upper/Lower splits work well for beginners. Include 4-6 exercises per session, 3-4 sets, 8-12 reps. Apply progressive overload - gradually increase weight, reps, or sets each week."
    }
  ];

  const homeFAQs = [
    {
      question: "Is effective training possible at home without equipment?",
      answer: "Absolutely! Bodyweight exercises are highly effective: Push-ups, Pull-ups, Squats, Lunges, Planks, Burpees. Adding resistance bands and dumbbells enhances results further. Creativity and consistency are the keys to success."
    },
    {
      question: "What's the minimum I need for home workouts?",
      answer: "Minimum: Yoga mat, water bottle, comfortable clothes, and 2x2 meter space. Ideal additions: Resistance bands, dumbbells (5-20kg), pull-up bar, kettlebell. A phone/laptop for workout videos is also helpful."
    },
    {
      question: "How can I do cardio workouts at home?",
      answer: "HIIT workouts are most effective: Jumping jacks, Mountain climbers, Burpees, High knees, Jump squats. 20-30 minutes of intense training can be more effective than gym cardio. Use YouTube and fitness apps for guidance."
    },
    {
      question: "How do I stay motivated working out at home?",
      answer: "Set a specific time and stick to it. Prepare your workout space. Track your progress. Join online communities. Set goals and reward achievements. Work out with friends via video calls for accountability."
    },
    {
      question: "What are the best home exercises for weight loss?",
      answer: "HIIT and circuit training are most effective. Combine Burpees, squat jumps, mountain climbers, planks, Russian twists. Use 30 seconds work, 15 seconds rest format. Aim for 4-5 times per week, 20-30 minutes."
    },
    {
      question: "Is muscle building possible at home?",
      answer: "Yes, with progressive overload. Use resistance bands, dumbbells, and bodyweight variations. Advanced movements like single-leg squats, pike push-ups, and archer push-ups increase difficulty. Don't forget adequate protein intake."
    },
    {
      question: "How can I exercise without disturbing neighbors?",
      answer: "Choose low-impact exercises: Wall sits, planks, resistance band workouts, yoga, pilates. Avoid jumping movements during early/late hours. Use a fitness mat to reduce noise. Save high-impact workouts for appropriate times."
    },
    {
      question: "What are the best apps and resources for home workouts?",
      answer: "Free options: YouTube (Fitness Blender, HIIT Workouts), Nike Training Club, Adidas Training. Paid: Peloton Digital, Apple Fitness+, Daily Burn. Look for certified trainers and progressive programs that match your fitness level."
    }
  ];

  const workoutPlans = [
    {
      id: 1,
      name: "Beginner Gym Starter",
      duration: "4 weeks",
      frequency: "3x per week",
      price: "Free",
      features: ["Full body workouts", "Technique videos", "Progress tracking", "Beginner-friendly"],
      description: "Perfect for those new to the gym. Focus on fundamental movements and building a strong foundation."
    },
    {
      id: 2,
      name: "Home Fitness Revolution",
      duration: "6 weeks",
      frequency: "4x per week",
      price: "Free",
      features: ["No equipment needed", "HIIT workouts", "Flexibility training", "Meal planning guide"],
      description: "Transform your body from home with bodyweight exercises and high-intensity workouts."
    },
    {
      id: 3,
      name: "Strength Building Program",
      duration: "8 weeks",
      frequency: "4x per week",
      price: "$29/month",
      features: ["Progressive overload", "Custom weight tracking", "Video demonstrations", "Expert support"],
      description: "Advanced program for serious strength gains and muscle development."
    },
    {
      id: 4,
      name: "Weight Loss Accelerator",
      duration: "12 weeks",
      frequency: "5x per week",
      price: "$39/month",
      features: ["Cardio + strength combo", "Nutrition coaching", "Weekly check-ins", "Supplement guide"],
      description: "Comprehensive program combining exercise and nutrition for optimal weight loss results."
    }
  ];

  const toggleGym = (index) => {
    setActiveGym(activeGym === index ? null : index);
  };

  const toggleHome = (index) => {
    setActiveHome(activeHome === index ? null : index);
  };

  const features = [
    { icon: <Dumbbell className="w-8 h-8" />, title: "Professional Workouts", desc: "Expert-designed programs for all levels" },
    { icon: <Users className="w-8 h-8" />, title: "Community Support", desc: "Join thousands in their fitness journey" },
    { icon: <Clock className="w-8 h-8" />, title: "24/7 Access", desc: "Get answers and support anytime" },
    { icon: <Shield className="w-8 h-8" />, title: "Safety First", desc: "Proper technique and safety guidelines" }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1000+", label: "Workout Programs" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const ConsultationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={() => setShowConsultModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Free Consultation</h3>
          <p className="text-gray-600">Get personalized advice from our certified trainers</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input 
                type="tel" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Goal</label>
            <div className="relative">
              <Target className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Weight Loss</option>
                <option>Muscle Building</option>
                <option>General Fitness</option>
                <option>Strength Training</option>
                <option>Endurance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Fitness Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  type="button"
                  className="p-2 text-sm border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            Schedule Free Consultation
          </button>
        </form>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-700 font-medium">What you'll get:</span>
          </div>
          <ul className="mt-2 text-sm text-green-600 space-y-1">
            <li>• 30-minute one-on-one consultation</li>
            <li>• Personalized fitness assessment</li>
            <li>• Custom workout recommendations</li>
            <li>• Nutrition guidance</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const PlansModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative my-8">
        <button 
          onClick={() => setShowPlansModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Workout Plan</h3>
          <p className="text-gray-600">Transform your body with our scientifically-designed programs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {workoutPlans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h4>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{plan.price}</div>
                  {plan.price !== "Free" && <div className="text-sm text-gray-500">per month</div>}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{plan.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{plan.frequency}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedPlan(plan)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                {plan.price === "Free" ? "Start Free Plan" : "Choose This Plan"}
              </button>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="text-lg font-bold text-blue-800 mb-2">Ready to start {selectedPlan.name}?</h4>
            <p className="text-blue-700 mb-4">Fill out this quick form to get started with your personalized fitness journey.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Full Name"
                className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select Fitness Level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <select className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Primary Goal</option>
                <option>Weight Loss</option>
                <option>Muscle Building</option>
                <option>Strength Training</option>
                <option>General Fitness</option>
              </select>
            </div>
            
            <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start My Fitness Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-200 rounded-full px-6 py-2 mb-8">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-blue-700 font-medium">#1 Fitness Platform Worldwide</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Transform Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fitness Life</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get answers to all your gym and home workout questions. Start your fitness journey with professional guidance and practical instructions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowConsultModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <Heart className="w-5 h-5 inline mr-2" />
              Get Started Now
            </button>
            <button 
              onClick={() => setShowPlansModal(true)}
              className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-white hover:bg-gray-50"
            >
              View Workout Plans
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Professional approach and personalized attention to help you reach your fitness goals</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main FAQ Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">Answers to help you on your fitness journey</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-2 inline-flex shadow-sm">
            <button
              onClick={() => setActiveTab('gym')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'gym'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Dumbbell className="w-5 h-5" />
              <span>Gym Workouts</span>
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home Workouts</span>
            </button>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-4">
          {activeTab === 'gym' && gymFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleGym(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                </div>
                {activeGym === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              {activeGym === index && (
                <div className="px-6 pb-6">
                  <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {activeTab === 'home' && homeFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleHome(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                </div>
                {activeHome === index ? (
                  <ChevronUp className="w-6 h-6 text-purple-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>
              {activeHome === index && (
                <div className="px-6 pb-6">
                  <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200 rounded-3xl p-12 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Get professional advice, personalized plans, and ongoing support to reach your goals. Take the first step today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowConsultModal(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Get Free Consultation
            </button>
            <button 
              onClick={() => setShowPlansModal(true)}
              className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 px-8 py-4 rounded-xl font-semibold transition-all duration-300 bg-white hover:bg-gray-50"
            >
              View Workout Plans
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Fitness FAQ. All rights reserved. 🏋️‍♂️</p>
            <p className="mt-2">Healthy life, strong future</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showConsultModal && <ConsultationModal />}
      {showPlansModal && <PlansModal />}
    </div>
  );
};

export default Fag;