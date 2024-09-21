import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalState';
import images from '../data/imageData';
import './IndexView.css';

function IndexView() {
  const { activeTags, setActiveTags, setActiveImage } = useContext(GlobalStateContext);
  const { activeTags: routeActiveTags } = useParams();
  const navigate = useNavigate();
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    // Debugging: Log the routeActiveTags and activeTags
    console.log("Route active tags:", routeActiveTags);
    console.log("Current active tags from global state:", activeTags);

    let tags = [];

    if (routeActiveTags) {
      // If there are active tags from the route, use them
      tags = routeActiveTags.split('&').map(decodeURIComponent);
      console.log("Using tags from route:", tags);
    } else if (activeTags.length > 0) {
      // If no route tags but activeTags in global state, use activeTags
      tags = activeTags;
      console.log("Using activeTags from global state:", tags);
    } else {
      // If no route tags and activeTags is empty, default to 'featured'
      tags = ['featured'];
      console.log("Defaulting to 'featured' tag");
      setActiveTags(tags); // Set the default 'featured' tag in the global state
    }

    const filtered = images
      .filter((image) => tags.every((tag) => image.tags.includes(tag)))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log("Filtered images:", filtered);

    setFilteredImages(filtered);
  }, [routeActiveTags, activeTags, setActiveTags]);

  const handleImageClick = (image) => {
    setActiveImage(image);
    const tagsString = activeTags.map(encodeURIComponent).join('&');
    navigate(`/slideshow/${tagsString}/${image.id}`);
  };

  if (filteredImages.length === 0) {
      return <div className="no-images-found-container"><div className='no-images-found'>😔</div></div>;
  }

  return (
    <div className="index-view-container">
    <div className="index-grid">
      {filteredImages.map((image) => (
        <img 
          className='index-image'
          key={image.id}
          src={image.src}
          alt={image.alt}
          onClick={() => handleImageClick(image)}
        />
      ))}
    </div>
  </div>
  
  );
}

export default IndexView;
