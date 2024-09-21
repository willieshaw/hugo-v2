import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalState';
import tagMappings from '../data/tagMappings';
import './Navigation.css';

function Navigation() {
    const {
        activeTags,
        setActiveTags,
        activeImage,
        setIsFilterOpen,
    } = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleContactClick = () => {
        navigate('/contact');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleFilterClick = () => {
        setIsFilterOpen(true);
    };

    const handleClearFilters = () => {
        setActiveTags(['featured']);
        navigate('/');
    };

    const handleViewToggle = () => {
        const path = window.location.pathname;

        const tagsString = activeTags.map(encodeURIComponent).join('&');
        if (path.startsWith('/slideshow')) {
            navigate(`/index/${tagsString}`);
        } else if (path.startsWith('/index')) {
            const imageId = activeImage ? activeImage.id : null;
            if (imageId) {
                navigate(`/slideshow/${tagsString}/${imageId}`);
            } else {
                navigate(`/slideshow/${tagsString}/1`);
            }
        } else {
            navigate('/index/');
        }
    };

    const renderFilterIcon = () => {
        if (
            activeTags.length === 0 ||
            (activeTags.length === 1 && activeTags[0] === 'featured')
        ) {
            return <span onClick={handleFilterClick} className="nav-item" id='filter-nav'>🔍</span>;
        } else {
            const tagIcons = activeTags
                .map((tag) => {
                    const mapping = tagMappings[tag];
                    if (Array.isArray(mapping)) {
                        return mapping.join(' + ');
                    } else if (typeof mapping === 'string' && mapping.startsWith('/assets/')) {
                        // If the tag is a URL, return an <img> element
                        return <img src={mapping} alt={tag} key={tag} className="tag-image-nav" />;
                    } else {
                        return mapping;
                    }
                })
                .reduce((acc, curr) => acc.length === 0 ? [curr] : [...acc, ' + ', curr], []);

            return (
                <div className="nav-item filter-section">
                    <span>
                        (<span onClick={handleFilterClick} className='filters'>{tagIcons}</span>)
                        <span onClick={handleClearFilters} className="clear-filters">❌</span>
                    </span>
                </div>
            );
        }
    };

    return (
        <nav>
            <div className='navbar-container'>
                <div className='navbar'>
                    {/* Conditionally render the Home or Contact icon based on the current path */}
                    {location.pathname === '/contact' ? (
                        <span onClick={handleHomeClick} className="nav-item" id='about-nav'>🏠</span>
                    ) : (
                        <span onClick={handleContactClick} className="nav-item" id='about-nav'>💬</span>
                    )}
                    {renderFilterIcon()}
                    <span onClick={handleViewToggle} className="nav-item" id='index-nav'>🖼️</span>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
