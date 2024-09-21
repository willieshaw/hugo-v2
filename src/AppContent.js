import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStateContext } from './context/GlobalState';
import Home from './components/Home';
import IndexView from './components/IndexView';
import SlideshowView from './components/SlideshowView';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Filter from './components/Filter';

function AppContent() {
  const { isFilterOpen } = useContext(GlobalStateContext);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index" element={<IndexView />} /> {/* Handle /index without activeTags */}
        <Route path="/index/:activeTags" element={<IndexView />} /> {/* Handle /index with activeTags */}
        <Route
          path="/slideshow/:activeTags/:activeImageId"
          element={<SlideshowView />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {isFilterOpen && <Filter />}
    </>
  );
}

export default AppContent;
