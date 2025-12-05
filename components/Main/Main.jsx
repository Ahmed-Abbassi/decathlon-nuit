import React, { useState, useEffect } from 'react';
import { Search, User, Menu, ChevronLeft, ChevronRight, Play, Clock, Flame, Trophy, Star, Users, Calendar, Award, Target, Zap } from 'lucide-react';

const ProSportsApp = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sports.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const sports = [
    {
      id: 'fitness',
      name: 'Fitness',
      emoji: 'Strength',
      color: '#8B46FF',
      gradient: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      description: 'Transform your body with comprehensive fitness training. Build strength, endurance, and achieve your health goals.',
      exercises: [
        { name: 'HIIT Training', duration: '20 min', calories: '300 kcal', intensity: 'High' },
        { name: 'Circuit Training', duration: '30 min', calories: '400 kcal', intensity: 'Medium' }
      ],
      benefits: ['Fat Loss', 'Muscle Building', 'Cardio Health']
    },
    {
      id: 'golf',
      name: 'Golf',
      emoji: 'Golf',
      color: '#8B46FF',
      gradient: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
      description: 'Master the greens with precision and elegance. Perfect your swing and enjoy the ultimate gentleman\'s sport.',
      exercises: [
        { name: 'Swing Practice', duration: '45 min', calories: '200 kcal', intensity: 'Low' },
        { name: 'Putting Drills', duration: '30 min', calories: '150 kcal', intensity: 'Low' }
      ],
      benefits: ['Focus', 'Coordination', 'Outdoor Activity']
    },
    {
      id: 'gym',
      name: 'Gym',
      emoji: 'Lifter',
      color: '#8B46FF',
      gradient: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      description: 'Build muscle and power with resistance training. State-of-the-art equipment for maximum gains.',
      exercises: [
        { name: 'Strength Training', duration: '60 min', calories: '450 kcal', intensity: 'High' },
        { name: 'Powerlifting', duration: '50 min', calories: '400 kcal', intensity: 'High' }
      ],
      benefits: ['Muscle Mass', 'Strength', 'Bone Density']
    },
    {
      id: 'gymnastique',
      name: 'Gymnastics',
      emoji: 'Gymnast',
      color: '#8B46FF',
      gradient: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      description: 'Develop flexibility, balance, and body control. Master artistic movements with grace and power.',
      exercises: [
        { name: 'Floor Routine', duration: '40 min', calories: '350 kcal', intensity: 'High' },
        { name: 'Balance Beam', duration: '35 min', calories: '280 kcal', intensity: 'Medium' }
      ],
      benefits: ['Flexibility', 'Balance', 'Coordination']
    },
    {
      id: 'pilates',
      name: 'Pilates',
      emoji: 'Pilates',
      color: '#8B46FF',
      gradient: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      description: 'Core-focused exercises for posture, flexibility, and mental clarity. Low-impact, high-result workouts.',
      exercises: [
        { name: 'Mat Pilates', duration: '45 min', calories: '250 kcal', intensity: 'Medium' },
        { name: 'Reformer Class', duration: '50 min', calories: '300 kcal', intensity: 'Medium' }
      ],
      benefits: ['Core Strength', 'Posture', 'Mind-Body Connection']
    },
    {
      id: 'tennis',
      name: 'Tennis',
      emoji: 'Tennis',
      color: '#8B46FF',
      gradient: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
      description: 'Fast-paced action combining strategy, agility, and power. Improve your game on the court.',
      exercises: [
        { name: 'Rally Practice', duration: '60 min', calories: '500 kcal', intensity: 'High' },
        { name: 'Serve Training', duration: '40 min', calories: '350 kcal', intensity: 'Medium' }
      ],
      benefits: ['Agility', 'Reflexes', 'Cardiovascular']
    },
    {
      id: 'yoga',
      name: 'Yoga',
      emoji: 'Yoga',
      color: '#8B46FF',
      gradient: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      description: 'Ancient practice for mind, body, and spirit harmony. Find your inner peace through mindful movement.',
      exercises: [
        { name: 'Vinyasa Flow', duration: '60 min', calories: '240 kcal', intensity: 'Medium' },
        { name: 'Power Yoga', duration: '50 min', calories: '300 kcal', intensity: 'High' }
      ],
      benefits: ['Flexibility', 'Stress Relief', 'Mental Clarity']
    }
  ];

  const stats = [
    { icon: <Users size={24} />, value: '50K+', label: 'Active Users' },
    { icon: <Trophy size={24} />, value: '1M+', label: 'Workouts Completed' },
    { icon: <Star size={24} />, value: '4.9', label: 'App Rating' },
    { icon: <Calendar size={24} />, value: '365', label: 'Days of Content' }
  ];

  const features = [
    { icon: <Play size={32} />, title: 'Video Workouts', desc: 'HD quality training videos' },
    { icon: <Target size={32} />, title: 'Personal Goals', desc: 'Track your progress daily' },
    { icon: <Zap size={32} />, title: 'Quick Sessions', desc: '10-60 minute workouts' },
    { icon: <Award size={32} />, title: 'Achievements', desc: 'Unlock rewards & badges' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sports.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sports.length) % sports.length);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* HERO SLIDER */}
      <section style={{ position: 'relative', height: 600, overflow: 'hidden', background: '#000' }}>
        {sports.map((sport, index) => (
          <div key={sport.id} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}>
            <img src={sport.image} alt={sport.name} style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.7)'
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              zIndex: 10,
              width: '90%',
              maxWidth: 800
            }}>
              <div style={{ fontSize: 80, marginBottom: 20 }}>{sport.emoji}</div>
              <h1 style={{ 
                fontSize: 64, 
                fontWeight: 900, 
                marginBottom: 16, 
                textShadow: '2px 2px 20px rgba(0,0,0,0.5)',
                background: 'linear-gradient(135deg, #8B46FF, #6A38D1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {sport.name}
              </h1>
              <p style={{ fontSize: 20, marginBottom: 32, opacity: 0.95, textShadow: '1px 1px 10px rgba(0,0,0,0.5)' }}>
                {sport.description}
              </p>
              <button style={{
                background: 'white',
                color: '#8B46FF',
                border: 'none',
                padding: '16px 40px',
                borderRadius: 30,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(139, 70, 255, 0.3)'
              }}>Explore {sport.name}</button>
            </div>
          </div>
        ))}
        
        <button onClick={prevSlide} style={{
          position: 'absolute',
          left: 40,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          width: 60,
          height: 60,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          zIndex: 20
        }}>
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} style={{
          position: 'absolute',
          right: 40,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          width: 60,
          height: 60,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          zIndex: 20
        }}>
          <ChevronRight size={32} />
        </button>

        <div style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 12,
          zIndex: 20
        }}>
          {sports.map((_, index) => (
            <div 
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? 40 : 12,
                height: 12,
                borderRadius: index === currentSlide ? 6 : '50%',
                background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{
        background: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
        padding: 60,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        maxWidth: 1200,
        margin: '-80px auto 0',
        borderRadius: 20,
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ marginBottom: 16, opacity: 0.9 }}>{stat.icon}</div>
            <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 8 }}>{stat.value}</div>
            <div style={{ fontSize: 14, opacity: 0.9, fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* SPORTS GRID */}
      <section style={{ maxWidth: 1400, margin: '100px auto 60px', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{
            fontSize: 48,
            fontWeight: 900,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #8B46FF, #6A38D1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Choose Your Sport</h2>
          <p style={{ fontSize: 18, color: '#666' }}>Expert-led programs for every fitness level and goal</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 30
        }}>
          {sports.map((sport) => (
            <div id='cardd' key={sport.id} style={{
              background: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'all 0.4s',
              cursor: 'pointer'
            }}>
              <div style={{
                height: 200,
                position: 'relative',
                background: sport.gradient,
                overflow: 'hidden'
              }}>
                <img src={sport.image} alt={sport.name} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.6
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: 'white'
                }}>
                  <div style={{ fontSize: 60, marginBottom: 12 }}>{sport.emoji}</div>
                  <div style={{ fontSize: 28, fontWeight: 900 }}>{sport.name}</div>
                </div>
              </div>
              
              <div style={{ padding: 24 }}>
                <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 20 }}>{sport.description}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {sport.benefits.map((benefit, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(139, 70, 255, 0.12)',
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#8B46FF'
                    }}>{benefit}</span>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(139, 70, 255, 0.15)', paddingTop: 20 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <Play size={16} />
                    Entraînements populaires
                  </div>
                  {sport.exercises.map((exercise, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(139, 70, 255, 0.06)',
                      padding: 12,
                      borderRadius: 12,
                      marginBottom: 8
                    }}>
                      <div style={{ fontWeight: 700, color: '#333', marginBottom: 6 }}>{exercise.name}</div>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={14} /> {exercise.duration}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Flame size={14} /> {exercise.calories}
                        </span>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: 10,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          background: exercise.intensity === 'High' ? '#FFE5E5' : exercise.intensity === 'Medium' ? '#FFF4E5' : 'rgba(163, 102, 255, 0.15)',
                          color: exercise.intensity === 'High' ? '#FF4444' : exercise.intensity === 'Medium' ? '#FF9800' : '#A366FF'
                        }}>
                          {exercise.intensity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '80px 40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{
            fontSize: 48,
            fontWeight: 900,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #8B46FF, #6A38D1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Why Choose FitPro?</h2>
          <p style={{ fontSize: 18, color: '#666' }}>Tout ce dont vous avez besoin pour atteindre vos objectifs de remise en forme</p>
        </div>
        
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 40
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '40px 20px',
              background: 'white',
              borderRadius: 20,
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
            }}>
              <div style={{
                display: 'inline-flex',
                padding: 20,
                background: 'linear-gradient(135deg, #8B46FF, #6A38D1)',
                borderRadius: 20,
                color: 'white',
                marginBottom: 20
              }}>{feature.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#333' }}>{feature.title}</h3>
              <p style={{ color: '#666', fontSize: 14 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: 1200,
        margin: '80px auto',
        padding: '80px 40px',
        background: 'linear-gradient(135deg, #8B46FF 0%, #6A38D1 100%)',
        borderRadius: 30,
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 20 }}>Ready to Transform Your Life?</h2>
        <p style={{ fontSize: 20, marginBottom: 40, opacity: 0.95 }}>
          Join thousands of athletes and fitness enthusiasts reaching their goals every day
        </p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: 'white',
            color: '#8B46FF',
            border: 'none',
            padding: '18px 48px',
            borderRadius: 30,
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(139, 70, 255, 0.3)'
          }}>Start Your Free Trial</button>
          <button style={{
            background: 'transparent',
            color: 'white',
            border: '3px solid white',
            padding: '18px 48px',
            borderRadius: 30,
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#8B46FF';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'white';
          }}
          >View Plans</button>
        </div>
      </section>
    </div>
  );
};

export default ProSportsApp;