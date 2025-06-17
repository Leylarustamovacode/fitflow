
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import AdminAdd from './pages/admin/AdminAdd'
import About from './pages/about/About'
import Detail from './pages/detail/Detail'
import NoPage from './pages/nopage/NoPage'
import Contact from './pages/contact/Contact'
import Exercise from './pages/exercise/Exercise'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
             <Route path="exercise" element={<Exercise />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
            <Route path="adminadd" element={<AdminAdd />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
