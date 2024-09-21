import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalState';
import images from '../data/imageData';
import './SlideshowView.css';

function SlideshowView() {
    const { activeTags, setActiveTags, setActiveImage, activeImage } =
        useContext(GlobalStateContext);
    const { activeTags: routeActiveTags, activeImageId } = useParams();
    const navigate = useNavigate();
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        const tags = routeActiveTags
            ? routeActiveTags.split('&').map(decodeURIComponent)
            : ['featured'];
        setActiveTags(tags);

        const filtered = images
            .filter((image) => tags.every((tag) => image.tags.includes(tag)))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        setFilteredImages(filtered);

        const image = filtered.find(
            (img) => img.id === parseInt(activeImageId, 10)
        );
        setActiveImage(image || filtered[0]);
    }, [
        routeActiveTags,
        activeImageId,
        setActiveTags,
        setActiveImage,
        images,
    ]);

    if (!activeImage) {
        return <div className='no-images-found'>😔</div>;
    }

    const currentIndex = filteredImages.findIndex(
        (img) => img.id === activeImage.id
    );

    const handlePrev = () => {
        const prevIndex =
            (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        const prevImage = filteredImages[prevIndex];
        const tagsString = activeTags.map(encodeURIComponent).join('&');
        navigate(`/slideshow/${tagsString}/${prevImage.id}`);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        const nextImage = filteredImages[nextIndex];
        const tagsString = activeTags.map(encodeURIComponent).join('&');
        navigate(`/slideshow/${tagsString}/${nextImage.id}`);
    };

    return (
        <div className='slideshow'>
            <div className='slideshow-image'>
            <img src={activeImage.src} alt={activeImage.alt} />
            </div>

            <div className="arrows">
                <button className="arrow" onClick={handlePrev}>⬅️</button>
                <button className="arrow" onClick={handleNext}>➡️</button>
            </div>
        </div>
    );
}

export default SlideshowView;
