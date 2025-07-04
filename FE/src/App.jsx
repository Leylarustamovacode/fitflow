import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import AdminAdd from './pages/admin/AdminAdd';
import About from './pages/about/About';
import Detail from './pages/detail/Detail';
import NoPage from './pages/nopage/NoPage';
import Contact from './pages/contact/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import Practice from './pages/practices/Practice';
import HealthTracker from './pages/tracker/HealthTracker';
import Fag from './pages/faq/Fag';
import Reservation from './pages/reservation/Reservation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

import { AuthProvider } from './context/AuthContext';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={isDarkMode ? 'dark-mode min-h-screen' : 'light-mode min-h-screen'}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="healthtracker" element={<HealthTracker />} />
              <Route path="contact" element={<Contact />} />
              <Route path="practice" element={<Practice />} />
              <Route path="faq" element={<Fag />} />
              <Route path="reservation" element={<Reservation />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="admin" element={<Admin />} />
              <Route path="adminadd" element={<AdminAdd />} />
              <Route path="detail/:id" element={<Detail />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
