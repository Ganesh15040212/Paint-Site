import { useState, useEffect } from 'react';
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${visible ? 'stt-visible' : ''}`}
        onClick={scrollTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919659717059?text=Hi%20Raj%20Colourings%2C%20I%20need%20your%20painting%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </>
  );
}
