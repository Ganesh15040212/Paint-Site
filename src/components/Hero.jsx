import { motion } from 'framer-motion';
import { FaPhoneAlt, FaArrowDown, FaPaintBrush, FaHome, FaSprayCan } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Hero.css';

export default function Hero() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero banner">
      {/* Animated background shapes */}
      <div className="hero-bg-shapes" aria-hidden="true">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Floating icons */}
      <div className="floating-icons" aria-hidden="true">
        <motion.div
          className="float-icon float-icon-1"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaPaintBrush />
        </motion.div>
        <motion.div
          className="float-icon float-icon-2"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <FaHome />
        </motion.div>
        <motion.div
          className="float-icon float-icon-3"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <FaSprayCan />
        </motion.div>
      </div>

      <div className="container hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Coimbatore's Trusted Painters
          </motion.span>

          <h1 className="hero-title">
            <span className="hero-title-main">Raj</span>{' '}
            <span className="hero-title-accent">Colourings</span>
            <br />
            <span className="hero-title-sub">Painting & House Cleaning</span>
          </h1>

          <p className="hero-desc">
            Professional painting, waterproofing, texture designing, and house cleaning services 
            in Coimbatore. Quality work, affordable prices, expert team — your dream home awaits.
          </p>

          {/* Services Tags */}
          <div className="hero-tags" aria-label="Key services">
            {['Texture Design', 'Waterproofing', 'Stencil Design', 'Floor Coatings', 'House Cleaning'].map((tag) => (
              <span key={tag} className="hero-tag">{tag}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
            <a
              href="#contact"
              id="hero-quote-btn"
              className="btn-primary hero-btn-primary"
              onClick={(e) => scrollTo(e, '#contact')}
              aria-label="Get a free quote"
            >
              Get Free Quote
            </a>
            <a
              href="tel:9659717059"
              id="hero-call-btn"
              className="btn-secondary"
              aria-label="Call 96597 17059"
            >
              <FaPhoneAlt /> 96597 17059
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" aria-label="Business statistics">
            {[
              { number: '100+', label: 'Projects Done' },
              { number: '120+', label: 'Happy Clients' },
              { number: '2', label: 'Contact Numbers' },
            ].map(stat => (
              <div key={stat.label} className="hero-stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <div className="hero-card-wrap">
            <div className="hero-card hero-card-top">
              <FaHome className="hcard-icon" />
              <div>
                <p className="hcard-title">Interior Painting</p>
                <p className="hcard-sub">Premium finishes</p>
              </div>
            </div>
            <div className="hero-main-circle">
              <img src={logo} alt="Raj Colourings Logo" className="hero-circle-logo" />
            </div>
            <div className="hero-card hero-card-bottom">
              <FaSprayCan className="hcard-icon" />
              <div>
                <p className="hcard-title">Waterproofing</p>
                <p className="hcard-sub">Long lasting protection</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.a
        href="#about"
        className="scroll-down"
        onClick={(e) => scrollTo(e, '#about')}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-label="Scroll down to About section"
      >
        <FaArrowDown />
      </motion.a>
    </section>
  );
}
