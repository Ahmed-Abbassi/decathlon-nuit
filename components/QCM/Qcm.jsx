import { useState } from "react";
import "./Qcm.css";
import { Navigate, useNavigate } from "react-router-dom";
import ExerciceGuide from "../guide/ExerciceGuide";

export default function SportsProfileQCM() {
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: "",
    injuries: [],
    sport: "",
    rapport: ""
  });
  const [showResults, setShowResults] = useState(false);
const Navigate = useNavigate();
  const questions = [
    {
      id: "goal",
      question: "Quel est votre objectif principal ?",
      type: "single",
      options: [
        { value: "technique", label: "Améliorer ma technique", icon: "🎯", desc: "Perfectionnez vos mouvements" },
        { value: "prevention", label: "Prévenir les blessures", icon: "🛡️", desc: "Restez en sécurité" },
        { value: "performance", label: "Suivre mes performances", icon: "📊", desc: "Mesurez vos progrès" },
        { value: "perte_poids", label: "Perdre du poids / Fitness", icon: "🔥", desc: "Brûlez des calories" },
        { value: "mobilite", label: "Améliorer ma mobilité", icon: "🧘", desc: "Gagnez en flexibilité" },
        { value: "force", label: "Gagner en force / muscle", icon: "💪", desc: "Développez votre puissance" }
      ]
    },
    {
      id: "injuries",
      question: "Avez-vous des limitations physiques ?",
      type: "multiple",
      options: [
        { value: "aucune", label: "Aucune", icon: "✅", desc: "Prêt à tout donner" },
        { value: "genou", label: "Problèmes de genou", icon: "🦵", desc: "Douleurs articulaires" },
        { value: "dos", label: "Douleurs au dos", icon: "🏋️", desc: "Zone lombaire sensible" },
        { value: "epaule", label: "Problèmes d'épaule", icon: "🤸", desc: "Mobilité réduite" },
        { value: "cervicales", label: "Douleurs cervicales", icon: "🎾", desc: "Tensions au cou" }
      ]
    },
    {
      id: "sport",
      question: "Quel sport souhaitez-vous pratiquer ?",
      type: "single",
      options: [
        { value: "fitness", label: "Fitness", icon: "🏃", desc: "Cardio & renforcement" },
        { value: "golf", label: "Golf", icon: "⛳", desc: "Précision & technique" },
        { value: "gym", label: "Gym", icon: "🏋️", desc: "Force & masse" },
        { value: "gymnastique", label: "Gymnastique", icon: "🤸", desc: "Agilité & souplesse" },
        { value: "pilates", label: "Pilates", icon: "🧘‍♀️", desc: "Core & stabilité" },
        { value: "tennis", label: "Tennis", icon: "🎾", desc: "Coordination & vitesse" },
        { value: "yoga", label: "Yoga", icon: "🕉️", desc: "Zen & équilibre" }
      ]
    },
    {
      id: "rapport",
      question: "Souhaitez-vous recevoir un rapport après la séance ?",
      type: "single",
      options: [
        { value: "complet", label: "Oui, rapport complet", icon: "📋", desc: "Analyse détaillée" },
        { value: "resume", label: "Résumé simple", icon: "📝", desc: "Points essentiels" },
        { value: "aucun", label: "Aucun rapport", icon: "🚫", desc: "Juste l'entraînement" }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    const question = questions[currentStep];
    
    if (question.type === "multiple") {
      const currentValues = answers[questionId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setAnswers({ ...answers, [questionId]: newValues });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    const question = questions[currentStep];
    const answer = answers[question.id];
    
    if (question.type === "multiple") {
      return answer && answer.length > 0;
    }
    return answer && answer !== "";
  };

  const resetQCM = () => {
    setCurrentStep(0);
    setAnswers({
      goal: "",
      injuries: [],
      sport: "",
      rapport: ""
    });
    setShowResults(false);
  };

  const getGoalLabel = (value) => {
    const labels = {
      technique: "Améliorer ma technique",
      prevention: "Prévenir les blessures",
      performance: "Suivre mes performances",
      perte_poids: "Perdre du poids / Fitness",
      mobilite: "Améliorer ma mobilité",
      force: "Gagner en force"
    };
    return labels[value] || value;
  };

  const getSportLabel = (value) => {
    const labels = {
      fitness: "Fitness",
      golf: "Golf",
      gym: "Gym",
      gymnastique: "Gymnastique",
      pilates: "Pilates",
      tennis: "Tennis",
      yoga: "Yoga"
    };
    return labels[value] || value;
  };

  const getInjuriesLabels = (values) => {
    const labels = {
      aucune: "Aucune",
      genou: "Problèmes de genou",
      dos: "Douleurs au dos",
      epaule: "Problèmes d'épaule",
      cervicales: "Douleurs cervicales"
    };
    return values.map(v => labels[v] || v).join(", ");
  };

  const getRapportLabel = (value) => {
    const labels = {
      complet: "Rapport complet",
      resume: "Résumé simple",
      aucun: "Aucun rapport"
    };
    return labels[value] || value;
  };

  if (showResults) {
    return (
      <div className="qcm-fullpage">
        <div className="results-container">
          <div className="results-header">
            <div className="success-icon">✨</div>
            <h1>Votre Profil Sportif est Prêt !</h1>
            <p className="results-subtitle">Nous avons créé un programme adapté à vos besoins</p>
          </div>

          <div className="profile-cards">
            <div className="profile-card">
              <div className="card-icon">🎯</div>
              <h3>Objectif Principal</h3>
              <p>{getGoalLabel(answers.goal)}</p>
            </div>

            <div className="profile-card">
              <div className="card-icon">🏃</div>
              <h3>Sport Choisi</h3>
              <p>{getSportLabel(answers.sport)}</p>
            </div>

            <div className="profile-card">
              <div className="card-icon">🩺</div>
              <h3>Limitations</h3>
              <p>{getInjuriesLabels(answers.injuries)}</p>
            </div>

            <div className="profile-card">
              <div className="card-icon">📊</div>
              <h3>Type de Rapport</h3>
              <p>{getRapportLabel(answers.rapport)}</p>
            </div>
          </div>
          <ExerciceGuide sport={answers.sport} />
          <div className="results-actions">
            <button className="primary-btn" onClick={() => console.log("awnsors : ", answers)
            }>
              🚀 Commencer l'entraînement
            </button>
            <button className="secondary-btn" onClick={resetQCM}>
              🔄 Refaire le questionnaire
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progressPercentage = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="qcm-fullpage">
      <div className="qcm-wrapper">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="progress-text">
            {currentStep + 1} / {questions.length}
          </span>
        </div>

        {/* Question Card */}
        <div className="question-container">
          <div className="question-header">
            <span className="step-badge">Question {currentStep + 1}</span>
            <h1 className="question-title">{currentQuestion.question}</h1>
            {currentQuestion.type === "multiple" && (
              <p className="question-hint">Vous pouvez sélectionner plusieurs réponses</p>
            )}
          </div>

          <div className="options-container">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentQuestion.type === "multiple" 
                ? answers[currentQuestion.id]?.includes(option.value)
                : answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={index}
                  className={`option-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                >
                  <div className="option-icon">{option.icon}</div>
                  <div className="option-text">
                    <h3>{option.label}</h3>
                    <p>{option.desc}</p>
                  </div>
                  {isSelected && <div className="checkmark">✓</div>}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="navigation">
            {currentStep > 0 && (
              <button className="nav-btn back-btn" onClick={prevStep}>
                ← Précédent
              </button>
            )}
            <button 
              className={`nav-btn next-btn ${!canProceed() ? "disabled" : ""}`}
              onClick={nextStep}
              disabled={!canProceed()}
            >
              {currentStep === questions.length - 1 ? "Voir les résultats ✨" : "Suivant →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}