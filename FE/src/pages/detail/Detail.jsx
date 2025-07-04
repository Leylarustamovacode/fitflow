import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.scss";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
function Detail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    
    // Original API call
    fetch(`http://localhost:3000/teacher/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTeacher(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-reverse"></div>
          </div>
          <p className="loading-text">Loading teacher details...</p>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Teacher Not Found</h3>
          <p className="error-description">The teacher you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      <div className="content-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="title-container">
            <h1 className="teacher-name">{teacher.name}</h1>
            <div className="title-underline"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="card-container">
            {/* Image Section */}
            <div className="image-section">
              <div className="image-wrapper">
                <div className="image-background"></div>
                <img 
                  src={teacher.image} 
                  alt={teacher.name}
                  className={`teacher-image ${imageLoaded ? 'loaded' : ''}`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring delay-1"></div>
                    <div className="pulse-ring delay-2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="info-section">
              <div className="sport-badge">
                <span className="sport-icon">🏆</span>
                <span className="sport-text">{teacher.sport}</span>
              </div>
              
              <div className="description-container">
                <p className="teacher-description">{teacher.text}</p>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
               <a href="tel:+994501234567" className="text-decoration-none">
  <div className="btn btn-primary d-flex align-items-center gap-2 justify-content-center">
    <span className="btn-icon">📧</span>
    Contact
  </div>
</a>

                 <button
  className="btn btn-secondary d-flex align-items-center gap-2"
  onClick={() => navigate("/")}
>
  <Home size={18} /> {/* Ev iconu */}
  Go Home
</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;