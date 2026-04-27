import { motion } from 'framer-motion';
import {
  FaThumbsUp, FaRupeeSign, FaUserTie, FaClock,
  FaLeaf, FaShieldAlt
} from 'react-icons/fa';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: <FaThumbsUp />,
    title: 'Premium Quality Work',
    desc: 'We use only the finest paints and materials to ensure your walls look beautiful and last for years.',
  },
  {
    icon: <FaRupeeSign />,
    title: 'Affordable Pricing',
    desc: 'Transparent pricing with no hidden costs. Get the best service at prices that suit your budget.',
  },
  {
    icon: <FaUserTie />,
    title: 'Expert Professionals',
    desc: 'Our team of skilled and experienced painters bring craftsmanship and dedication to every project.',
  },
  {
    icon: <FaClock />,
    title: 'Timely Delivery',
    desc: 'We respect your time and always complete projects on schedule without compromising on quality.',
  },
  {
    icon: <FaLeaf />,
    title: 'Eco-Friendly Paints',
    desc: 'We offer low-VOC and eco-friendly paint options that are safe for your family and the environment.',
  },
  {
    icon: <FaShieldAlt />,
    title: '100% Satisfaction',
    desc: "Customer satisfaction is our top priority. We don't consider a job done until you are fully happy.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="why-section" aria-labelledby="why-title">
      <div className="why-bg-shape" aria-hidden="true"></div>
      <div className="container why-container">
        <motion.div
          className="why-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Why Us</span>
          <h2 className="section-title" id="why-title" style={{ color: '#fff' }}>
            Why Choose Raj Colourings?
          </h2>
          <div className="title-divider"></div>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.75)' }}>
            We don't just paint walls — we transform spaces and build lasting relationships with our clients.
          </p>
        </motion.div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              className="why-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              aria-label={r.title}
            >
              <div className="why-icon" aria-hidden="true">{r.icon}</div>
              <h3 className="why-card-title">{r.title}</h3>
              <p className="why-card-desc">{r.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
