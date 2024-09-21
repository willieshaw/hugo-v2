import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="about-container">
      <a href="mailto:studio@hugoyu.co" className="emoji-link" aria-label="Email">
        ✉️
      </a>
      <a href="https://www.instagram.com/_hugoyu" className="emoji-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        👁️
      </a>
      <a href="/assets/photographer-cv.pdf" download className="emoji-link" aria-label="Download CV">
        📄
      </a>
    </div>
  );
}

export default Contact;
