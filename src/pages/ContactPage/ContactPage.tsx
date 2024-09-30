import React from 'react'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import HeadingSec from '../../components/shared/HeadingSec';
import Contact from '../../components/Contact/Contact';
import Socials from '../../components/Socials/Socials';
import { Helmet } from 'react-helmet-async';


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
const ContactPage = () => {
  return (
    <div>
      <Helmet>
        <title>Contact - Ashish Chanchal</title>
        <meta name="description" content="Contact Ashish Chanchal for software development, web design, and community management services. Connect with Ashish Chanchal on social media platforms like LinkedIn, Twitter, GitHub, and Instagram. Reach out to Ashish Chanchal for collaborations, projects, and more." />
      </Helmet>
      <ScrollReveal>
        <HeadingSec title="Contact" description="Let's Connect"/>
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
      <ScrollReveal>
        <Socials />
      </ScrollReveal>
      
    </div>
  )
}

export default ContactPage
