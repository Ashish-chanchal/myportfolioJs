import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Projects from "../../components/Projects/Projects";
import Skills from "../../components/Skills/Skills";

function HomePage() {
  return (
    <div >
    <Hero/>
 <Projects/>
 <Skills/>
 <About/>
 <Contact/>
 <Footer/>
    </div>
  );
}

export default HomePage;
