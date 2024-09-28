import Navbar from "./components/navBar/NavBar"
import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import WorksPage from "./pages/WorksPage/WorksPage";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
function App() {
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top
  }, []);
  return (
    <div className="bg-primary">
    
      <BrowserRouter>
      <Navbar setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
      <Routes>
       <Route path="/" element={<HomePage setSelectedItem={setSelectedItem}/>} />
       <Route path="/works" element={<WorksPage />} />
       <Route path="/about-me" element={<AboutPage setSelectedItem={setSelectedItem}/>} />
       <Route path="/contact-me" element={<ContactPage/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
  
 
    </div>
  )
}

export default App
