// DashboardPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Settings, Home } from 'lucide-react';
import './DashBoard.scss';

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <Home className="logo-icon" />
              <h1 className="title">Dashboard</h1>
            </div>
            
            <div className="header-right">
              <div className="user-info">
                <User className="user-icon" />
                <span className="user-name">{user?.name}</span>
              </div>
              
              <button onClick={handleLogout} className="logout-btn">
                <LogOut className="logout-icon" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h2 className="welcome-title">
              Welcome back, {user?.name}!
            </h2>
            <p className="welcome-text">
              You have successfully logged in. Here's your dashboard overview.
            </p>
            <div className="overview-grid">
              <div className="overview-card profile-card">
                <h3 className="card-title">Profile</h3>
                <p className="card-text">Manage your account settings</p>
              </div>
              <div className="overview-card activity-card">
                <h3 className="card-title">Activity</h3>
                <p className="card-text">View your recent activity</p>
              </div>
              <div className="overview-card settings-card">
                <h3 className="card-title">Settings</h3>
                <p className="card-text">Configure your preferences</p>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="user-section">
            <h3 className="section-title">
              <User className="section-icon" />
              User Information
            </h3>
            <div className="user-grid">
              <div className="user-field">
                <label className="field-label">Name</label>
                <p className="field-value">{user?.name}</p>
              </div>
              <div className="user-field">
                <label className="field-label">Email</label>
                <p className="field-value">{user?.email}</p>
              </div>
              <div className="user-field">
                <label className="field-label">Member Since</label>
                <p className="field-value">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                </p>
              </div>
              <div className="user-field">
                <label className="field-label">Status</label>
                <span className="status-badge">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-section">
            <h3 className="section-title">
              <Settings className="section-icon" />
              Quick Actions
            </h3>
            <div className="actions-grid">
              <button className="action-btn profile-btn">
                <User className="action-icon" />
                <span className="action-text">Edit Profile</span>
              </button>
              <button className="action-btn settings-btn">
                <Settings className="action-icon" />
                <span className="action-text">Account Settings</span>
              </button>
              <button onClick={handleLogout} className="action-btn logout-action-btn">
                <LogOut className="action-icon" />
                <span className="action-text">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;