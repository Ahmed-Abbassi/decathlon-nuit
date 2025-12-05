// Footer.jsx
import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ChevronUp
} from 'lucide-react';
import './Footer.css';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>


      {/* Main Footer */}
      <footer className="footer">
        <div className="footer-main">
          {/* Logo & About */}
          <div className="footer-logo-section">
            <div className="footer-logo">FitAI</div>
            <p className="footer-desc">
              Your personal AI-powered fitness coach. Transform your body and mind with workouts tailored just for you.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#workouts">Workouts</a>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#blog">Blog</a>
            </div>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h3>Company</h3>
            <div className="footer-links">
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#press">Press Kit</a>
              <a href="#partners">Partners</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          {/* Support */}
          <div className="footer-column">
            <h3>Support</h3>
            <div className="footer-links">
              <a href="#help">Help Center</a>
              <a href="#safety">Safety</a>
              <a href="#community">Community</a>
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div className="footer-column">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <div style={{fontWeight: 600}}>Email Us</div>
                  <div>hello@fitai.com</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Phone size={20} /></div>
                <div>
                  <div style={{fontWeight: 600}}>Call Us</div>
                  <div>+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div>
                  <div style={{fontWeight: 600}}>Location</div>
                  <div>San Francisco, CA</div>
                </div>
              </div>
            </div>

            <div className="newsletter" style={{marginTop: '32px'}}>
              <h4>Stay Updated</h4>
              <p>Get fitness tips and exclusive offers straight to your inbox.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button type="submit" className="newsletter-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © 2025 FitAI. All rights reserved. Made with <span style={{color: '#FF6B35'}}>♥</span> for better health.
          </div>
          <div>
            Built by <a href="#">@yourname</a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <div 
        className="back-to-top"
        onClick={scrollToTop}
        style={{opacity: typeof window !== 'undefined' && window.scrollY > 500 ? 1 : 0, visibility: window.scrollY > 500 ? 'visible' : 'hidden'}}
      >
        <ChevronUp size={28} />
      </div>
    </>
  );
};

export default Footer;