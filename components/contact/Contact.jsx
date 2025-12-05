// ContactSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import "./Contact.css";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate send (replace with EmailJS later)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', type: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <>
      

      <section className="contact-section" id='contact' ref={sectionRef}>
        <div className="contact-container">
          {/* Left Side - Content */}
          <div className="contact-content">
            <h2>Let's Talk</h2>
            <p>
              Have a question, feedback, or just want to say hi? We're here to help. 
              Drop us a message and we'll get back to you faster than a 100m sprint.
            </p>

            <div className="contact-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <Mail size={24} />
                </div>
                <div className="feature-text">
                  <h4>Fast Response</h4>
                  <p>Usually reply within 2 hours</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <MessageSquare size={24} />
                </div>
                <div className="feature-text">
                  <h4>Personal Support</h4>
                  <p>Real humans, no robots</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <HelpCircle size={24} />
                </div>
                <div className="feature-text">
                  <h4>Any Topic</h4>
                  <p>Feature requests, bugs, or love letters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div id='formulaire' className={`contact-form-card ${isVisible ? 'visible' : ''}`}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Your Name</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Email Address</label>
              </div>

              <div className="form-group">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select topic</option>
                  <option value="suggest improvement">Suggest Improvement</option>
                  <option value="problem with ai">Problem with AI</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
                
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Your Message</label>
              </div>

              <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={24} />
                    Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="status-message status-success">
                  <CheckCircle size={20} />
                  Message sent! We'll reply soon
                </div>
              )}
              {status === 'error' && (
                <div className="status-message status-error">
                  <AlertCircle size={20} />
                  Failed to send. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;