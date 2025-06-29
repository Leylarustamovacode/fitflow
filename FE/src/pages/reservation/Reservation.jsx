
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CreditCard, Info, CheckCircle, XCircle, Star, Activity } from 'lucide-react';
import "./reservation.scss"
const Reservation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    date: '',
    time: '',
    workoutType: '',
    paymentMethod: ''
  });

  const [reservations, setReservations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('reserve');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Load reservations from memory on component mount
  useEffect(() => {
    const savedReservations = JSON.parse(localStorage.getItem('gymReservations') || '[]');
    setReservations(savedReservations);
  }, []);

  const workoutTypes = [
    { name: 'Cardio', icon: '💓', price: '12 AZN' },
    { name: 'Gym', icon: '💪', price: '15 AZN' },
    { name: 'TRX', icon: '🏋️', price: '18 AZN' },
    { name: 'Yoga', icon: '🧘', price: '14 AZN' },
    { name: 'Pilates', icon: '🤸', price: '16 AZN' },
    { name: 'Crossfit', icon: '⚡', price: '20 AZN' },
    { name: 'Zumba', icon: '💃', price: '13 AZN' },
    { name: 'Personal Training', icon: '👨‍💼', price: '35 AZN' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const paymentMethods = [
    { name: 'Nəğd ödəniş', icon: '💵' },
    { name: 'Kart ilə ödəniş', icon: '💳' },
    { name: 'Bank köçürməsi', icon: '🏦' },
    { name: 'Abunə kartı', icon: '🎫' }
  ];

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.contact || !formData.date || !formData.time || !formData.workoutType || !formData.paymentMethod) {
      showNotification('Bütün sahələri doldurun!', 'error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newReservation = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    localStorage.setItem('gymReservations', JSON.stringify(updatedReservations));

    showNotification('Rezervasiya uğurla yaradıldı!', 'success');
    setFormData({
      fullName: '',
      contact: '',
      date: '',
      time: '',
      workoutType: '',
      paymentMethod: ''
    });
    setIsSubmitting(false);
    setActiveTab('reservations');
  };

  const cancelReservation = async (id) => {
    const updatedReservations = reservations.filter(res => res.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('gymReservations', JSON.stringify(updatedReservations));
    showNotification('Rezervasiya ləğv edildi!', 'success');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
    overflow: 'hidden'
  };

  const mainCardStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '24px',
    boxShadow: '0 32px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.1)',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
    animation: 'slideUp 0.8s ease-out'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    padding: '40px 30px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '800',
    margin: '0 0 10px 0',
    background: 'linear-gradient(45deg, #fff, #f0f8ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 1
  };

  const tabNavigationStyle = {
    display: 'flex',
    backgroundColor: '#f8f9ff',
    padding: '0',
    margin: '0',
    borderBottom: '2px solid #e1e5e9'
  };

  const getTabStyle = (isActive) => ({
    flex: 1,
    padding: '20px',
    backgroundColor: isActive ? 'white' : 'transparent',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    color: isActive ? '#667eea' : '#666',
    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isActive ? '0 4px 12px rgba(102, 126, 234, 0.15)' : 'none'
  });

  const contentStyle = {
    padding: '40px',
    animation: 'fadeIn 0.6s ease-out'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginBottom: '30px'
  };

  const inputGroupStyle = {
    position: 'relative',
    animation: 'slideInLeft 0.6s ease-out'
  };

  const labelStyle = {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'color 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
    appearance: 'none'
  };

  const workoutGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '10px'
  };

  const getWorkoutCardStyle = (isSelected, isHovered) => ({
    padding: '16px',
    border: isSelected ? '2px solid #667eea' : '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: isSelected ? '#f0f4ff' : 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    transform: (isSelected || isHovered) ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isSelected ? '0 8px 25px rgba(102, 126, 234, 0.15)' : (isHovered ? '0 8px 25px rgba(0,0,0,0.1)' : 'none')
  });

  const paymentGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '10px'
  };

  const getPaymentCardStyle = (isSelected) => ({
    padding: '16px',
    border: isSelected ? '2px solid #667eea' : '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: isSelected ? '#f0f4ff' : 'white',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  });

  const getButtonStyle = (isLoading, isHovered) => ({
    background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '18px 40px',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '30px',
    position: 'relative',
    overflow: 'hidden',
    minWidth: '200px',
    transform: (!isLoading && isHovered) ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: (!isLoading && isHovered) ? '0 12px 30px rgba(102, 126, 234, 0.4)' : 'none'
  });

  const reservationCardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '16px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'slideInRight 0.6s ease-out'
  };

  const cancelButtonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  };

  const getNotificationStyle = (type) => ({
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '12px',
    color: 'white',
    fontWeight: '600',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    animation: 'slideInRight 0.5s ease-out',
    minWidth: '300px',
    backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
    boxShadow: type === 'success' ? '0 8px 25px rgba(16, 185, 129, 0.3)' : '0 8px 25px rgba(239, 68, 68, 0.3)'
  });

  const infoSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '30px'
  };

  const infoCardStyle = {
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    padding: '25px',
    border: '2px solid #e2e8f0',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.8s ease-out'
  };

  const loadingSpinnerStyle = {
    width: '20px',
    height: '20px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '10px'
  };

  // CSS keyframes
  const keyframes = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;
 return (
    <div style={containerStyle}>
      <style>{keyframes}</style>
      
      {notification && (
        <div style={getNotificationStyle(notification.type)}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
          {notification.message}
        </div>
      )}

      <div style={mainCardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>🏋️ FitZone Pro</h1>
          <p style={{ fontSize: '1.2rem', opacity: '0.95', margin: '0' }}>
            Premium Gym Rezervasiya Sistemi
          </p>
        </div>

        <div style={tabNavigationStyle}>
          <button 
            style={getTabStyle(activeTab === 'reserve')}
            onClick={() => setActiveTab('reserve')}
          >
            <Activity size={20} style={{ marginRight: '8px', display: 'inline' }} />
            Rezervasiya Et
          </button>
          <button 
            style={getTabStyle(activeTab === 'reservations')}
            onClick={() => setActiveTab('reservations')}
          >
            <Calendar size={20} style={{ marginRight: '8px', display: 'inline' }} />
            Rezervasiyalarım ({reservations.length})
          </button>
          <button 
            style={getTabStyle(activeTab === 'info')}
            onClick={() => setActiveTab('info')}
          >
            <Info size={20} style={{ marginRight: '8px', display: 'inline' }} />
            Məlumat
          </button>
        </div>

        <div style={contentStyle}>
          {activeTab === 'reserve' && (
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', marginBottom: '30px' }}>
                🎯 Yeni Rezervasiya
              </h2>
              
              <div style={formGridStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>
                    <User size={18} />
                    Ad və Soyad *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Adınızı və soyadınızı daxil edin"
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>
                    <Phone size={18} />
                    Əlaqə məlumatı *
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="+994 XX XXX XX XX və ya email@example.com"
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>
                    <Calendar size={18} />
                    Tarix seçimi *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={inputStyle}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>
                    <Clock size={18} />
                    Saat seçimi *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    style={selectStyle}
                  >
                    <option value="">⏰ Saat seçin</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <Star size={18} />
                  Məşq növü * 
                </label>
                <div style={workoutGridStyle}>
                  {workoutTypes.map(type => (
                    <div
                      key={type.name}
                      style={getWorkoutCardStyle(
                        formData.workoutType === type.name,
                        hoveredCard === type.name
                      )}
                      onClick={() => handleInputChange({ target: { name: 'workoutType', value: type.name } })}
                      onMouseEnter={() => setHoveredCard(type.name)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{type.icon}</div>
                      <div style={{ fontWeight: '600', color: '#374151' }}>{type.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: '600' }}>{type.price}/saat</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <CreditCard size={18} />
                  Ödəniş üsulu *
                </label>
                <div style={paymentGridStyle}>
                  {paymentMethods.map(method => (
                    <div
                      key={method.name}
                      style={getPaymentCardStyle(formData.paymentMethod === method.name)}
                      onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: method.name } })}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>
                      <span style={{ fontWeight: '600' }}>{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={getButtonStyle(isSubmitting, false)}
              >
                {isSubmitting ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={loadingSpinnerStyle}></div>
                    İşlənir...
                  </div>
                ) : (
                  '🚀 Rezervasiya Et'
                )}
              </button>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', marginBottom: '30px' }}>
                📅 Rezervasiyalarım ({reservations.length})
              </h2>
              
              {reservations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
                  <Calendar size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
                  <h3>Hələ heç bir rezervasiyanız yoxdur</h3>
                  <p>İlk rezervasiyanızı yaratmaq üçün "Rezervasiya Et" bölməsinə keçin</p>
                </div>
              ) : (
                <div>
                  {reservations.map((reservation, index) => (
                    <div 
                      key={reservation.id} 
                      style={{
                        ...reservationCardStyle,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h4 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', fontWeight: '700', color: '#1f2937' }}>
                            👤 {reservation.fullName}
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                              <strong>📅 Tarix:</strong> {reservation.date}
                            </div>
                            <div>
                              <strong>⏰ Saat:</strong> {reservation.time}
                            </div>
                            <div>
                              <strong>💪 Məşq:</strong> {reservation.workoutType}
                            </div>
                            <div>
                              <strong>💳 Ödəniş:</strong> {reservation.paymentMethod}
                            </div>
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                            <strong>📞 Əlaqə:</strong> {reservation.contact}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => cancelReservation(reservation.id)}
                        style={cancelButtonStyle}
                      >
                        ❌ Ləğv et
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'info' && (
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', marginBottom: '30px' }}>
                ℹ️ İnformativ Məlumat
              </h2>
              
              <div style={infoSectionStyle}>
                <div style={infoCardStyle}>
                  <h3 style={{ color: '#667eea', marginBottom: '20px', fontSize: '1.4rem' }}>
                    📋 Rezervasiya Qaydaları
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      <strong>⏱️ Rezervasiya müddəti:</strong> Zala minimum 2 saat əvvəl rezervasiya etmək olar
                    </li>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      <strong>❌ Ləğv etmə qaydası:</strong> Rezervasiyanı məşqdən 1 saat əvvəl ləğv edə bilərsiniz
                    </li>
                    <li style={{ padding: '10px 0' }}>
                      <strong>🔄 Dəyişiklik:</strong> Rezervasiyanı 3 saat əvvəl dəyişdirə bilərsiniz
                    </li>
                  </ul>
                </div>

                <div style={infoCardStyle}>
                  <h3 style={{ color: '#667eea', marginBottom: '20px', fontSize: '1.4rem' }}>
                    📍 Əlaqə Məlumatları
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      <strong>🏢 Ünvan:</strong> Bakı şəhəri, Nəsimi rayonu, Azadlıq prospekti 123
                    </li>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      <strong>🕒 İş saatları:</strong> B.e-Cümə: 09:00-22:00, Həftəsonu: 10:00-20:00
                    </li>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      <strong>📞 Telefon:</strong> (+994) 12 345 67 89
                    </li>
                    <li style={{ padding: '10px 0' }}>
                      <strong>📧 Email:</strong> info@fitzonepro.az
                    </li>
                  </ul>
                </div>

                <div style={infoCardStyle}>
                  <h3 style={{ color: '#667eea', marginBottom: '20px', fontSize: '1.4rem' }}>
                    💰 Qiymət Cədvəli
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {workoutTypes.map((type, index) => (
                      <li 
                        key={type.name}
                        style={{ 
                          padding: '10px 0', 
                          borderBottom: index !== workoutTypes.length - 1 ? '1px solid #e2e8f0' : 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>
                          <span style={{ marginRight: '8px' }}>{type.icon}</span>
                          <strong>{type.name}:</strong>
                        </span>
                        <span style={{ color: '#667eea', fontWeight: '600' }}>{type.price}/saat</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={infoCardStyle}>
                  <h3 style={{ color: '#667eea', marginBottom: '20px', fontSize: '1.4rem' }}>
                    🎯 Xidmətlər
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      🚿 <strong>Duş kabinələri:</strong> Ödənişsiz
                    </li>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      🅿️ <strong>Parkinq:</strong> Ödənişsiz
                    </li>
                                        <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      👨‍🏫 <strong>Şəxsi məşqçi xidməti:</strong> Əlavə ödənişlə
                    </li>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      ☕ <strong>Fitness kafesi:</strong> Sağlam qəlyanaltılar
                    </li>
                    <li style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                      🔐 <strong>Şəxsi şkaflar:</strong> İcarə əsasında
                    </li>
                    <li style={{ padding: '10px 0' }}>
                      📶 <strong>Pulsuz Wi-Fi</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
