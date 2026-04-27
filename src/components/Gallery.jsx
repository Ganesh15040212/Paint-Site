import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand } from 'react-icons/fa';
import './Gallery.css';

// Gallery items with descriptions
const galleryItems = [
  { id: 1, label: 'Interior Wall Painting', color: '#1A73E8', emoji: '🎨' },
  { id: 2, label: 'Texture Designing', color: '#E91E63', emoji: '🖌️' },
  { id: 3, label: 'Waterproofing', color: '#00BCD4', emoji: '💧' },
  { id: 4, label: 'Stencil Art', color: '#4CAF50', emoji: '✨' },
  { id: 5, label: 'Floor Coating', color: '#FF9800', emoji: '🏠' },
  { id: 6, label: 'Air Crack Filling', color: '#FFD600', emoji: '🔧' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (item) => setLightbox(item);
  const closeLightbox = () => setLightbox(null);

  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <span className="section-badge">Our Work</span>
        <h2 className="section-title" id="gallery-title">Project Gallery</h2>
        <div className="title-divider"></div>
        <p className="section-subtitle">
          A glimpse of our finest work — from textured walls to flawless exteriors across Coimbatore.
        </p>

        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => openLightbox(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.label}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(item)}
            >
              {/* Visual placeholder with gradient */}
              <div
                className="gallery-img-placeholder"
                style={{
                  background: `linear-gradient(135deg, ${item.color}dd, ${item.color}88)`,
                }}
              >
                <span className="gallery-emoji" aria-hidden="true">{item.emoji}</span>
              </div>
              <div className="gallery-overlay">
                <FaExpand className="gallery-expand-icon" aria-hidden="true" />
                <p className="gallery-label">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="gallery-note">
          📞 To see more of our work or request a custom quote, call us at{' '}
          <a href="tel:9659717059">96597 17059</a>
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing ${lightbox.label}`}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close gallery"
              >
                <FaTimes />
              </button>
              <div
                className="lightbox-img"
                style={{
                  background: `linear-gradient(135deg, ${lightbox.color}ee, ${lightbox.color}88)`,
                }}
              >
                <span className="lightbox-emoji" aria-hidden="true">{lightbox.emoji}</span>
              </div>
              <p className="lightbox-caption">{lightbox.label}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
