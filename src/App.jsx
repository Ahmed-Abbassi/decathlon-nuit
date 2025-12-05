import Home from '../pages/home/Home.jsx'
import VideoRecorderPage from '../pages/videoRecorder/VideoRecorderPage.jsx'
import Qcm from '../components/QCM/Qcm.jsx'
import FitAIAuth from '../pages/FitAIAuth/FitAIAuth.jsx'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute.jsx'; 
function App() {

  return (
    <>
        <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/aivideo"
          element={
            <ProtectedRoute>
              <VideoRecorderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qcm"
          element={
            <ProtectedRoute>
              <Qcm />
            </ProtectedRoute>
          }
        />

        {/* PUBLIC ROUTE */}
        <Route path="/auth" element={<FitAIAuth />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

