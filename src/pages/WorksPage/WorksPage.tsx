import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeadingSec from '../../components/shared/HeadingSec';
import ProjectCard from '../../components/shared/Card';
import todoaiImg from '../../assets/projects/todoai.png';
import sociantraImg from '../../assets/projects/sociantra.png';
import vibepulseImg from '../../assets/projects/vibepulse.png';
import sixteenImg from '../../assets/projects/sixteenclothing.png';

const AllProjects = [
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
    type: 'ai',
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
    type: 'ai',
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
      'Developed responsive React frontend for user registration, indoor navigation, and automated booking flows',
    ],
    category: 'AI & Microservices',
    type: 'ai',
  },
  {
    id: 3,
    title: 'Parkinson Disease Detection',
    tech: 'Python · ML · MNE · EEG Signal Analysis',
    description: [
      'Spearheaded comprehensive analysis of EEG data to uncover key patterns in brain activity for early disease detection',
      'Engineered and evaluated predictive models (Random Forest, Decision Tree) achieving up to 88.89% detection accuracy',
      'Utilized Python MNE library for sophisticated signal processing and temporal feature extraction from complex neural data',
    ],
    link: 'https://github.com/Ashish-chanchal/Parkinson-Disease-Detection',
    category: 'Machine Learning',
    type: 'ai',
  },
  {
    id: 4,
    title: 'CareLink (PDMS)',
    image:
      'https://github.com/Ashish-chanchal/pdms_college/assets/86229520/6deaf936-3c8c-4319-8c2d-c8a1430e0275',
    tech: 'Dart · Flutter · Firebase · GetX',
    description: [
      'Constructed an innovative patient-doctor connection app facilitating seamless appointment booking and digital prescription management',
      'Optimized UX with advanced heat mapping, navigation pathways, and GetX reactive architecture',
      'Implemented secure authentication and real-time database synchronization using Firebase',
    ],
    link: 'https://github.com/Ashish-chanchal/pdms_college',
    category: 'Mobile & Cloud',
    type: 'mobile',
  },
  {
    id: 5,
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
    type: 'web',
  },
  {
    id: 6,
    title: 'Sixteen Clothing // E-Commerce Storefront',
    image: sixteenImg,
    tech: 'React · Tailwind CSS · Responsive Frontend · State Management',
    description: [
      'Engineered a modern, high-performance apparel e-commerce storefront with multi-category browsing (Outerwear, Hoodies, Denim)',
      'Implemented product search, filtering mechanisms, wishlist toggling, and shopping cart drawers',
      'Crafted sleek dark-theme user experience with tactile interactions and mobile responsiveness',
    ],
    livelink: 'https://sixteenclothes.ashishchanchal.in/',
    category: 'Frontend & E-Commerce',
    type: 'web',
  },
  {
    id: 7,
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
    type: 'web',
  },
  {
    id: 8,
    title: 'Movie Tickiter',
    tech: 'HTML · CSS · JavaScript · Movie Data API',
    image:
      'https://github.com/user-attachments/assets/cd00474b-837c-401f-88d4-329d9fe3d56e',
    description: [
      'Dynamic ticket booking application integrating live data from the Movies Data API with optimized state handling',
      'Implemented real-time seat selection and interactive checkout simulation',
    ],
    link: 'https://github.com/Ashish-chanchal/MovieTickiter',
    livelink: 'https://movieshowticket.netlify.app/',
    category: 'Web App',
    type: 'web',
  },
  {
    id: 9,
    title: 'Words that Sparkle',
    tech: 'React · FreeAPI · Tailwind CSS',
    description: [
      'Vibrant motivational quote platform integrating real-time quotes via FreeAPI with optimized React state management',
      'Created custom shareable cards and responsive daily wisdom generator',
    ],
    link: 'https://github.com/Ashish-chanchal/words-sparkle-react',
    livelink: 'https://quotes-sparkle.netlify.app/',
    category: 'Web App',
    type: 'web',
  },
  {
    id: 10,
    title: 'Weather App',
    tech: 'Flutter · OpenWeatherMap API · GetX',
    description: [
      'Location-aware weather forecasting mobile application with real-time API integration and GetX state management',
      'Displays 7-day predictive forecasts, humidity metrics, and wind vectors',
    ],
    link: 'https://github.com/Ashish-chanchal/weather_app',
    category: 'Mobile App',
    type: 'mobile',
  },
  {
    id: 11,
    title: 'Rule-Based ChatBot',
    tech: 'HTML · CSS · JavaScript Engine',
    description: [
      'Intelligent assistant providing instant responses to common technical queries and customer onboarding',
      'Engineered fuzzy pattern matching for intent recognition and custom reply generation',
    ],
    link: 'https://github.com/Ashish-chanchal/chatbot',
    livelink: 'https://ashish-chanchal.github.io/chatbot/',
    category: 'AI Assistant',
    type: 'ai',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'ALL ARTIFACTS' },
  { id: 'ai', label: 'AI & MACHINE LEARNING' },
  { id: 'web', label: 'FRONTEND & WEB APPS' },
  { id: 'mobile', label: 'MOBILE & FLUTTER' },
];

const WorksPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = AllProjects.filter((project) => {
    const matchesFilter = selectedFilter === 'all' || project.type === selectedFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-20">
      <Helmet>
        <title>Works Archive // Ashish Chanchal</title>
        <meta
          name="description"
          content="Complete repository of software engineering artifacts: Model Context Protocol (MCP) agents, Conversational AI, Flutter apps, Full-stack platforms, Machine Learning models, and Web tools built by Ashish Chanchal."
        />
      </Helmet>

      {/* Header Banner */}
      <HeadingSec
        title="ARTIFACTS_ARCHIVE"
        description="Comprehensive manifest of production applications, distributed microservices, AI pipelines, and open-source experiments."
        waypoint="LOGBOOK // WAYPOINT_02_DEEP_ARCHIVE"
      />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* Filter and Search Controls Bar */}
        <div className="bg-[#121212] border-2 border-white p-4 shadow-brutal mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`font-mono text-xs font-bold px-3 py-1.5 border-2 transition-all brutal-btn ${
                  selectedFilter === cat.id
                    ? 'bg-accent text-black border-black shadow-[2px_2px_0px_0px_#ffffff]'
                    : 'bg-[#181818] text-white border-[#333333] hover:border-white hover:bg-[#202020]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH BY TECH OR TITLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0a0a0a] border-2 border-white text-white font-mono text-xs px-3 py-2 w-full md:w-64 focus:outline-none focus:border-accent placeholder:text-[#555555]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs font-mono text-[#888888] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between font-mono text-xs text-[#888888] mb-6 pb-2 border-b border-[#262626]">
          <span>SHOWING {filteredProjects.length} OF {AllProjects.length} ARTIFACTS</span>
          <span className="text-accent font-bold">SYSTEM_QUERY: OK</span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                img={project.image}
                tech={project.tech}
                link={project.link}
                liveLink={project.livelink}
                description={project.description}
                categoryBadge={project.category}
                team={project.team}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#121212] border-2 border-white p-8 text-center shadow-brutal my-8">
            <div className="font-mono text-sm text-accent font-bold uppercase mb-2">
              NO MATCHING ARTIFACTS FOUND
            </div>
            <p className="font-mono text-xs text-[#888888]">
              Try adjusting your search query or switching category filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksPage;
