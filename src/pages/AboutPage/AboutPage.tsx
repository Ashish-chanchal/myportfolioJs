import React from 'react'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import HeadingSec from '../../components/shared/HeadingSec';
import About from '../../components/About/About';
import Skills from '../../components/Skills/Skills';
import FunFacts from '../../components/Funfacts/FunFacts';

const aboutData = [
    {
      id: 1,
      description: "I’m a self-taught Software developer based in Noida, Uttar Pradesh,India. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.",
    },
    {
      id: 2,
      description: "Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.",
    },
  ]

  const facts = [
    {
        id: 1,
        facts:"I like winter more than summer"
    },
    {
        id: 2,
        facts:"I often bike with my friends"
    },
    {
        id: 3,
        facts:"I like pizza and pasta"
    },
    {
        id: 4,
        facts:"My favorite movie is Dil Bechara"
    },
  ]
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  
  // Custom hook for adding scroll animations to each section
  const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true, // Only animate once when in view
      threshold: 0.1, // Trigger when 10% of the component is visible
    });
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
    useEffect(() => {
        window.scrollTo(0, 0);  // Scroll to the top
      }, []);
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >
        {children}
      </motion.div>
    );
  };
const AboutPage = ({setSelectedItem}:{setSelectedItem: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <div>
      <ScrollReveal>
        <HeadingSec title="about-me" description="Who i am"/>
      </ScrollReveal>
      <ScrollReveal>
        <About setSelectedItem={setSelectedItem} description={aboutData}/>
      </ScrollReveal>
      <ScrollReveal>
        <Skills showimg={false}/>
      </ScrollReveal>
      <ScrollReveal>
        <FunFacts facts={facts}/>
      </ScrollReveal>
    </div>
  )
}

export default AboutPage
