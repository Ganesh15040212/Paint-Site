import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaPlus, FaTimes } from 'react-icons/fa';
import './Testimonials.css';

const initialTestimonials = [
  {
    id: 1,
    name: 'Arjun Kumar',
    location: 'Madukkarai, Coimbatore',
    rating: 5,
    review: 'Raj Colourings did an outstanding job on our house! The texture designing they did in our living room is absolutely stunning. Professional team, on-time delivery, and very reasonable pricing. Highly recommended!',
  },
  {
    id: 2,
    name: 'Priya Sundaram',
    location: 'Saravanampatti, Coimbatore',
    rating: 5,
    review: 'We hired them for complete house painting plus waterproofing. The waterproofing work is excellent — no more leaks during monsoon! Very happy with the quality and cleanliness of their work.',
  },
  {
    id: 3,
    name: 'Senthilkumar R.',
    location: 'Gandhipuram, Coimbatore',
    rating: 5,
    review: 'The stencil design work they created for our daughters bedroom is simply beautiful. The team was very professional and courteous. Will definitely call Raj Colourings for our next project!',
  },
  {
    id: 4,
    name: 'Meena Krishnan',
    location: 'Peelamedu, Coimbatore',
    rating: 5,
    review: 'Got floor coatings done for our office. The result was exceptional — durable, shiny, and professionally done. The team was punctual and finished well within the timeline. Great value for money.',
  },
  {
    id: 5,
    name: 'Rahman Basha',
    location: 'RS Puram, Coimbatore',
    rating: 5,
    review: 'Best painting contractors I have found in Coimbatore! They also helped with house shifting and cleaning. Everything was done with great care and attention. The whole house looks transformed — 5 stars!',
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(initialTestimonials);
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  
  // Feedback form state
  const [formData, setFormData] = useState({ name: '', location: '', rating: 5, review: '' });

  // Load reviews from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('raj_colorings_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading reviews');
      }
    }
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  const getVisible = () => {
    const indices = [];
    const len = reviews.length;
    for (let i = 0; i < (len < 3 ? len : 3); i++) {
      indices.push((current + i) % len);
    }
    return indices;
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review || !formData.location) return;

    const newReview = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      rating: Number(formData.rating),
      review: formData.review
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('raj_colorings_reviews', JSON.stringify(updated));
    
    // Reset form and UI
    setFormData({ name: '', location: '', rating: 5, review: '' });
    setShowForm(false);
    setCurrent(0); // Show new review immediately
  };

  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <span className="section-badge">Customer Reviews</span>
        <h2 className="section-title" id="testimonials-title">What Our Clients Say</h2>
        <div className="title-divider"></div>
        <p className="section-subtitle">
          Real reviews from our happy customers across Coimbatore.
        </p>
        
        <div className="testi-header-actions" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button 
            className="btn-primary" 
            onClick={() => setShowForm(!showForm)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}
          >
            {showForm ? <FaTimes /> : <FaPlus />} {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form 
              className="feedback-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleFeedbackSubmit}
            >
              <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Share Your Experience</h3>
              <div className="feedback-grid">
                <input 
                  type="text" 
                  placeholder="Your Name (e.g., Arjun)" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Location (e.g., Peelamedu)" 
                  value={formData.location} 
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required
                />
                <select 
                  value={formData.rating} 
                  onChange={e => setFormData({...formData, rating: e.target.value})}
                >
                  <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
                  <option value="4">⭐⭐⭐⭐ Good (4)</option>
                  <option value="3">⭐⭐⭐ Average (3)</option>
                </select>
                <textarea 
                  placeholder="Tell us about the painting or cleaning service you received..." 
                  value={formData.review} 
                  onChange={e => setFormData({...formData, review: e.target.value})}
                  required
                  rows="3"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                Post
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="testimonials-wrapper">
          <button
            className="testi-nav testi-prev"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <div className="testimonials-grid" role="list">
            {getVisible().map((idx, i) => {
              const t = reviews[idx];
              if (!t) return null;
              return (
                <motion.article
                  key={`${t.id}-${i}`}
                  className={`testi-card ${i === 1 ? 'testi-card-center' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  role="listitem"
                  aria-label={`Review by ${t.name}`}
                >
                  <FaQuoteLeft className="quote-icon" aria-hidden="true" />
                  <p className="testi-review">"{t.review}"</p>
                  <div className="testi-stars" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }, (_, j) => (
                      <FaStar key={j} className="star" aria-hidden="true" />
                    ))}
                  </div>
                  <div className="testi-author">
                    <div className="testi-avatar" aria-hidden="true">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="testi-name">{t.name}</p>
                      <p className="testi-location">{t.location}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <button
            className="testi-nav testi-next"
            onClick={next}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="testi-dots" role="tablist" aria-label="Testimonial navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'dot-active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to review ${i + 1}`}
              role="tab"
              aria-selected={i === current}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
