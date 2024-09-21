// /src/context/GlobalState.js

import React, { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [activeTags, setActiveTags] = useState(() => {
    let savedTags;
    try {
      savedTags = localStorage.getItem('activeTags');
      return savedTags ? JSON.parse(savedTags) : ['featured'];
    } catch (error) {
      console.error('Error parsing activeTags from localStorage:', error);
      return ['featured'];
    }
  });

  const [activeImage, setActiveImage] = useState(() => {
    let savedImage;
    try {
      savedImage = localStorage.getItem('activeImage');
      return savedImage ? JSON.parse(savedImage) : null;
    } catch (error) {
      console.error('Error parsing activeImage from localStorage:', error);
      return null;
    }
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('activeTags', JSON.stringify(activeTags));
    } catch (error) {
      console.error('Error saving activeTags to localStorage:', error);
    }
  }, [activeTags]);

  useEffect(() => {
    try {
      localStorage.setItem('activeImage', JSON.stringify(activeImage));
    } catch (error) {
      console.error('Error saving activeImage to localStorage:', error);
    }
  }, [activeImage]);

  return (
    <GlobalStateContext.Provider
      value={{
        activeTags,
        setActiveTags,
        activeImage,
        setActiveImage,
        isFilterOpen,
        setIsFilterOpen,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
