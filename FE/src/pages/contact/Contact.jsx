
import "./contact.scss";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setShowToast(false), 4000);
  };

  const LottieAnimation = () => (
    <div className="lottie-container">
      <div className="email-animation">
        <div className="envelope">
          <div className="letter"></div>
        </div>
        <div className="floating-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="contact-page">
      

      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            Ready to start your fitness journey? Contact us today and let's achieve your goals together!
          </p>
        </div>

        <div className="contact-grid">
          {/* FORM SAHƏSİ */}
          <div className="contact-form-section">
            <LottieAnimation />
            <h2 className="form-title">
              <Send size={24} />
              Send us a Message
            </h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your fitness goals..."
                  className="form-input form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* ƏLAQƏ MƏLUMATLARI */}
          <div className="contact-info-section">
            <h2 className="info-title">
              <MapPin size={24} />
              Contact Information
            </h2>
            <div className="contact-info">
              <div className="info-item">
  <div className="info-icon"><Phone size={20} /></div>
  <div className="info-content">
    <h3>Phone Number</h3>
    <p>
      <a href="tel:+15551234567">+1 (555) 123-4567</a>
    </p>
  </div>
</div>
<div className="info-item">
  <div className="info-icon"><Mail size={20} /></div>
  <div className="info-content">
    <h3>Email Address</h3>
    <p>
      <a href="mailto:info@fitnessgym.com">info@fitnessgym.com</a>
    </p>
  </div>
</div>
<div className="info-item">
  <div className="info-icon"><MapPin size={20} /></div>
  <div className="info-content">
    <h3>Address</h3>
    <p>
      <a
        href="https://www.google.com/maps?q=123+Fitness+Street,+Gym+City,+GC+12345"
        target="_blank"
        rel="noopener noreferrer"
      >
        123 Fitness Street, Gym City, GC 12345
      </a>
    </p>
  </div>
</div>

             
              <div className="info-item">
                <div className="info-icon"><Clock size={20} /></div>
                <div className="info-content">
                  <h3>Opening Hours</h3>
                  <p>Mon–Fri: 6AM–10PM<br />Sat–Sun: 8AM–8PM</p>
                </div>
              </div> 
            </div>
          </div>
        </div>

        {/* XƏRİTƏ SAHƏSİ */}
       <div className="map-section">
  <h2 className="info-title">
    <MapPin size={24} /> Find Us
  </h2>
  <div className="map-container">
    <iframe
      title="Google Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019589850244!2d-122.41941548468225!3d37.77492927975965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbae870b7%3A0xe4cb2b24e8f70c9a!2s123%20Fitness%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1719566544314!5m2!1sen!2sus"
      width="100%"
      height="350"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>


        {/* SOSİAL MƏTBUAT */}
        <div className="social-section">
          <h2 className="social-title">Follow Us</h2>
          <div className="social-links">
  <a
    href="https://www.instagram.com/yourpage"
    className="social-link instagram"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Instagram size={24} />
  </a>
  <a
    href="https://www.facebook.com/yourpage"
    className="social-link facebook"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Facebook size={24} />
  </a>
  <a
    href="https://wa.me/15551234567"
    className="social-link whatsapp"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MessageCircle size={24} />
  </a>
</div>

        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className={`toast ${showToast ? 'show' : ''}`}>
          <CheckCircle size={20} />
          Message sent successfully!
        </div>
      )}
    </div>
  );
};

export default Contact;
