import Navbar from "./components/NavBar/NavBar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  

  return (
    <div className="bg-primary">
    
      <BrowserRouter>
      <Navbar />
      <Routes>
       <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
  
 
    </div>
  )
}

export default App
