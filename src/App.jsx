import './App.css'
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Assignment3 from './components/Assignment3/Assignment3';
import Profile from './components/Profile/Profile';
import Blogs from './components/Blogs/Blogs';
import { Route, Routes } from "react-router-dom";

function App() {


  return (
    <>
      <div className="page">
        <Header />
        <div className="hero">
          <div className="hero-container">
            <Routes>
              <Route path='/' element={<Content />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/contact' element={<Contact />}></Route>
              <Route path='/assignment3' element={<Assignment3 />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/blogs' element={<Blogs />}></Route>
            </Routes>
          </div >
        </div >
        <Footer />
      </div>
    </>
  )
}

export default App
