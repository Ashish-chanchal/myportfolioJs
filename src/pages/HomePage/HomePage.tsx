import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/Hero/Hero';
import Experience from '../../components/Experience/Experience';
import Projects from '../../components/Projects/Projects';
import Skills from '../../components/Skills/Skills';
import About from '../../components/About/About';
import Contact from '../../components/Contact/Contact';
import JourneyHud from '../../components/shared/JourneyHud';
import todoaiImg from '../../assets/projects/todoai.png';
import sociantraImg from '../../assets/projects/sociantra.png';
import sixteenImg from '../../assets/projects/sixteenclothing.png';
import vibepulseImg from '../../assets/projects/vibepulse.png';

const FeaturedProjectsData = [
  {
    id: 0,
    title: 'TodoAI // Native MCP Workspace & Task Agent',
    image: todoaiImg,
    tech: 'Next.js · Model Context Protocol (MCP) · Gemini Flash · TypeScript · MongoDB',
    description: [
      'Engineered an autonomous task management workspace built on MCP, enabling external AI agents (Claude, Cursor) to query and execute tasks natively',
      'Implemented Gemini Cognition Core to extract tasks from conversational feeds and Slack commitment sentences (e.g. "I will fix the timeout before Friday")',
      'Architected Energy-Aware scheduling negotiation, conflict guards, dynamic webhooks, and live iCal (.ics) calendar synchronization',
    ],
    livelink: 'https://todoai.ashishchanchal.in/',
    category: 'AI Infrastructure & MCP',
  },
  {
    id: 1,
    title: 'Sociantra // AI Social AutoPilot',
    image: sociantraImg,
    tech: 'Next.js · React · AI Content Engine · TypeScript · Tailwind CSS',
    description: [
      'Engineered an autonomous LinkedIn brand automation engine generating high-signal posts, carousel decks, and scheduled cadences',
      'Built a strict Human-in-the-Loop approval gate allowing creators to review, edit, and fine-tune AI drafts before broadcasting',
      'Architected live post queuing, interactive Studio Engine, and multi-channel scheduling analytics',
    ],
    livelink: 'https://sociantra.ashishchanchal.in/',
    category: 'AI SaaS & Automation',
    team: {
      name: 'Ashwin',
      link: 'https://www.hi-ashwin.xyz/',
    },
  },
  {
    id: 2,
    title: 'Conversational AI Appointment Booking',
    tech: 'React · NestJS · gRPC · Sockets · OpenAI Assistant API',
    description: [
      'Engineered an end-to-end AI appointment booking system with real-time voice and text interaction capabilities',
      'Implemented high-performance conversation microservice using Socket.io and OpenAI Assistant API with function calling',
      'Architected a robust gRPC-based backend for seamless multi-channel communication between distributed services',
      'Developed responsive frontend for user registration, indoor navigation, and automated booking flows',
    ],
    category: 'AI & Microservices',
  },
  {
    id: 3,
    title: 'Parkinson Disease Detection',
    tech: 'Python · ML · MNE · EEG Signal Processing',
    description: [
      'Spearheaded comprehensive analysis of EEG data to uncover key patterns in brain activity for early disease detection',
      'Engineered predictive models (Random Forest, Decision Tree) achieving up to 88.89% detection accuracy',
      'Utilized Python MNE library for sophisticated signal processing and temporal feature extraction from complex neural data',
    ],
    link: 'https://github.com/Ashish-chanchal/Parkinson-Disease-Detection',
    category: 'Machine Learning',
  },
  {
    id: 4,
    title: 'Sixteen Clothing // E-Commerce Storefront',
    image: sixteenImg,
    tech: 'React · Tailwind CSS · Responsive Frontend · State Management',
    description: [
      'Engineered a modern apparel e-commerce storefront with multi-category browsing (Outerwear, Hoodies, Sweaters, Denim)',
      'Implemented dynamic product discovery, search modals, responsive wishlisting, and shopping cart drawers',
      'Crafted sleek dark-theme user experience with tactile interactions and mobile responsiveness',
    ],
    livelink: 'https://sixteenclothes.ashishchanchal.in/',
    category: 'Frontend & E-Commerce',
  },
  {
    id: 5,
    title: 'VibePulse // Web Audio Streamer',
    image: vibepulseImg,
    tech: 'React · Web Audio API · Tailwind CSS · Frontend State',
    description: [
      'Interactive music streaming web application featuring live track playback, custom progress scrubbing, and volume modulation',
      'Implemented dynamic playlist queuing, instant search/filtering across tracks & artists, and Daily Spotlight curation',
      'Built responsive dark-mode UI with smooth audio playback state handling',
    ],
    livelink: 'https://vibepluse.ashishchanchal.in/',
    category: 'Frontend & Web Audio',
  },
  {
    id: 6,
    title: 'CareLink (PDMS)',
    image:
      'https://github.com/Ashish-chanchal/pdms_college/assets/86229520/6deaf936-3c8c-4319-8c2d-c8a1430e0275',
    tech: 'Dart · Flutter · Firebase · GetX',
    description: [
      'Constructed an innovative patient-doctor connection app facilitating seamless appointment booking and digital prescription management',
      'Optimized user navigation pathways and content reachability using advanced UX visualization tools',
      'Implemented secure authentication and real-time database synchronization using Firebase and GetX architecture',
    ],
    link: 'https://github.com/Ashish-chanchal/pdms_college',
    category: 'Mobile & Cloud',
  },
  {
    id: 7,
    title: 'Rent-Up',
    tech: 'React · Material UI · REST API',
    image:
      'https://github.com/user-attachments/assets/cd972e1d-816f-4140-9a19-00a154eb16bc',
    description: [
      'Full-featured real estate portal with intelligent property filtering, subscription tiers, and responsive design',
      'Built reusable frontend UI components and structured state management for fast browsing',
    ],
    link: 'https://github.com/Ashish-chanchal/Rentup',
    livelink: 'https://rentup1702.netlify.app/',
    category: 'Full-Stack Web',
  },
];

