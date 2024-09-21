// components/Slideshow.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { imageData } from '../data/imageData';
import './Slideshow.css';

const Slideshow = ({ filters }) => {
  const router = useRouter();
  const { filterTags, imageId } = router.query;

  const filteredImages = filters.length > 0
    ? imageData.filter((image) => filters.every((tag) => image.tags.includes(tag)))
    : imageData;

  const [currentIndex, setCurrentIndex] = useState(
    imageId
      ? filteredImages.findIndex((image) => image.id === Number(imageId))
      : 0
  );

  useEffect(() => {
    if (filterTags && imageId) {
      setCurrentIndex(filteredImages.findIndex((image) => image.id === Number(imageId)));
    }
  }, [filterTags, imageId]);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(newIndex);
    const newImageId = filteredImages[newIndex].id;
    router.push(`/slideshow/${filters.join('&')}/${newImageId}`, undefined, { shallow: true });
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    const newImageId = filteredImages[newIndex].id;
    router.push(`/slideshow/${filters.join('&')}/${newImageId}`, undefined, { shallow: true });
  };

  return (
    <div className="slideshow">
      <img src={filteredImages[currentIndex].src} alt={filteredImages[currentIndex].alt} className="slide-image" />
      <div className="controls">
        <span onClick={handlePrev} className="arrow left">⬅️</span>
        <span onClick={handleNext} className="arrow right">➡️</span>
      </div>
    </div>
  );
};

export default Slideshow;
