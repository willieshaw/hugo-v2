import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalState';
import tagMappings from '../data/tagMappings';
import './Filter.css';

function Filter() {
  const {
    setIsFilterOpen,
    setActiveTags,
    activeImage,
    activeTags,
  } = useContext(GlobalStateContext);
  const [selectedTags, setSelectedTags] = useState(
    activeTags.includes('featured') && activeTags.length === 1 ? [] : activeTags
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Remove 'featured' if any other tag is selected
      if (tag !== 'featured') {
        setSelectedTags([...selectedTags.filter((t) => t !== 'featured'), tag]);
      } else {
        setSelectedTags([tag]);
      }
    }
  };

  const handleConfirm = () => {
    setActiveTags(selectedTags.length > 0 ? selectedTags : ['featured']);
    setIsFilterOpen(false);

    const tagsString = selectedTags.map(encodeURIComponent).join('&');

    const currentPath = location.pathname;
    let basePath;

    if (currentPath.startsWith('/index')) {
      basePath = '/index';
    } else if (currentPath.startsWith('/slideshow')) {
      basePath = '/slideshow';
    } else {
      basePath = '/';
    }

    if (basePath === '/index') {
      if (selectedTags.length > 0) {
        navigate(`/index/${tagsString}`);
      } else {
        navigate('/index/');
      }
    } else if (basePath === '/slideshow') {
      const imageId = activeImage ? activeImage.id : 1;
      if (selectedTags.length > 0) {
        navigate(`/slideshow/${tagsString}/${imageId}`);
      } else {
        navigate('/');
      }
    } else {
      if (selectedTags.length > 0) {
        navigate(`/index/${tagsString}`);
      } else {
        navigate('/');
      }
    }
  };

  const handleClose = () => {
    setIsFilterOpen(false);
  };

  const renderTags = () => {
    return Object.keys(tagMappings).map((tag) => {
      const mapping = tagMappings[tag];
      const isSelected = selectedTags.includes(tag);
      let display;

      // Check if the tag mapping is a string or an array (for emojis/icons)
      if (Array.isArray(mapping)) {
        display = mapping.join(' ');
      } else if (typeof mapping === 'string' && mapping.startsWith('/assets/')) {
        // If the tag is a URL (e.g., '/assets/'), render an image
        display = <img src={mapping} alt={tag} className="tag-image" />;
      } else {
        // Otherwise, treat it as a normal string (emoji or text)
        display = mapping;
      }

      return (
        <span
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`tag-item ${isSelected ? 'selected' : ''}`}
        >
          {display}
        </span>
      );
    });
  };

  return (
    <div className="filter-overlay">
      <button onClick={handleClose} className='close-button'>❌</button>
      <div className='tag-grid-container'>
        <div className="tag-grid">
          {renderTags()}
        </div>
      </div>
      <button onClick={handleConfirm} className='confirm-button'>✅</button>
    </div>
  );
}

export default Filter;
