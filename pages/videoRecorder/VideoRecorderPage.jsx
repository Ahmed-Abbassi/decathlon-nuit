import { useState, useRef } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function VideoRecorderPage() {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isCamerDemarrer, setIsCamerDemarrer] = useState(false);
  const wsRef = useRef(null);
  const [isFormStep, setIsFormStep] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sport: "fitness",
    exercice: "squat",
  });
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [previewType, setPreviewType] = useState("");
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [livedata, setLivedata] = useState();
const navigate = useNavigate();
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setIsCamerDemarrer(true);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Cannot access camera. Check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCamerDemarrer(false);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setPreviewType("video");
      setShowPopup(true);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    setRecording(false);

    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const saveVideo = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `recording_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.webm`;
    a.click();
    setShowPopup(false);
  };

const sendFrameHttp = async (blob) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const formDataToSend = new FormData();
  formDataToSend.append("file", blob, "frame.jpg");       // <-- Correct field name
  formDataToSend.append("sport", formData.sport);
  formDataToSend.append("exercise", formData.exercice);
  formDataToSend.append("session_id", "live_" + Date.now()); // <-- Required

  try {
    const res = await fetch("http://74.241.129.210:8000/process_realtime", {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}` 
        // ❗ DO NOT add Content-Type → browser sets multipart boundary itself
      },
      body: formDataToSend,
    });

    if (res.ok) {
      console.log("Frame sent");
      const data = await res.json();
      setLivedata({...data});
      console.log("AI Response:", data);
    } else {
      console.log("Error:", await res.text());
    }
  } catch (err) {
    console.error("Error sending frame:", err);
  }
};


const canvasRef = useRef(null);

let frameInterval = null;

const startLiveRecording = () => {
  if (!videoRef.current) return;

  setRecording(true);

  // create canvas if not exists
  if (!canvasRef.current) {
    canvasRef.current = document.createElement("canvas");
  }

  const canvas = canvasRef.current;
  const video = videoRef.current;

  // set same size as video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // send 1 frame per second
  frameInterval = setInterval(() => {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) sendFrameHttp(blob);
      },
      "image/jpeg",
      0.8 // quality
    );
  }, 1000);
};



  const sendToAI = async () => {
    if (!chunksRef.current.length) return;

    const token = localStorage.getItem("token");
    
    if (!token) {
      console.error("No token found in localStorage");
      alert("You are not authenticated. Please log in first.");
      setShowPopup(false);
      return;
    }

    console.log("Sending recorded video with token:", token.substring(0, 20) + "...");

    const blob = new Blob(chunksRef.current, { type: "video/webm" });

    const videoFormData = new FormData();
    videoFormData.append("file", blob, "recorded_video.webm");
    videoFormData.append("sport", formData.sport);
    videoFormData.append("exercice", formData.exercice);
    videoFormData.append("return_annotated", "false");
    videoFormData.append("return_frame_data", "true");

    try {
      const response = await fetch("http://74.241.129.210:8000/process_video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: videoFormData,
      });

      console.log("Recorded video response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Video processing result:", result);
        setApiResponse(result);
        alert("Video successfully submitted for processing.");
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error("Full error:", err);
      alert(`Failed to send video: ${err.message}`);
    }

    setShowPopup(false);
  };

  const uploadFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setUploadedPreviewUrl(url);
    
    if (file.type.startsWith('image/')) {
      setPreviewType("image");
      sendUploadedImageToAI(file);
    } else if (file.type.startsWith('video/')) {
      setPreviewType("video");
      sendUploadedVideoToAI(file);
    }
    
    setShowUploadPopup(true);
  };

  const sendUploadedImageToAI = async (file) => {
    if (!file) return;

    const token = localStorage.getItem("token");
    
    if (!token) {
      console.error("No token found in localStorage");
      alert("You are not authenticated. Please log in first.");
      return;
    }

    console.log("Token found:", token.substring(0, 20) + "...");

    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("sport", formData.sport);
    imageFormData.append("exercise", formData.exercice);

    try {
      const response = await fetch("http://74.241.129.210:8000/process_image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: imageFormData,
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Image processing result:", result);
        setApiResponse(result);
        alert("Image submitted to AI successfully.");
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error("Full error:", err);
      alert(`Failed to send image: ${err.message}`);
    }
  };

  const sendUploadedVideoToAI = async (file) => {
    if (!file) return;

    const token = localStorage.getItem("token");
    
    if (!token) {
      console.error("No token found in localStorage");
      alert("You are not authenticated. Please log in first.");
      return;
    }

    console.log("Sending video with token:", token.substring(0, 20) + "...");

    const videoFormData = new FormData();
    videoFormData.append("file", file);
    videoFormData.append("sport", formData.sport);
    videoFormData.append("exercise", formData.exercice);
    videoFormData.append("return_annotated", "false");
    videoFormData.append("return_frame_data", "true");

    try {
      const response = await fetch("http://74.241.129.210:8000/process_video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: videoFormData,
      });

      console.log("Video response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Video processing result:", result);
        setApiResponse(result);
        alert("Video submitted to AI successfully.");
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error("Full error:", err);
      alert(`Failed to send video: ${err.message}`);
    }
  };

  const goBack = () => {
    navigate("/qcm");
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <button onClick={goBack} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: "3px",
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        padding: "2px",
        paddingRight: "10px",
        paddingLeft: "10px"
      }}>
        <ArrowLeft size={22} />
        Retour
      </button>

      <div onClick={() => setIsDarkMode(!isDarkMode)} style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        width: '60px',
        height: '30px',
        backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
        borderRadius: '15px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px'
      }}>
        <div style={{
          width: '22px',
          height: '22px',
          backgroundColor: isDarkMode ? '#60a5fa' : '#fbbf24',
          borderRadius: '50%',
          transform: isDarkMode ? 'translateX(30px)' : 'translateX(0)',
          transition: 'transform 0.3s ease'
        }}></div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '2rem',
        marginTop: '4rem'
      }}>
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <h1 style={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', marginBottom: '0.5rem' }}>
              Studio d'Enregistrement Vidéo
            </h1>
            {recording && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }} />
                Enregistrement en cours
              </div>
            )}
          </div>

          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '600px',
                objectFit: 'cover',
                display: stream ? 'block' : 'none'
              }}
            />
            {!stream && (
              <div style={{
                width: '100%',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkMode ? '#94a3b8' : '#64748b'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📷</div>
                <p>Démarrer la caméra pour commencer</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>
              Importer une image
            </h3>
            <label style={{
              display: 'block',
              padding: '2rem',
              border: `2px dashed ${isDarkMode ? '#475569' : '#cbd5e1'}`,
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              color: isDarkMode ? '#94a3b8' : '#64748b'
            }}>
              <div>Cliquez ou sélectionnez une image</div>
              <input type="file" accept="image/*" onChange={uploadFile} style={{ display: 'none' }} />
            </label>
          </div>

          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: isDarkMode ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>
              Importer une vidéo
            </h3>
            <label style={{
              display: 'block',
              padding: '2rem',
              border: `2px dashed ${isDarkMode ? '#475569' : '#cbd5e1'}`,
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              color: isDarkMode ? '#94a3b8' : '#64748b'
            }}>
              <div>Cliquez ou sélectionnez une vidéo</div>
              <input type="file" accept="video/*" onChange={uploadFile} style={{ display: 'none' }} />
            </label>
          </div>

          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {!isCamerDemarrer ? (
              <button onClick={startCamera} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}>
                <span>Démarrer la caméra</span>
              </button>
            ) : (
              <button onClick={stopCamera} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}>
                <span>Éteindre la caméra</span>
              </button>
            )}

            {!recording ? (
              <button onClick={startRecording} disabled={!stream} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: stream ? '#ef4444' : '#94a3b8',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: stream ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s'
              }}>
                <span>Commencer l'enregistrement</span>
              </button>
            ) : (
              <button onClick={stopRecording} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#64748b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}>
                <span>Arrêter l'enregistrement</span>
              </button>
            )}

            <button onClick={startLiveRecording} disabled={!stream} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: stream ? '#8b5cf6' : '#94a3b8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: stream ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s'
            }}>
              <span>Enregistrement en direct</span>
            </button>
          </div>
        </div>
      </div>
      




<div style={{ padding: "20px" }}>
  <h3 style={{
    color: isDarkMode ? '#f1f5f9' : '#1e293b',
    marginBottom: '1rem',
    fontSize: '1.125rem'
  }}>
    Analyse en Direct
  </h3>
  
  {/* Display live data if it exists */}
  {livedata && livedata.status === "success" && (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{
          backgroundColor: livedata.data?.is_correct ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          {livedata.data?.is_correct ? '✓ Correct' : '✗ À améliorer'}
        </span>
        <span style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: isDarkMode ? '#f1f5f9' : '#1e293b',
          marginLeft: '1rem'
        }}>
          {livedata.data?.feedback}
        </span>
      </div>
      
      <img
        src={`data:image/jpeg;base64,${livedata.data.annotated_image}`}
        alt="Annotated Live"
        style={{ 
          maxWidth: "100%", 
          border: "2px solid #ccc", 
          borderRadius: "8px" 
        }}
      />
      
      {livedata.data?.metrics && (
        <div style={{ marginTop: '1rem', textAlign: 'left' }}>
          <h4 style={{ color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
            Métriques en temps réel
          </h4>
          {Object.entries(livedata.data.metrics).map(([key, value]) => (
            <div key={key} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem',
              backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                {key.replace(/_/g, ' ')}:
              </span>
              <span style={{ 
                fontWeight: 'bold', 
                color: isDarkMode ? '#f1f5f9' : '#1e293b' 
              }}>
                {typeof value === 'number' ? value.toFixed(2) : value}°
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
  
  {!livedata && (
    <p style={{ 
      color: isDarkMode ? '#94a3b8' : '#64748b',
      textAlign: 'center',
      marginTop: '1rem'
    }}>
      Démarrez l'enregistrement en direct pour voir l'analyse...
    </p>
  )}
</div>

      {/* API Response Display */}
      {apiResponse && (
        <div style={{
          maxWidth: '1400px',
          margin: '2rem auto',
          padding: '0 1rem'
        }}>
          <h2 style={{ 
            color: isDarkMode ? '#f1f5f9' : '#1e293b', 
            marginBottom: '1.5rem', 
            fontSize: '1.5rem' 
          }}>
            Résultat de l'Analyse
          </h2>
          
          <div style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <span style={{
                backgroundColor: apiResponse.data?.is_correct ? '#10b981' : '#ef4444',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {apiResponse.data?.is_correct ? '✓ Correct' : '✗ À améliorer'}
              </span>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: isDarkMode ? '#f1f5f9' : '#1e293b'
              }}>
                {apiResponse.data?.feedback}
              </span>
            </div>

            {apiResponse.data?.metrics && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>
                <h3 style={{
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  marginBottom: '1rem',
                  fontSize: '1.125rem'
                }}>
                  Métriques
                </h3>
                {Object.entries(apiResponse.data.metrics).map(([key, value]) => (
                  <div key={key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.75rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    borderRadius: '8px',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontWeight: '600',
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      textTransform: 'capitalize',
                      flex: '1'
                    }}>
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span style={{
                      fontWeight: 'bold',
                      color: isDarkMode ? '#f1f5f9' : '#1e293b',
                      fontSize: '1.125rem'
                    }}>
                      {typeof value === 'number' ? value.toFixed(2) : value}°
                    </span>
                    <span style={{
                      color: apiResponse.data.flags?.[key] ? '#10b981' : '#ef4444',
                      fontSize: '1.25rem',
                      fontWeight: 'bold'
                    }}>
                      {apiResponse.data.flags?.[key] ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {apiResponse.data?.ranges && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>
                <h3 style={{
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  marginBottom: '1rem',
                  fontSize: '1.125rem'
                }}>
                  Plages Recommandées
                </h3>
                {Object.entries(apiResponse.data.ranges).map(([key, range]) => (
                  <div key={key} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    borderRadius: '8px',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{
                        fontWeight: '600',
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                        textTransform: 'capitalize'
                      }}>
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span style={{
                        fontWeight: 'bold',
                        color: isDarkMode ? '#f1f5f9' : '#1e293b',
                        fontSize: '1.125rem'
                      }}>
                        {range.min}° - {range.max}°
                      </span>
                    </div>
                    <p style={{
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      fontSize: '0.875rem',
                      margin: '0'
                    }}>
                      {range.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {apiResponse.data?.ai_advice && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>
                <h3 style={{
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  marginBottom: '1rem',
                  fontSize: '1.125rem'
                }}>
                  Conseils de l'IA
                </h3>
                <p style={{
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {apiResponse.data.ai_advice}
                </p>
              </div>
            )}

            {apiResponse.data?.summary && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>
                <h3 style={{
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  marginBottom: '1rem',
                  fontSize: '1.125rem'
                }}>
                  Résumé Vidéo
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Répétitions Totales
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#10b981'
                    }}>
                      {apiResponse.data.summary.total_reps}
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '1rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Répétitions Incorrectes
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#ef4444'
                    }}>
                      {apiResponse.data.summary.incorrect_reps}
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '1rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Durée (secondes)
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#3b82f6'
                    }}>
                      {apiResponse.data.summary.duration_seconds.toFixed(1)}s
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '1rem',
                    backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      marginBottom: '0.25rem'
                    }}>
                      Images Traitées
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#8b5cf6'
                    }}>
                      {apiResponse.data.summary.frames_processed} / {apiResponse.data.summary.total_frames}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {apiResponse.data?.frame_results && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>

              </div>
            )}

            {apiResponse.data?.annotated_image && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
              }}>
                <h3 style={{
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  marginBottom: '1rem',
                  fontSize: '1.125rem'
                }}>
                  Image Annotée
                </h3>
                <img 
                  src={`data:image/jpeg;base64,${apiResponse.data.annotated_image}`}
                  alt="Annotated" 
                  style={{
                    maxWidth: '100%',
                    borderRadius: '8px',
                    border: `2px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    marginTop: '1rem'
                  }}
                />
              </div>
            )}
          </div>


           <div style={{ padding: "20px" }}>
      

      
    </div>
        </div>
      )}
    </div>
  );
}