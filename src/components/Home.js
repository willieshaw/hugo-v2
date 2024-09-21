import React, { useEffect, useState } from 'react';
import images from '../data/imageData';
import './Home.css';

function Home() {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const filteredImages = images
      .filter((image) => image.tags.includes('featured'))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setFeaturedImages(filteredImages);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + featuredImages.length) % featuredImages.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredImages.length);
  };

  if (featuredImages.length === 0) {
    return <div>No featured images available.</div>;
  }

  const currentImage = featuredImages[currentIndex];

  return (

    <div className='slideshow'>
      <div className='slideshow-image' >
        <img src={currentImage.src} alt={currentImage.alt} />
      </div>

      <div className="arrows">
        <button className="arrow" onClick={handlePrev}>⬅️</button>
        <button className="arrow" onClick={handleNext}>➡️</button>
      </div>
    </div>
  );
}

export default Home;
