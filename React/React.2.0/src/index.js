import React, { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"; //npm i -D react-router-dom
import Header from './components/Header';
import SideNav from './components/SideNav';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './css/reset.css';
import './css/header.css';
import './css/sidenav.css';
import './css/home.css';
import './css/gallery.css';
import './css/modal.css';
import './css/notfound.css';
import './css/footer.css';

function App() {
  const [isNavExpanded, setNavExpanded] = useState(false);
  const [LinkActive, setLinkActive] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPosterExpanded, setPosterExpanded] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setLinkActive(currentPath);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isNavExpanded]);

  const toggleNav = () => {
    setNavExpanded(!isNavExpanded);
  };

  const closeNav = () => {
    setNavExpanded(false);
  };

  const handleDocumentClick = event => {
    if (
      !document.getElementById('sideNav').contains(event.target) &&
      !document.getElementById('navToggleCtr').contains(event.target)
    ) {
      setNavExpanded(false);
    }
  };

  const postersArray = [
    {
      posterImg: 'https://i.imgur.com/1qjv6iN.jpg',
      posterAlt: 'Honkai Impact 3rd'
    },
    {
      posterImg: 'https://i.imgur.com/KCLaIga.jpg',
      posterAlt: 'Genshin Impact'
    },
    {
      posterImg: 'https://i.imgur.com/Dxo7Z2u.jpg',
      posterAlt: 'Honkai: Star Rail'
    },
    {
      posterImg: 'https://i.imgur.com/LBnZyvU.png',
      posterAlt: 'Bronya'
    },
    {
      posterImg: 'https://i.imgur.com/YtoQ6R1.png',
      posterAlt: 'Seele Vollerei'
    },
    {
      posterImg: 'https://i.imgur.com/u8O3n9A.png',
      posterAlt: 'Rozaliya'
    },
    {
      posterImg: 'https://i.imgur.com/g2YWrPZ.png',
      posterAlt: 'Bronya'
    },
  ];

  const posterExpand = index => {
    setCurrentSlide(index);
    setPosterExpanded(true);
  };

  const closeModal = () => {
    setPosterExpanded(false);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? postersArray.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === postersArray.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <BrowserRouter>
      <Header
        LinkActive={LinkActive}
        isNavExpanded={isNavExpanded}
        toggleNav={toggleNav}
      />
      <SideNav
        LinkActive={LinkActive}
        isNavExpanded={isNavExpanded}
        closeNav={closeNav}
      />
      <Routes>
        <Route path='/' element={<Home
          isNavExpanded={isNavExpanded}
        />} />
        <Route path='/Gallery' element={<>
          <Gallery
            isNavExpanded={isNavExpanded}
            postersArray={postersArray}
            posterExpand={posterExpand}
          />
          <Modal
            isPosterExpanded={isPosterExpanded}
            setPosterExpanded={setPosterExpanded}
            postersArray={postersArray}
            currentSlide={currentSlide}
            closeModal={closeModal}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
          />
        </>} />
        <Route path='*' element={<NotFound
          isNavExpanded={isNavExpanded}
        />} />
      </Routes>
      <Footer
        isNavExpanded={isNavExpanded}
      />
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);