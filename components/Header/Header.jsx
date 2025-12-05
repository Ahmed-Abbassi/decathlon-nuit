import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, ChevronDown, Trophy, Flame, TrendingUp } from 'lucide-react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
const ProSportsHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const sports = [
  { 
    id: 'fitness', 
    name: 'Fitness', 
    icon: '💪',   // strength / fitness
    color: '#A366FF' 
  },
  { 
    id: 'golf', 
    name: 'Golf', 
    icon: '🏌️‍♂️',   // golf swing
    color: '#8B46FF' 
  },
  { 
    id: 'gym', 
    name: 'Gym', 
    icon: '🏋️‍♂️',   // weightlifting
    color: '#9D54FF' 
  },
  { 
    id: 'gymnastique', 
    name: 'Gymnastics', 
    icon: '🤸‍♀️',   // gymnast
    color: '#B366FF' 
  },
  { 
    id: 'pilates', 
    name: 'Pilates', 
    icon: '🧘‍♀️',   // pilates / stretching
    color: '#944DFF' 
  },
  { 
    id: 'tennis', 
    name: 'Tennis', 
    icon: '🎾',   // tennis ball
    color: '#A366FF' 
  },
  { 
    id: 'yoga', 
    name: 'Yoga', 
    icon: '🧘',   // meditation pose
    color: '#8B46FF' 
  }
];



  return (
    <>
      <style>{`
       
      `}</style>

      <header className={`pro-header ${scrolled ? 'scrolled' : ''}`}>
        {/* Promo Bar */}
        <div className="promo-bar">
          <div className="promo-content">
            <Flame size={16} />
            <span>🔥 Meilleur testeur des exercice avec l'IA</span>
            <Flame size={16} />
          </div>
        </div>

        {/* Main Header */}
        <div className="main-header">
          <div className="logo-section">
            <div className="logo">FitAI</div>
            <span className="logo-badge">PRO</span>
          </div>

          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search for sports, equipment, brands..."
            />
          </div>

          <div className="header-actions">
            
            <button className="cta-btn" onClick={()=>{
                navigate('/auth');
            }}>Creer compte</button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="nav-bar">
          <div className="nav-container">
            <ul className="nav-links">
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  All Sports <ChevronDown size={16} />
                </div>
                <div className="sports-grid">
                  {sports.map((sport, index) => (
                    <div 
                      key={index}
                      className="sport-card"
                      style={{ borderColor: sport.color }}
                    >
                      <div className="sport-icon">{sport.icon}</div>
                      <div className="sport-name">{sport.name}</div>
                    </div>
                  ))}
                </div>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Decathlon
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>

            <div className="promo-tags">
              <div className="promo-tag">
                <Trophy size={16} color="#FFD700" />
                <span onClick={()=>{
                  navigate('https://www.decathlon.tn/search/?query=best+seller')
                }}>Best Sellers</span>
              </div>
              <div className="promo-tag">
                <TrendingUp size={16} color="#00C9A7" />
                <span onClick={()=>{
                  navigate('https://www.decathlon.tn/search/?query=trending')
                }}>Trending Now</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <div className="logo">SPORTEX</div>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          <ul className="mobile-nav-links">
            <li className="mobile-nav-item">
              <a href="#" className="mobile-nav-link">Home</a>
            </li>
            <li className="mobile-nav-item">
              <a href="#" className="mobile-nav-link">All Sports</a>
            </li>
            <li className="mobile-nav-item">
              <a href="#" className="mobile-nav-link">New Arrivals</a>
            </li>
            <li className="mobile-nav-item">
              <a href="#" className="mobile-nav-link">Brands</a>
            </li>
            <li className="mobile-nav-item">
              <a href="#" className="mobile-nav-link">Sale</a>
            </li>
            <li className="mobile-nav-item">
              <a href="#" className="mobile-nav-link">Account</a>
            </li>
          </ul>
        </div>
      </header>

      {/* Demo Content */}
      
    </>
  );
};

export default ProSportsHeader;