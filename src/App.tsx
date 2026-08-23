import Navbar from "./components/navBar/NavBar";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorksPage from "./pages/WorksPage/WorksPage";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Windows11Page from "./pages/Windows11Page/Windows11Page";
import MacOSPage from "./pages/MacOSPage/MacOSPage";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeTransitionOverlay from "./components/shared/ThemeTransitionOverlay";

function AppContent({ selectedItem, setSelectedItem }: { selectedItem: number; setSelectedItem: React.Dispatch<React.SetStateAction<number>> }) {
  const location = useLocation();
  const isOSMode = location.pathname === "/windows11" || location.pathname === "/macos";

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      {!isOSMode && <Navbar setSelectedItem={setSelectedItem} selectedItem={selectedItem} />}
      <Routes>
        <Route path="/" element={<HomePage setSelectedItem={setSelectedItem} />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/about-me" element={<AboutPage setSelectedItem={setSelectedItem} />} />
        <Route path="/contact-me" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/windows11" element={<Windows11Page />} />
        <Route path="/macos" element={<MacOSPage />} />
      </Routes>
      {!isOSMode && <Footer />}
    </div>
  );
}

function App() {
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <ThemeTransitionOverlay />
      <BrowserRouter>
        <AppContent selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

