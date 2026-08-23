import Navbar from "./components/navBar/NavBar";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorksPage from "./pages/WorksPage/WorksPage";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeTransitionOverlay from "./components/shared/ThemeTransitionOverlay";

function App() {
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <ThemeTransitionOverlay />
      <div className="bg-[#0a0a0a] min-h-screen text-white">
        <BrowserRouter>
          <Navbar setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
          <Routes>
            <Route path="/" element={<HomePage setSelectedItem={setSelectedItem} />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/about-me" element={<AboutPage setSelectedItem={setSelectedItem} />} />
            <Route path="/contact-me" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
