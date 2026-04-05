import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import { Helmet } from 'react-helmet-async';
import Hero from "../../components/Hero/Hero";
import Projects from "../../components/Projects/Projects";
import Skills from "../../components/Skills/Skills";
import Experience from "../../components/Experience/Experience";
const ProjectsData = [
  {
    id: 1,
    title: "Conversational AI Appointment Booking",
    tech: "React NestJS GRPC Sockets OpenAI",
    description: [
      "Engineered an end-to-end AI appointment booking system with real-time voice and text interaction capabilities",
      "Implemented a high-performance Conversation microservice using Socket.io and OpenAI's Assistant API with function calling",
      "Architected a robust GRPC-based backend for seamless multi-channel communication between distributed services",
      "Developed a responsive React frontend for user registration, indoor navigation, and intuitive booking flows",
    ],
    // image: "...", // Add if available
  },
  {
    id: 2,
    title: "CareLink (PDMS)",
    image:
      "https://github.com/Ashish-chanchal/pdms_college/assets/86229520/6deaf936-3c8c-4319-8c2d-c8a1430e0275",
    tech: "Dart Flutter Firebase GetX",
    description: [
      "Constructed an innovative patient-doctor connection app facilitating seamless appointment booking and digital prescription management",
      "Optimized user navigation pathways and content reachability using advanced heat mapping and UX visualization tools",
      "Implemented secure authentication and real-time database synchronization using Firebase and GetX architecture",
    ],
    link: "https://github.com/Ashish-chanchal/pdms_college",
  },
  {
    id: 3,
    title: "Parkinson Disease Detection",
    tech: "Python ML MNE EEG",
    description: [
      "Spearheaded comprehensive analysis of EEG data to uncover key patterns in brain activity for early disease detection",
      "Engineered and evaluated predictive models (Random Forest, Decision Tree) achieving up to 88.89% detection accuracy",
      "Utilized Python's MNE library for sophisticated signal processing and temporal feature extraction from complex neural data",
    ],
  },
];
const ExperienceData = [
  {
    id: 1,
    tech: "Studio Sonrai",
    title: "Software Developer | Sep 2025 – Present",
    description: [
      "Engineered a scalable expense management system using NestJS microservices and MSSQL, optimizing financial tracking for enterprise clients",
      "Architected and deployed automated inspection services and intelligent ticket assignment schedulers on Azure Cloud",
      "Streamlined deployment pipelines using Azure DevOps (YAML), achieving 100% automated CI/CD for cloud-native services",
      "Successfully migrated desktop management consoles to high-performance cross-platform mobile apps using Capacitor and Ionic",
    ],
  },
  {
    id: 2,
    tech: "Alphadroid / HeyAlpha",
    title: "Software Engineer | Oct 2024 – Sep 2025",
    description: [
      "Revolutionized voice AI interaction by implementing MultiModel Function Calling, reducing response latency from 15s to 3s",
      "Developed interactive 3D humanoid avatars using Three.js and WebGL, enhancing user engagement for AI-driven hotel services",
      "Built production-ready React Native applications with complex role-based UI rendering and real-time FCM notification systems",
      "Optimized enterprise state management architectures using Redux Toolkit and modernized legacy UIs with Material UI",
    ],
  },
];

const InternshipData = [
  {
    id: 3,
    tech: "Kloudidev Digital Solution",
    title: "React Engineer Intern | Oct 2023 – Jun 2024",
    description: [
      "Rapidly mastered Tailwind CSS and ShadcnUI to lead the visual redesign of the Tekshila AI landing page",
      "Recognized as 'Intern of the Month' for delivering high-impact UI enhancements and optimizing frontend load times",
      "Successfully launched production-ready websites for kloudidev.com and tekshila.ai",
    ],
  },
  {
    id: 4,
    tech: "INMAS, DRDO",
    title: "Research Intern | Aug 2023 – Oct 2023",
    description: [
      "Conducted advanced brain activity analysis using EEG datasets under the mentorship of DRDO senior scientists",
      "Engineered high-accuracy predictive models for Parkinson's disease using Random Forest and Decision Tree algorithms",
      "Leveraged Python's MNE library to process complex neural signals and extract diagnostic clinical features",
    ],
  },
  {
    id: 5,
    tech: "Robust Results (IITK Incubated)",
    title: "Full-stack Developer Intern",
    description: [
      "Spearheaded the development of a cross-functional web platform for E-Learners Technology using the LAMP stack",
      "Implemented responsive UI components and optimized MySQL database queries for better platform performance",
    ],
  },
];
const aboutData = [
  {
    id: 1,
    description: "I’m a Software Developer and AI Engineer obsessed with building high-performance systems. I specialize in crafting scalable backends and intelligent conversational AI experiences.",
  },
  {
    id: 2,
    description: "Whether it’s optimizing voice response latency or rendering 3D characters in the browser, I thrive at the intersection of technical precision and creative problem-solving.",
  },
];
// Define variants for animation
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

function HomePage({ setSelectedItem }: { setSelectedItem?: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div>
      <Helmet>
        <title>Ashish Chanchal</title>
        <meta name="description" content="Ashish Chanchal is a Software Developer and Community Manager based in Noida, Uttar Pradesh, India. He specializes in Frontend Development, Full-stack Development, Machine Learning, and Open Source. Explore Ashish Chanchal's portfolio of innovative projects, including web and mobile apps built with Dart, Flutter, React, Firebase, HTML, CSS, JavaScript, and more. Discover cutting-edge applications like CareLink, E-Learners, Movie Tickiter, and Rent-Up, each showcasing advanced development in user experience, seamless functionality, and modern design principles. Connect with Ashish Chanchal for software development, web design, and community management services. Reach out to Ashish Chanchal for collaborations, projects, and more." />
      </Helmet>
      {/* Apply scroll reveal to each section */}
      <ScrollReveal>
        <Hero />
      </ScrollReveal>
      <ScrollReveal>
        <Experience ExperienceData={ExperienceData} />
      </ScrollReveal>
      <ScrollReveal>
        <Experience ExperienceData={InternshipData} title="Internships" />
      </ScrollReveal>
      <ScrollReveal>
        <Projects ProjectsData={ProjectsData} heading="Projects" setSelectedItem={setSelectedItem} />
      </ScrollReveal>
      <ScrollReveal>
        <Skills showimg={true} />
      </ScrollReveal>
      <ScrollReveal>
        <About description={aboutData} />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>

    </div>
  );
}

export default HomePage;

