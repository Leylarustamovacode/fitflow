import React, { useState } from 'react';
import "./auth.scss"
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Error states
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (loginErrors[name]) {
      setLoginErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle register form changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setProfileImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
        // Clear image error
        if (registerErrors.profileImage) {
          setRegisterErrors(prev => ({
            ...prev,
            profileImage: ''
          }));
        }
      } else {
        setRegisterErrors(prev => ({
          ...prev,
          profileImage: 'Please select a valid image file'
        }));
      }
    }
  };

  // Validate login form
  const validateLogin = () => {
    const errors = {};
    
    if (!loginData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!loginData.password.trim()) {
      errors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };

  // Validate register form
  const validateRegister = () => {
    const errors = {};
    
    if (!registerData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!registerData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!registerData.password.trim()) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!registerData.confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!profileImage) {
      errors.profileImage = 'Profile image is required';
    }
    
    return errors;
  };

  // Handle login submit
  const handleLoginSubmit = async () => {
    const errors = validateLogin();
    
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        // API çağrısı simulasiyası
        console.log('Sending login request...');
        
        // Burada real API çağrısı olacaq
        // const response = await fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(loginData)
        // });
        
        // Simulasiya üçün 1 saniyə gözləyirik
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Uğurlu login
        const userData = {
          id: 1,
          email: loginData.email,
          name: 'User Name',
          token: 'fake-jwt-token-' + Date.now()
        };
        
        // LocalStorage-a user məlumatlarını yaddaşda saxlayırıq
        // localStorage.setItem('user', JSON.stringify(userData));
        // localStorage.setItem('token', userData.token);
        
        console.log('Login successful:', userData);
        alert(`Welcome back! Logged in as ${userData.email}`);
        
        // Bu nöqtədə adətən:
        // 1. Redux store-a user məlumatını qoy
        // 2. React Router ilə dashboard-a yönləndir
        // 3. Və ya parent component-ə callback göndər
        
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setLoginErrors(errors);
    }
  };

  // Handle register submit
  const handleRegisterSubmit = async () => {
    const errors = validateRegister();
    
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        console.log('Sending registration request...');
        
        // FormData yaradırıq çünki şəkil yükləyirik
        const formData = new FormData();
        formData.append('name', registerData.name);
        formData.append('email', registerData.email);
        formData.append('password', registerData.password);
        formData.append('profileImage', profileImage);
        
        // API çağrısı simulasiyası
        // const response = await fetch('/api/register', {
        //   method: 'POST',
        //   body: formData
        // });
        
        // Simulasiya üçün 2 saniyə gözləyirik
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Uğurlu qeydiyyat
        const newUser = {
          id: Date.now(),
          name: registerData.name,
          email: registerData.email,
          profileImage: imagePreview, // Base64 format
          createdAt: new Date().toISOString()
        };
        
        console.log('Registration successful:', newUser);
        
        // Qeydiyyat uğurlu olduqdan sonra:
        alert(`Account created successfully! Welcome ${newUser.name}!`);
        
        // Avtomatik login formu göstər
        setIsLogin(true);
        
        // Formu təmizlə
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setProfileImage(null);
        setImagePreview(null);
        setRegisterErrors({});
        
        // Bu nöqtədə adətən:
        // 1. Email təsdiqi göndər
        // 2. Welcome email göndər  
        // 3. User-i login səhifəsinə yönləndir
        // 4. Və ya avtomatik login et
        
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setRegisterErrors(errors);
    }
  };

  // Switch between forms
  const switchForm = () => {
    setIsLogin(!isLogin);
    setLoginErrors({});
    setRegisterErrors({});
    setImagePreview(null);
    setProfileImage(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
            <p>{isLogin ? 'Welcome back! Please sign in to your account.' : 'Join us today! Create your account to get started.'}</p>
          </div>

          {isLogin ? (
            // Login Form
            <div className="auth-form">
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className={`form-control ${loginErrors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                {loginErrors.email && <div className="invalid-feedback">{loginErrors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className={`form-control ${loginErrors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                />
                {loginErrors.password && <div className="invalid-feedback">{loginErrors.password}</div>}
              </div>

              <button onClick={handleLoginSubmit} disabled={isLoading} className="btn btn-primary">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          ) : (
            // Register Form
            <div className="auth-form">
              <div className="form-group">
                <label htmlFor="register-name">Full Name</label>
                <input
                  type="text"
                  id="register-name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  className={`form-control ${registerErrors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter your full name"
                />
                {registerErrors.name && <div className="invalid-feedback">{registerErrors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="register-email">Email Address</label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  className={`form-control ${registerErrors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                {registerErrors.email && <div className="invalid-feedback">{registerErrors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className={`form-control ${registerErrors.password ? 'is-invalid' : ''}`}
                  placeholder="Create a password"
                />
                {registerErrors.password && <div className="invalid-feedback">{registerErrors.password}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="register-confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="register-confirm-password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  className={`form-control ${registerErrors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm your password"
                />
                {registerErrors.confirmPassword && <div className="invalid-feedback">{registerErrors.confirmPassword}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="profile-image">Profile Image</label>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={`form-control ${registerErrors.profileImage ? 'is-invalid' : ''}`}
                />
                {registerErrors.profileImage && <div className="invalid-feedback">{registerErrors.profileImage}</div>}
                
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Profile Preview" />
                    <span>Profile Image Preview</span>
                  </div>
                )}
              </div>

              <button onClick={handleRegisterSubmit} disabled={isLoading} className="btn btn-primary">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          )}

          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={switchForm} className="switch-btn">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Auth;