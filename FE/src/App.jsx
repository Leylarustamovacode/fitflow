
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout'
import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import AdminAdd from './pages/admin/AdminAdd'
import About from './pages/about/About'
import Detail from './pages/detail/Detail'
import NoPage from './pages/nopage/NoPage'
import Contact from './pages/contact/Contact'

import Practice from './pages/practices/Practice';
import HealthTracker from './pages/tracker/HealthTracker';
import Fag from './pages/faq/Fag';

function App() {


  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="healthtracker" element={<HealthTracker />} />
            <Route path="contact" element={<Contact />} />
            <Route path="practice" element={<Practice />} />
            <Route path="fag" element={<Fag />} />

            <Route path="admin" element={<Admin />} />
            <Route path="adminadd" element={<AdminAdd />} />
            <Route path="detail" element={<Detail />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
