import { motion } from 'framer-motion';
import { FaCheckCircle, FaUsers, FaAward, FaProjectDiagram } from 'react-icons/fa';
import './About.css';

const stats = [
  { icon: <FaProjectDiagram />, number: '100+', label: 'Projects Completed' },
  { icon: <FaUsers />, number: '120+', label: 'Happy Clients' },
  { icon: <FaCheckCircle />, number: '100%', label: 'Quality Guaranteed' },
];

const features = [
  'All types of interior & exterior painting',
  'Expert texture and stencil designing',
  'Advanced waterproofing solutions',
  'House cleaning & shifting services',
  'Use of premium quality paints only',
  'On-time project delivery guaranteed',
];

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="container about-grid">
        {/* Visual Side */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-hidden="true"
        >
          <div className="about-card-main">
            <div className="about-icon-wrap">
              <FaAward className="about-icon" />
            </div>
            <h3>Trusted Since 2023</h3>
            <p>Serving Coimbatore & surrounding areas with pride</p>
          </div>
          <div className="about-stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="about-stat-card">
                <span className="astat-icon">{s.icon}</span>
                <span className="astat-number">{s.number}</span>
                <span className="astat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="section-badge">About Us</span>
          <h2 className="section-title" id="about-title" style={{ textAlign: 'left' }}>
            Coimbatore's Premier Painting & Cleaning Experts
          </h2>
          <div className="title-divider" style={{ margin: '0.75rem 0 1rem' }}></div>
          <p className="about-desc">
            At <strong>Raj Colourings</strong>, we have been transforming homes and commercial spaces in 
            Coimbatore with our professional painting and house cleaning services. Based in 
            <strong> Madukkarai, Palakad Main Road</strong>, we bring colour, cleanliness, and comfort 
            to every project we undertake.
          </p>
          <p className="about-desc">
            Our skilled team specialises in everything from standard wall painting to complex texture 
            designing, stencil art, waterproofing, and floor coatings — delivering premium results at 
            affordable prices.
          </p>

          {/* Features */}
          <ul className="about-features" aria-label="Key services we offer">
            {features.map((f) => (
              <li key={f} className="about-feature-item">
                <FaCheckCircle className="feature-check" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <div className="about-ctas">
            <a href="#services" className="btn-primary" onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#services');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }}>
              Our Services
            </a>
            <a href="tel:9659717059" className="about-phone-link" aria-label="Call 96597 17059">
              📞 96597 17059
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
