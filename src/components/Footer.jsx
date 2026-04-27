import { FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const servicesList = [
  'Painting Services', 'Putty & Polish', 'Enamel Painting',
  'Texture Designing', 'Stencil Designing', 'Waterproofing',
  'Floor Coatings', 'House Cleaning', 'House Shifting',
];

const handleNav = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  }
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="Raj Colourings Logo" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">
              Professional Painting & House Cleaning Services in Coimbatore.
              Transforming your space with colour and care.
            </p>
            <div className="footer-socials" aria-label="Social media links">
              <a href="https://www.facebook.com/share/1B51qGvcWV/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/rajcolourings" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/919659717059" target="_blank" rel="noopener noreferrer" className="social-link social-whatsapp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links" aria-label="Quick navigation links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link" onClick={(e) => handleNav(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="footer-col-title">Our Services</h3>
            <ul className="footer-links" aria-label="Services list">
              {servicesList.map((s) => (
                <li key={s}>
                  <a href="#services" className="footer-link" onClick={(e) => handleNav(e, '#services')}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="footer-col-title">Contact Info</h3>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="fcontact-icon" aria-hidden="true" />
                <p>
                  Palakad Main Road, Madukkarai<br />
                  Coimbatore – 641 105<br />
                  Tamil Nadu, India
                </p>
              </div>
              <div className="footer-contact-item">
                <FaPhone className="fcontact-icon" aria-hidden="true" />
                <div>
                  <a href="tel:9659717059" className="footer-phone" aria-label="Call 96597 17059">96597 17059</a>
                  <br />
                  <a href="tel:8122596217" className="footer-phone" aria-label="Call 81225 96217">81225 96217</a>
                </div>
              </div>
              <div className="footer-contact-item">
                <span className="fcontact-icon" aria-hidden="true">🕐</span>
                <p>Mon – Sat: 8 AM – 7 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {year} Raj Colourings Painting & House Cleaning. All Rights Reserved.</p>
          <p className="footer-credits">Built with ❤️ for Coimbatore</p>
        </div>
      </div>
    </footer>
  );
}