const ExperienceData = [
  {
    id: 1,
    tech: 'Studio Sonrai',
    title: 'Software Developer | Sep 2025 – Present',
    description: [
      'Engineered a scalable expense management system using NestJS microservices and MSSQL, optimizing financial tracking for enterprise clients',
      'Architected and deployed automated inspection services and intelligent ticket assignment schedulers on Azure Cloud',
      'Streamlined deployment pipelines using Azure DevOps (YAML), achieving 100% automated CI/CD for cloud-native services',
      'Successfully migrated desktop management consoles to high-performance cross-platform mobile apps using Capacitor and Ionic',
    ],
  },
  {
    id: 2,
    tech: 'Alphadroid / HeyAlpha',
    title: 'Software Engineer | Oct 2024 – Sep 2025',
    description: [
      'Revolutionized voice AI interaction by implementing MultiModel Function Calling, reducing response latency from 15s to 3s',
      'Developed interactive 3D humanoid avatars using Three.js and WebGL, enhancing user engagement for AI-driven hotel services',
      'Built production-ready React Native applications with complex role-based UI rendering and real-time FCM notification systems',
      'Optimized enterprise state management architectures using Redux Toolkit and modernized legacy UIs with Material UI',
    ],
  },
];

const InternshipData = [
  {
    id: 3,
    tech: 'Kloudidev Digital Solution',
    title: 'React Engineer Intern | Oct 2023 – Jun 2024',
    description: [
      'Rapidly mastered Tailwind CSS and ShadcnUI to lead the visual redesign of the Tekshila AI landing page',
      'Recognized as "Intern of the Month" for delivering high-impact UI enhancements and optimizing frontend load times',
      'Successfully launched production-ready websites for kloudidev.com and tekshila.ai',
    ],
  },
  {
    id: 4,
    tech: 'INMAS, DRDO',
    title: 'Research Intern | Aug 2023 – Oct 2023',
    description: [
      'Conducted advanced brain activity analysis using EEG datasets under the mentorship of DRDO senior scientists',
      'Engineered high-accuracy predictive models for Parkinson’s disease using Random Forest and Decision Tree algorithms',
      'Leveraged Python’s MNE library to process complex neural signals and extract diagnostic clinical features',
    ],
  },
  {
    id: 5,
    tech: 'Robust Results (IITK Incubated)',
    title: 'Full-stack Developer Intern | Jun 2023 – Aug 2023',
    description: [
      'Spearheaded the development of a cross-functional web platform for E-Learners Technology using the LAMP stack',
      'Implemented responsive UI components and optimized MySQL database queries for better platform performance',
    ],
  },
];

const aboutData = [
  {
    id: 1,
    description:
      'I’m a Software Developer and AI Engineer obsessed with building high-throughput, low-latency systems. I specialize in crafting scalable microservice backends, intelligent conversational AI agents, and polished interactive frontends.',
  },
  {
    id: 2,
    description:
      'Whether it’s slashing voice response latency from 15s down to 3s, architecting cloud-native CI/CD pipelines on Azure, or rendering real-time 3D humanoid avatars in the browser with WebGL — I thrive at the intersection of architectural precision and product craft.',
  },
];

function HomePage({
  setSelectedItem,
}: {
  setSelectedItem?: React.Dispatch<React.SetStateAction<number>>;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Helmet>
        <title>Ashish Chanchal // The Developer Journey</title>
        <meta
          name="description"
          content="Explore the engineering journey of Ashish Chanchal: Software Developer and AI Systems Engineer. Discover production microservices, real-time voice AI, ML research at DRDO, and scalable cloud architectures."
        />
      </Helmet>

      {/* Floating Waypoint HUD tracker */}
      <JourneyHud />

      {/* Waypoint 00: Departure / Hero */}
      <Hero />

      {/* Waypoint 01: Expeditions (Experience & Internships) */}
      <Experience
        ExperienceData={ExperienceData}
        title="INDUSTRY EXPEDITIONS"
        waypointIndex="WAYPOINT_01"
      />

      <Experience
        ExperienceData={InternshipData}
        title="RESEARCH & INTERNSHIPS"
        waypointIndex="WAYPOINT_01.B"
      />

      {/* Waypoint 02: Artifacts & Inventions */}
      <Projects
        ProjectsData={FeaturedProjectsData}
        heading="FEATURED ARTIFACTS"
        setSelectedItem={setSelectedItem}
        waypointIndex="WAYPOINT_02"
      />

      {/* Waypoint 03: Tech Loadout & Capabilities */}
      <Skills waypointIndex="WAYPOINT_03" />

      {/* Waypoint 04: The Navigator's Chronicle */}
      <About
        description={aboutData}
        setSelectedItem={setSelectedItem}
        waypointIndex="WAYPOINT_04"
      />

      {/* Waypoint 05: Transmission Relay */}
      <Contact />
    </div>
  );
}

export default HomePage;
