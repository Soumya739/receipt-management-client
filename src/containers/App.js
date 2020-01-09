import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import MainContainer from './MainContainer';
import Footer from '../components/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;
