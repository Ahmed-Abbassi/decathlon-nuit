// components/ExerciceGuide.js
import React from "react";
import exercisesData from "../../json/sports_exercises.json";

const ExerciceGuide = ({ sport }) => {
  const sportKey = sport === "fitness" ? " " : sport;
  const sportData = exercisesData.sports[sportKey];

  if (!sportData) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #f0f2f5 0%, #e0e7ff 100%)" 
      }}>
        <p style={{
          fontSize: "2.5rem",
          fontWeight: "900",
          color: "#dc2626",
          background: "white",
          padding: "2rem 4rem",
          borderRadius: "2rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
        }}>
          Sport non trouvé : <span style={{ color: "#1f2937" }}>{sport}</span>
        </p>
      </div>
    );
  }

  const exercises = Object.keys(sportData)
    .filter(key => key !== "products" && sportData[key]?.checks)
    .map(key => ({ name: key, ...sportData[key] }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #ddd6fe 100%)",
      padding: "4rem 1rem",
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Titre principal */}
        <h1 style={{
          fontSize: "4rem",
          fontWeight: "900",
          textAlign: "center",
          marginBottom: "4rem",
          background: "linear-gradient(to right, #4f46e5, #7c3aed, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 10px 30px rgba(79, 70, 229, 0.3)"
        }}>
          Exercices de {sport.replace("_", " ").replace("gymnastyque", "Gymnastique")}
        </h1>

        {/* Grille de cartes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "2.5rem"
        }}>
          {exercises.map((exercise) => (
            <div
              key={exercise.name}
              style={{
                background: "white",
                borderRadius: "2rem",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid #e5e7eb",
                transform: "translateY(0)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px)";
                e.currentTarget.style.boxShadow = "0 32px 64px rgba(79, 70, 229, 0.2), 0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05)";
              }}
            >
              {/* Image + GIF au hover */}
              <a
                href={exercise.imgurl}
                target="_blank"
                rel="noopener noreferrer Supports"
                style={{ display: "block", position: "relative", height: "320px", overflow: "hidden" }}
              >
                {/* Image statique */}
                <img
                  src={exercise.imgurl}
                  alt={exercise.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "all 0.7s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                    e.currentTarget.style.filter = "brightness(0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x600/6366f1/ffffff?text=${exercise.name.toUpperCase()}`;
                  }}
                />

                {/* GIF au survol */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity 0.7s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                  <img
                    src={exercise.gifurl}
                    alt={`${exercise.name} animation`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Overlay nom + icône play */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "2rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4), transparent)",
                  color: "white"
                }}>
                  <h3 style={{
                    fontSize: "1.8rem",
                    fontWeight: "800",
                    textShadow: "0 4px 12px rgba(0,0,0,0.7)",
                    marginBottom: "0.5rem"
                  }}>
                    {exercise.name.replace(/_/g, " ")}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", opacity: 0.9 }}>
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5-7-5z" />
                    </svg>
                    <span>Survoler pour voir le mouvement</span>
                  </div>
                </div>
              </a>

              {/* Contenu texte */}
              <div style={{ padding: "1.8rem", background: "white" }}>
                <h4 style={{
                  fontSize: "1.35rem",
                  fontWeight: "700",
                  color: "#4f46e5",
                  marginBottom: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                }}>
                  <span style={{
                    width: "12px",
                    height: "12px",
                    background: "#6366f1",
                    borderRadius: "50%",
                    display: "inline-block"
                  }}></span>
                  Points de contrôle
                </h4>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {exercise.checks.map((check, idx) => (
                    <li key={idx} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{
                        flexShrink: 0,
                        width: "36px",
                        height: "36px",
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)"
                      }}>
                        {idx + 1}
                      </div>
                      <div>
                        <p style={{
                          fontWeight: "600",
                          color: "#1f2937",
                          margin: "0 0 0.25rem 0",
                          lineHeight: "1.4"
                        }}>
                          {check.description}
                        </p>
                        <p style={{
                          fontSize: "0.8rem",
                          color: "#6366f1",
                          fontWeight: "600",
                          margin: 0
                        }}>
                          Angle requis : {check.min}° → {check.max}°
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Matériel recommandé */}
        {sportData.products && Object.keys(sportData.products).length > 0 && (
          <div style={{
            marginTop: "6rem",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            borderRadius: "2.5rem",
            padding: "4rem",
            boxShadow: "0 25px 50px rgba(79, 70, 229, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.2)"
          }}>
            <h2 style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              textAlign: "center",
              marginBottom: "3rem",
              background: "linear-gradient(to right, #4f46e5, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Matériel recommandé
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem"
            }}>
              {Object.values(sportData.products).map((product, i) => (
                <a
                  key={i}
                  href={product.nameurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    background: "white",
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    transition: "all 0.4s ease",
                    border: "1px solid #e5e7eb"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px)";
                    e.currentTarget.style.boxShadow = "0 25px 50px rgba(99, 102, 241, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
                  }}
                >
                  <div style={{ height: "260px", overflow: "hidden" }}>
                    <img
                      src={product.imgurl}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                  <div style={{
                    padding: "1.5rem",
                    textAlign: "center",
                    background: "linear-gradient(to bottom, white, #f8fafc)"
                  }}>
                    <p style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "#1f2937",
                      transition: "color 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#6366f1"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#1f2937"}
                    >
                      {product.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciceGuide;