import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DiagnosisPage from "./pages/DiagnosisPage"
import ChatPage from "./pages/ChatPage"
import MedicalHistoryPage from "./pages/MedicalHistoryPage"
import SuggestionsPage from "./pages/SuggestionsPage"
import DoctorsPage from "./pages/DoctorsPage"
import AlertsPage from "./pages/AlertsPage"
import IntegrationsPage from "./pages/IntegrationsPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/history" element={<MedicalHistoryPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
      </Routes>
    </Router>
  )
}

export default App

