// FitAIAuth.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth/useAuth";
import { Activity, Mail, Lock, User, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import './FitAIAuth.css';
import { useNavigate } from 'react-router-dom';

// Composant Login
function LoginForm({ onToggleMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { loading, error, success, authenticate, reset } = useAuth(true);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/qcm');
      }, 1500);
    }
  }, [success, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async () => {
    if (validateForm()) {
      await authenticate({
        username: formData.email,   // 🔥 FIX : send email as username
        password: formData.password
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLoginSubmit();
    }
  };

  return (
    <>
      {success && (
        <div className="success-banner" role="alert">
          <AlertCircle className="success-icon" />
          <span>Connexion réussie! Redirection...</span>
        </div>
      )}

      {error && (
        <div className="error-banner" role="alert">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      <div className="auth-form" role="form" aria-label="Formulaire de connexion">
        <div className="form-group">
          <label htmlFor="login-email" className="sr-only">Adresse email</label>
          <div className="input-wrapper">
            <div className="input-icon" aria-hidden="true">
              <Mail className="icon" />
            </div>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Adresse email"
              disabled={loading}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
              className={`form-input ${errors.email ? 'input-error' : ''} ${loading ? 'input-disabled' : ''}`}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="error-message" role="alert">
              <AlertCircle className="error-icon" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="login-password" className="sr-only">Mot de passe</label>
          <div className="input-wrapper">
            <div className="input-icon" aria-hidden="true">
              <Lock className="icon" />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Mot de passe"
              disabled={loading}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              autoComplete="current-password"
              className={`form-input ${errors.password ? 'input-error' : ''} ${loading ? 'input-disabled' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="password-toggle"
            >
              {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="error-message" role="alert">
              <AlertCircle className="error-icon" />
              {errors.password}
            </p>
          )}
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" className="checkbox" disabled={loading} />
            Se souvenir de moi
          </label>
          <button type="button" className="forgot-password" disabled={loading}>
            Mot de passe oublié?
          </button>
        </div>

        <button
          onClick={handleLoginSubmit}
          type="button"
          disabled={loading}
          className={`submit-button ${loading ? 'button-loading' : ''}`}
        >
          {loading ? (
            <>
              <Loader2 className="loading-spinner" />
              <span>Connexion...</span>
            </>
          ) : (
            'Se connecter'
          )}
        </button>
      </div>

      <div className="divider" aria-hidden="true">
        <span className="divider-text"></span>
      </div>

      <div className="toggle-mode">
        Pas encore de compte?{' '}
        <button type="button" onClick={onToggleMode} disabled={loading} className="toggle-button">
          S'inscrire
        </button>
      </div>
    </>
  );
}

// Composant Signup - CORRIGÉ : username au lieu de name
function SignupForm({ onToggleMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const { loading, error, success, authenticate, reset } = useAuth(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/aivideo');
      }, 1500);
    }
  }, [success, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (formData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit faire au moins 3 caractères";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = async () => {
    if (validateForm()) {
      await authenticate({
        username: formData.username,  
        email: formData.email,
        password: formData.password
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSignupSubmit();
    }
  };

  return (
    <>
      {success && (
        <div className="success-banner" role="alert">
          <AlertCircle className="success-icon" />
          <span>Compte créé avec succès! Redirection...</span>
        </div>
      )}

      {error && (
        <div className="error-banner" role="alert">
          <AlertCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      <div className="auth-form" role="form" aria-label="Formulaire d'inscription">
        
        <div className="form-group">
          <label htmlFor="signup-username" className="sr-only">Nom d'utilisateur</label>
          <div className="input-wrapper">
            <div className="input-icon" aria-hidden="true">
              <User className="icon" />
            </div>
            <input
              id="signup-username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Nom d'utilisateur"
              disabled={loading}
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby={errors.username ? "username-error" : undefined}
              autoComplete="username"
              className={`form-input ${errors.username ? 'input-error' : ''} ${loading ? 'input-disabled' : ''}`}
            />
          </div>
          {errors.username && (
            <p id="username-error" className="error-message" role="alert">
              <AlertCircle className="error-icon" />
              {errors.username}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="signup-email" className="sr-only">Adresse email</label>
          <div className="input-wrapper">
            <div className="input-icon" aria-hidden="true">
              <Mail className="icon" />
            </div>
            <input
              id="signup-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Adresse email"
              disabled={loading}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
              className={`form-input ${errors.email ? 'input-error' : ''} ${loading ? 'input-disabled' : ''}`}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="error-message" role="alert">
              <AlertCircle className="error-icon" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="signup-password" className="sr-only">Mot de passe</label>
          <div className="input-wrapper">
            <div className="input-icon" aria-hidden="true">
              <Lock className="icon" />
            </div>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Mot de passe"
              disabled={loading}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              autoComplete="new-password"
              className={`form-input ${errors.password ? 'input-error' : ''} ${loading ? 'input-disabled' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="password-toggle"
            >
              {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="error-message" role="alert">
              <AlertCircle className="error-icon" />
              {errors.password}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="signup-confirm-password" className="sr-only">Confirmer le mot de passe</label>
          <div className="input-wrapper">
            <div className="input-icon" aria-hidden="true">
              <Lock className="icon" />
            </div>
            <input
              id="signup-confirm-password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Confirmer le mot de passe"
              disabled={loading}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              autoComplete="new-password"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''} ${loading ? 'input-disabled' : ''}`}
            />
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="error-message" role="alert">
              <AlertCircle className="error-icon" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          onClick={handleSignupSubmit}
          type="button"
          disabled={loading}
          className={`submit-button ${loading ? 'button-loading' : ''}`}
        >
          {loading ? (
            <>
              <Loader2 className="loading-spinner" />
              <span>Création...</span>
            </>
          ) : (
            'Créer un compte'
          )}
        </button>
      </div>

      <div className="divider" aria-hidden="true">
        <span className="divider-text"></span>
      </div>

      <div className="toggle-mode">
        Vous avez déjà un compte?{' '}
        <button type="button" onClick={onToggleMode} disabled={loading} className="toggle-button">
          Se connecter
        </button>
      </div>
    </>
  );
}

// Composant Principal
export default function FitAIAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="background-animation" aria-hidden="true">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="auth-card-wrapper">
        <main className="auth-card">
          <header className="auth-header">
            <div className="logo-container" aria-hidden="true">
              <Activity className="logo-icon" strokeWidth={2.5} />
            </div>
            <h1 className="auth-title">FitAI</h1>
            <p className="auth-subtitle">
              {isLogin ? 'Bienvenue!' : 'Commencez votre parcours fitness'}
            </p>
          </header>

          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <SignupForm onToggleMode={toggleMode} />
          )}
        </main>

        <footer className="auth-footer">
          En continuant, vous acceptez les Conditions d'utilisation et la Politique de confidentialité de FitAI
        </footer>
      </div>
    </div>
  );
}
