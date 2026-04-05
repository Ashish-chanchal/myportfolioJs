import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import HeadingSec from "../../components/shared/HeadingSec";
import Projects from "../../components/Projects/Projects";

const ProjectsData = [
  {
    id: 1,
    title: "Parkinson Disease Detection",
    tech: "Python ML MNE EEG",
    description: [
      "Engineered predictive models using Random Forest and Decision Tree reaching 88.89% detection accuracy",
      "Processed high-density EEG data with Python's MNE library for signal denoising and feature extraction",
    ],
    link: "https://github.com/Ashish-chanchal/Parkinson-Disease-Detection",
  },
  {
    id: 2,
    title: "Words that Sparkle",
    tech: "React and FreeAPI",
    description: [
      "Vibrant motivational platform integrating real-time quotes via FreeAPI with optimized React state management",
    ],
    livelink: "https://quotes-sparkle.netlify.app/",
    link: "https://github.com/Ashish-chanchal/words-sparkle-react",
  },
  {
    id: 3,
    title: "Music Player",
    tech: "HTML CSS JavaScript",
    description: [
      "Feature-rich music player with dynamic progress tracking, volume control, and minimalist UI",
    ],
    link: "https://github.com/Ashish-chanchal/music_player",
    livelink: "https://ashish-chanchal.github.io/music_player/",
  },
  {
    id: 4,
    title: "Weather App",
    tech: "Flutter and OpenWeatherMap API",
    description: [
      "Location-aware weather forecasting application with real-time API integration and GetX state management",
    ],
    link: "https://github.com/Ashish-chanchal/weather_app",
  },
  {
    id: 5,
    title: "ChatBot",
    tech: "HTML CSS JavaScript",
    description: [
      "Rule-based intelligent assistant providing instant responses to common technical queries",
    ],
    link: "https://github.com/Ashish-chanchal/chatbot",
    livelink: "https://ashish-chanchal.github.io/chatbot/",
  },
];

const ProjectsCMPdata = [
  {
    id: 1,
    title: "Conversational AI Appointment Booking",
    tech: "React NestJS GRPC Sockets OpenAI",
    description: [
      "Engineered a production-ready AI appointment booking system with real-time voice and text interaction capabilities",
      "Architected a robust GRPC-based backend for multi-channel communication between distributed microservices",
      "Implemented intelligent conversation management using Socket.io and OpenAI's Assistant API with function calling",
    ],
  },
  {
    id: 2,
    title: "CareLink (PDMS)",
    image:
      "https://github.com/Ashish-chanchal/pdms_college/assets/86229520/6deaf936-3c8c-4319-8c2d-c8a1430e0275",
    tech: "Dart Flutter Firebase GetX",
    description: [
      "Innovative patient-doctor hub facilitating seamless appointment booking and digital prescription management",
      "Optimized UX with advanced heat mapping and secure authentication using the GetX architecture",
    ],
    link: "https://github.com/Ashish-chanchal/pdms_college",
  },
  {
    id: 3,
    title: "Rent-Up",
    tech: "React Material UI",
    image:
      "https://github.com/user-attachments/assets/cd972e1d-816f-4140-9a19-00a154eb16bc",
    description: [
      "Full-featured real estate portal with intelligent property filtering, subscription tiers, and responsive design",
    ],
    link: "https://github.com/Ashish-chanchal/Rentup",
    livelink: "https://rentup1702.netlify.app/",
  },
  {
    id: 4,
    title: "Movie Tickiter",
    tech: "HTML CSS JavaScript",
    image:
      "https://github.com/user-attachments/assets/cd00474b-837c-401f-88d4-329d9fe3d56e",
    description: [
      "Dynamic ticket booking application integrating live data from the Movies Data API with optimized state handling",
    ],
    link: "https://github.com/Ashish-chanchal/MovieTickiter",
    livelink: "https://movieshowticket.netlify.app/",
  },
];
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
    window.scrollTo(0, 0); // Scroll to the top
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
const WorksPage = () => {
  return (
    <div>
      <Helmet>
        <title>Works - Ashish Chanchal</title>
        <meta name="description" content="Explore a portfolio of innovative projects, including web and mobile apps built with Dart, Flutter, React, Firebase, HTML, CSS, JavaScript, and more. Discover cutting-edge applications like CareLink, E-Learners, Movie Tickiter, and Rent-Up, each showcasing advanced development in user experience, seamless functionality, and modern design principles. View live projects featuring e-commerce platforms, weather apps, music players, and chatbots." />
      </Helmet>
      <ScrollReveal>
        <HeadingSec title="projects" description="List of my projects" />
      </ScrollReveal>
      <ScrollReveal>
        <Projects heading="complete-webApps" ProjectsData={ProjectsCMPdata} />
      </ScrollReveal>
      <ScrollReveal>
        <Projects heading="small-projects" ProjectsData={ProjectsData} />
      </ScrollReveal>
    </div>
  );
};

export default WorksPage;
