import { motion } from 'framer-motion';
import {
  FaPaintRoller, FaFillDrip, FaStar, FaHome,
  FaLayerGroup, FaShieldAlt, FaBroom, FaTruck,
  FaWrench, FaTint, FaChessBoard
} from 'react-icons/fa';
import './Services.css';

const services = [
  {
    id: 'painting',
    icon: <FaPaintRoller />,
    title: 'All Type of Painting',
    desc: 'Interior & exterior wall painting using premium quality paints for long-lasting, beautiful finishes.',
  },
  {
    id: 'putty',
    icon: <FaFillDrip />,
    title: 'Putty & Polish',
    desc: 'Smooth wall putty application and flawless polishing to give walls a perfect base before painting.',
  },
  {
    id: 'enamel',
    icon: <FaStar />,
    title: 'Enamel Painting',
    desc: 'High-gloss enamel paint for doors, windows, grills, and metal surfaces with durable outdoor protection.',
  },
  {
    id: 'floor-water-leak',
    icon: <FaTint />,
    title: 'Floor Water Leak Painting',
    desc: 'Specialised painting solutions to prevent water seepage through floors, keeping your home dry and safe.',
  },
  {
    id: 'texture',
    icon: <FaLayerGroup />,
    title: 'Texture Designing',
    desc: 'Stunning textured wall finishes including sponge, roller, and custom patterns for unique interiors.',
  },
  {
    id: 'stencil',
    icon: <FaChessBoard />,
    title: 'Stencil Designing',
    desc: 'Artistic stencil patterns and decorative designs to give your rooms a personalised, elegant look.',
  },
  {
    id: 'cleaning',
    icon: <FaBroom />,
    title: 'House Cleaning',
    desc: 'Deep cleaning services for your home — from kitchen to bathroom, leaving every corner spotless.',
  },
  {
    id: 'shifting',
    icon: <FaTruck />,
    title: 'House Shifting Service',
    desc: 'Professional and careful house shifting assistance to help you move with zero hassle and full safety.',
  },
  {
    id: 'crack',
    icon: <FaWrench />,
    title: 'Air Crack Filling',
    desc: 'Expert crack detection and filling service to strengthen walls and prevent further structural damage.',
  },
  {
    id: 'waterproof',
    icon: <FaShieldAlt />,
    title: 'Water Proofing Solutions',
    desc: 'Long-lasting waterproofing for roofs, terraces, and walls to protect against rain and dampness.',
  },
  {
    id: 'floor-coating',
    icon: <FaHome />,
    title: 'Floor Coatings',
    desc: 'Durable and attractive floor coatings for industrial, commercial, and residential spaces.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <div className="container">
        <span className="section-badge">What We Do</span>
        <h2 className="section-title" id="services-title">Our Professional Services</h2>
        <div className="title-divider"></div>
        <p className="section-subtitle">
          From painting to waterproofing, texture designing to house cleaning — we cover it all 
          with expertise and precision.
        </p>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              aria-label={service.title}
            >
              <div className="service-icon-wrap" aria-hidden="true">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="services-cta-wrap">
          <a href="#contact" className="btn-primary" onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector('#contact');
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
          }}>
            Get Free Quote
          </a>
          <p className="services-note">📞 Call us: <a href="tel:9659717059">96597 17059</a> / <a href="tel:8122596217">81225 96217</a></p>
        </div>
      </div>
    </section>
  );
}
