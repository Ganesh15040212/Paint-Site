import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaEnvelope, FaComment, FaTools, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './ContactForm.css';

const services = [
  'All Type of Painting',
  'Putty & Polish',
  'Enamel Painting',
  'Floor Water Leak Painting',
  'Texture Designing',
  'Stencil Designing',
  'House Cleaning',
  'House Shifting Service',
  'Air Crack Filling',
  'Water Proofing Solutions',
  'Floor Coatings',
  'Other / Multiple Services',
];

// Security: Sanitize input (strip HTML tags)
const sanitize = (str) => str.replace(/[<>]/g, '');

// Validate Indian phone number (10 digits)
const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));

// Validate email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Web3Forms Access Key
const WEB3FORMS_KEY = "47640863-087c-4fb3-87e6-b04fb9d1a602"; 

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Please enter your full name (min. 2 characters).';
    }
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!isValidPhone(form.phone)) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!isValidEmail(form.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!form.service) {
      errs.service = 'Please select a service.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: sanitize(value) }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMessage("");

    try {
      // Call our own Serverless Function to bypass local network blocks
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Website Enquiry from ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        })
      });

      const result = await response.json();

      if (response.ok && result?.success) {
        setStatus('success');
        setForm({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        console.error("Submission Error:", result);
        setStatus('error');
        setErrorMessage(result?.message || "Internal Server error. Please try again later.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      if (formRef.current) {
        // Ultimate Fallback: If fetch is entirely blocked (CORS/Adblock), natively submit
        formRef.current.submit();
      } else {
        setStatus('error');
        setErrorMessage(err.message === "Failed to fetch" 
          ? "Network Error (AdBlocker or Firewall blocking api.web3forms.com)" 
          : err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-bg-shape" aria-hidden="true"></div>
      <div className="container contact-grid">
        {/* Info Panel */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-badge">Contact Us</span>
          <h2 className="section-title" id="contact-title" style={{ textAlign: 'left', color: '#fff' }}>
            Get In Touch With Us
          </h2>
          <div className="title-divider" style={{ margin: '0.75rem 0 1rem' }}></div>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Ready to transform your home? Fill out the form and our team will get back to you as soon as possible!
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="detail-icon" aria-hidden="true">📍</div>
              <div>
                <p className="detail-title">Our Location</p>
                <p className="detail-value">Palakad Main Road, Madukkarai<br />Coimbatore – 641 105</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <div className="detail-icon" aria-hidden="true">📞</div>
              <div>
                <p className="detail-title">Call Us</p>
                <a href="tel:9659717059" className="detail-value detail-link" aria-label="Call 96597 17059">96597 17059</a>
                <br />
                <a href="tel:8122596217" className="detail-value detail-link" aria-label="Call 81225 96217">81225 96217</a>
              </div>
            </div>
            <div className="contact-detail-item">
              <div className="detail-icon" aria-hidden="true">🕐</div>
              <div>
                <p className="detail-title">Working Hours</p>
                <p className="detail-value">Monday – Saturday: 8 AM – 7 PM<br />Sunday: On Request</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {status === 'success' && (
            <div className="form-alert form-alert-success" role="alert">
              <FaCheckCircle /> Thank you! We have received your enquiry. We will contact you shortly.
            </div>
          )}
          {status === 'error' && (
            <div className="form-alert form-alert-error" role="alert">
              <FaExclamationTriangle /> {errorMessage || "Something went wrong. Please call us directly at 96597 17059."}
            </div>
          )}

          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            {/* Native HTML Fallback Config */}
            <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
            <input type="hidden" name="subject" value={`New Website Enquiry from ${form.name}`} />
            <input type="hidden" name="from_name" value={form.name} />

            {/* Name */}
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                <FaUser aria-hidden="true" /> Full Name *
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="Your full name"
                maxLength={60}
                autoComplete="name"
                aria-required="true"
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" className="form-error" role="alert">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="contact-phone" className="form-label">
                <FaPhone aria-hidden="true" /> Phone Number *
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="10-digit mobile number"
                maxLength={15}
                autoComplete="tel"
                aria-required="true"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <p id="phone-error" className="form-error" role="alert">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                <FaEnvelope aria-hidden="true" /> Email Address *
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com"
                maxLength={80}
                autoComplete="email"
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <p id="email-error" className="form-error" role="alert">{errors.email}</p>}
            </div>

            {/* Service */}
            <div className="form-group">
              <label htmlFor="contact-service" className="form-label">
                <FaTools aria-hidden="true" /> Service Required *
              </label>
              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={handleChange}
                className={`form-input form-select ${errors.service ? 'input-error' : ''}`}
                aria-required="true"
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                <option value="">-- Select a service --</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.service && <p id="service-error" className="form-error" role="alert">{errors.service}</p>}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                <FaComment aria-hidden="true" /> Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                placeholder="Describe your requirement (property size, service needed, location, etc.)"
                rows={4}
                maxLength={500}
                aria-required="true"
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              <p className="char-count" aria-live="polite">{form.message.length}/500</p>
              {errors.message && <p id="message-error" className="form-error" role="alert">{errors.message}</p>}
            </div>

            <button
              type="submit"
              id="contact-submit-btn"
              className="btn-submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <><span className="spinner" aria-hidden="true"></span> Sending...</>
              ) : (
                'Send Enquiry'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
