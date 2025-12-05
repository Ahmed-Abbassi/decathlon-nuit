// hooks/useAuth.js
import { useState } from "react";

export const useAuth = (isLogin) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const authenticate = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("Authenticating...");
      console.log("auth custom hook togged");
      console.log("formData:", formData);
      console.log("is login", isLogin);
      
      
      // Change l'URL selon que c'est login ou signup
      const url = isLogin ? "http://74.241.129.210:8000/login" : "http://74.241.129.210:8000/register";


      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      console.log("data : ", data);
      

      if (!res.ok) {
        
        throw new Error(data.message || (isLogin ? "Connexion échouée" : "Inscription échouée"));
      }
      
      setSuccess(true);

      // Si ton API renvoie un token (ex: JWT)
      if (data.token) {
        localStorage.setItem("token", data.token);
        
        
        
      }

      // Optionnel : rediriger après succès
      // window.location.href = "/dashboard";

    } catch (err) {
      setError(err.message || "Une erreur est survenue");
      
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { loading, error, success, authenticate, reset };
};