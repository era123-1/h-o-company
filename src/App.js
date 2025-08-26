import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";
import HomePage from "./pages/home/HomePage";
import Features from "./pages/home/Features";
import Dashboard from "./pages/home/Dashboard";
import Projects from "./pages/projects/Projects";
import CostCalculator from "./pages/projects/BuildCostPro";
import Materials from "./pages/projects/Materials";
import Calendar from "./pages/projects/Calendar";
import Payments from "./pages/projects/buildcostpro/Payments";
import Confirmation from "./pages/projects/buildcostpro/Confirmation";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Application from "./features/Applications/Application";
import ApplicationsList from "./features/Applications/ApplicationsList";
import Header from "./components/Header";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";
function App() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 3000,
        easing: "ease-in-out",
        once: true,
      });
    }
  }, []);
  return (
    <Router>
       <AuthProvider>
      <CookieConsent />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/buildcostpro" element={<CostCalculator />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/features" element={<Features />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/application" element={<Application />} />
          <Route path="/applications" element={<ApplicationsList />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
