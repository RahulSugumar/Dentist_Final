import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Clinic from './pages/Clinic';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ToothFilling from './pages/ToothFilling';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="clinic" element={<Clinic />} />
          <Route path="contact" element={<Contact />} />
          <Route path="booking" element={<Booking />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="services/tooth-filling" element={<ToothFilling />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
