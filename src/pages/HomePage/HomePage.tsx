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
import cineverseImg from '../../assets/projects/cineverse.png';
import estypeshopImg from '../../assets/projects/estypeshop.png';
import sixteenImg from '../../assets/projects/sixteenclothing.png';
import vibepulseImg from '../../assets/projects/vibepulse.png';

const FeaturedProjectsData = [
  {
    id: 0,
    title: 'TodoAI // Native MCP Workspace & Task Agent',
    image: todoaiImg,
    tech: 'Next.js · Model Context Protocol (MCP) · Gemini Flash · TypeScript · MongoDB',
    description: [
      'Engineered an autonomous task management workspace built on Model Context Protocol (MCP), allowing external AI agents (Claude, Cursor) to inspect, create, and complete tasks natively',
      'Integrated Gemini Cognition Core to extract tasks from conversational chat feeds, emails, and Slack commitment sentences (e.g. "I will fix the timeout before Friday")',
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
      'Architected a robust gRPC-based backend for multi-channel communication between distributed services',
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
    title: 'CareLink (PDMS)',
    image:
      'https://github.com/Ashish-chanchal/pdms_college/assets/86229520/6deaf936-3c8c-4319-8c2d-c8a1430e0275',
    tech: 'Dart · Flutter · Firebase · GetX',
    description: [
      'Constructed a patient-doctor connection app facilitating seamless appointment booking and prescription management',
      'Optimized UX with advanced heat mapping and navigation pathways with reactive GetX architecture',
      'Integrated real-time database synchronization and push notifications via Firebase',
    ],
    link: 'https://github.com/Ashish-chanchal/pdms_college',
    category: 'Mobile & Cloud',
  },
  {
    id: 5,
    title: 'Rent-Up',
    tech: 'React · Material UI · REST API',
    image:
      'https://github.com/user-attachments/assets/cd972e1d-816f-4140-9a19-00a154eb16bc',
    description: [
      'Full-featured real estate portal with intelligent property filtering, pricing tiers, and responsive design',
      'Engineered reusable frontend UI components and structured state management for fast browsing',
    ],
    link: 'https://github.com/Ashish-chanchal/Rentup',
    livelink: 'https://rentup1702.netlify.app/',
    category: 'Full-Stack Web',
  },
  {
    id: 6,
    title: 'CineVerse // Cinema & Streaming Platform',
    image: cineverseImg,
    tech: 'React · Tailwind CSS · Movie Streaming UI · Responsive Frontend',
    description: [
      'Engineered a cinematic OTT movie streaming web application with dynamic hero showcases, video trailer previews, and metadata overlays',
      'Implemented multi-genre taxonomy filters (Action, Drama, Crime, Sci-Fi) and responsive carousel sorting for trending blockbusters',
      'Designed a sleek dark-mode cinema aesthetic with smooth modal transitions, search bars, and cross-device optimization',
    ],
    livelink: 'https://cineverse.ashishchanchal.in/',
    category: 'Frontend & Streaming',
  },
  {
    id: 7,
    title: 'ESTYPESHOP // Electronics E-Commerce',
    image: estypeshopImg,
    tech: 'React · Tailwind CSS · E-Commerce Frontend · State Management',
    description: [
      'Engineered a premium audio & electronics storefront featuring Beats Solo headphone spotlights and category carousels',
      'Implemented real-time shopping cart count state, item search bar, dynamic category routing, and dark-mode product showcase',
      'Crafted sleek high-contrast product cards with responsive layouts, fluid animations, and mobile-first navigation',
    ],
    livelink: 'https://estypeshop.ashishchanchal.in/',
    category: 'Frontend & E-Commerce',
  },
  {
    id: 8,
    title: 'Sixteen Clothing // E-Commerce Storefront',
    image: sixteenImg,
    tech: 'React · Tailwind CSS · Responsive Frontend · State Management',
    description: [
      'Modern apparel storefront featuring multi-category product catalog browsing (Outerwear, Hoodies, Denim)',
      'Engineered product search, category filtering, cart management, and interactive item showcase',
      'Responsive dark aesthetic with tactile buttons and fluid transitions',
    ],
    livelink: 'https://sixteenclothes.ashishchanchal.in/',
    category: 'Frontend & E-Commerce',
  },
  {
    id: 9,
    title: 'VibePulse // Web Audio Streamer',
    image: vibepulseImg,
    tech: 'React · Web Audio API · Tailwind CSS · Frontend State',
    description: [
      'Interactive music streaming web app with real-time track playback, audio scrubber, and playlist queue',
      'Instant search and tag filtering across multiple music genres and artists',
      'Clean playback controller with responsive volume modulation and timeline tracking',
    ],
    livelink: 'https://vibepluse.ashishchanchal.in/',
    category: 'Frontend & Web Audio',
  },
];

const ExperienceData = [
  {
    id: 1,
    tech: 'STUDIO SONRAI',
    title: 'SOFTWARE DEVELOPER | MAY 2025 – PRESENT',
    period: 'MAY 2025 – PRESENT',
    location: 'Noida, Uttar Pradesh, India',
    type: 'Industry' as const,
    description: [
      'Orchestrated backend architectures using NestJS microservices and gRPC, optimizing system throughput and fault tolerance',
      'Engineered automated cloud scheduler in Azure Functions to trigger asynchronous AI processing jobs during off-peak hours',
      'Designed and executed complete Azure DevOps YAML CI/CD pipelines, automating test validation and multi-environment deployments',
      'Developed and deployed cross-platform mobile apps for Android and iOS using Capacitor and Ionic',
    ],
    link: 'https://www.linkedin.com/company/studio-sonrai/',
  },
  {
    id: 2,
    tech: 'ALPHADROID / HEYALPHA',
    title: 'AI ENGINEER | NOV 2024 – MAY 2025',
    period: 'NOV 2024 – MAY 2025',
    location: 'Noida, Uttar Pradesh, India',
    type: 'Industry' as const,
    description: [
      'Slashed voice assistant interaction response latency from 15 seconds down to under 3 seconds using MultiModel Function Calling and streaming protocols',
      'Rendered 3D humanoid character models directly in web interfaces with Three.js and WebGL, syncing realistic facial audio lip-sync',
      'Implemented robust real-time bi-directional audio streaming pipelines with WebSockets and Node.js',
      'Integrated structured outputs and fallback models to guarantee deterministic responses in conversational flows',
    ],
    link: 'https://alphadroid.io/',
  },
  {
    id: 3,
    tech: 'INMAS, DRDO',
    title: 'RESEARCH INTERN | APR 2024 – AUG 2024',
    period: 'APR 2024 – AUG 2024',
    location: 'Delhi, India',
    type: 'Research' as const,
    description: [
      'Conducted clinical EEG signal analysis at Institute of Nuclear Medicine and Allied Sciences (DRDO) for early neurological disease detection',
      'Engineered machine learning models (Random Forest, Decision Tree) achieving up to 88.89% detection accuracy on neural datasets',
      'Utilized Python MNE library for sophisticated signal processing, filtering noise artifacts and extracting temporal EEG features',
    ],
    link: 'https://drdo.gov.in/drdo/labs-and-establishments/institute-nuclear-medicine-allied-sciences-inmas',
  },
];

const HomePage: React.FC<{
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setSelectedItem }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative">
      <Helmet>
        <title>Ashish Chanchal // Software Developer & AI Systems Engineer</title>
        <meta
          name="description"
          content="Portfolio of Ashish Chanchal: Software Developer and AI Systems Engineer specializing in Model Context Protocol (MCP), NestJS microservices, Real-time Voice AI, React, Flutter, and machine learning."
        />
      </Helmet>

      {/* Floating Coordinates Navigation HUD */}
      <JourneyHud />

      {/* Hero Section */}
      <Hero />

      {/* Experience Section */}
      <Experience
        ExperienceData={ExperienceData}
        title="EXPEDITIONS & MILESTONES"
        waypointIndex="WAYPOINT_01"
      />

      {/* Featured Projects Grid */}
      <Projects
        ProjectsData={FeaturedProjectsData}
        heading="FEATURED ARTIFACTS"
        setSelectedItem={setSelectedItem}
        waypointIndex="WAYPOINT_02"
        tag="// PRODUCTION BUILDS & SYSTEMS"
      />

      {/* Technical Arsenal Loadout */}
      <Skills waypointIndex="WAYPOINT_03" />

      {/* Story & Tenets */}
      <About setSelectedItem={setSelectedItem} waypointIndex="WAYPOINT_04" />

      {/* Contact Relay Section */}
      <Contact />
    </main>
  );
};

export default HomePage;
