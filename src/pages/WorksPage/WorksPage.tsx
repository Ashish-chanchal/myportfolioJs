import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import HeadingSec from "../../components/shared/HeadingSec";
import Projects from "../../components/Projects/Projects";

const ProjectsData = [
  {
    id: 1,
    title: "EStypeShop",
    tech: "React and TailwindCSS",

    description: [
      "EStypeShop is an e-commerce website built using React and TailwindCSS. It includes a home page, product page, and cart page.",
    ],
livelink:"https://e-stype-shop.vercel.app/",
    link: "https://github.com/Ashish-chanchal/EStypeShop",
  },
  {
    id: 2,
    title: "Basic Website for NGO",
    tech: "React ,Vite and TailwindCSS",

    description: [
      "I have created a basic website for an NGO using React, Vite, and TailwindCSS. The website is responsive and includes a home page, about page, and contact page.",
    ],
    liveLink:
      "https://forntedweb-k4jegxf2b-ashish-chanchals-projects.vercel.app/",
    link: "https://github.com/Ashish-chanchal/forntedweb",
  },
  {
    id: 3,
    title: "Weather App",
    tech: "Flutter and OpenWeatherMap API",

    description: [
      "Weather app using Flutter and OpenWeatherMap API. It is a simple app that allows users to check the weather in their location.",
    ],

    link: "https://github.com/Ashish-chanchal/weather_app",
  },
  {
    id: 4,
    title: "Words that Sparkle",

    tech: "React and FreeAPI",
    description: [
      "Cosntructed an innovative React.js web application, 'Words that Sparkle', optimizing user experience and content accessibility",
      "Enhanced user engagement by seamlessly integrating motivational quotes with active content from the Quotes API",
    ],
    livelink: "https://quotes-sparkle.netlify.app/",
    link: "https://github.com/Ashish-chanchal/words-sparkle-react",
  },
  {
    id: 5,
    title: "Music Player",
    tech: "HTML CSS JavaScript",

    description: [
      "This  is my favorite project. I have made a music player using HTML, CSS, and JavaScript. It is a simple music player that can play, pause, and skip songs.",
      "I have also added a feature to jump to a specific part of the song by clicking on the progress bar.",
    ],
    link: "https://github.com/Ashish-chanchal/music_player",
    livelink: "https://ashish-chanchal.github.io/music_player/",
  },
  {
    id: 6,

    title: "Text Utils",
    tech: "React",
    description: [
      "Developed a React.js web application, 'Text Utils', optimizing text editing and data storage capabilities",
    ],
    livelink: "https://txetutils-react.netlify.app/",
    link: "https://github.com/Ashish-chanchal/textutils",
  },

  {
    id: 7,
    title: "ChatBot",
    tech: "HTML CSS JavaScript",

    description: [
      "I have created a chatbot using HTML, CSS, and JavaScript. It is a simple chatbot that can answer basic questions and provide information on a variety of topics.",
    ],
    link: "https://github.com/Ashish-chanchal/chatbot",
    livelink: "https://ashish-chanchal.github.io/chatbot/",
  },
  {
    id: 8,
    title: "INR to USD Converter",
    tech: "Flutter",

    description: [
      "I have created a currency converter app using Flutter. It is a simple app that allows users to convert Indian Rupees to US Dollars.",
    ],
    link: "https://github.com/Ashish-chanchal/Currency_converter_flutter",
  },
  
  

];

const ProjectsCMPdata = [
  {
    id: 1,
    title: "CareLink",
    image:
      "https://github.com/Ashish-chanchal/pdms_college/assets/86229520/6deaf936-3c8c-4319-8c2d-c8a1430e0275",
    tech: "Dart Flutter Firebase GetX Firebase Auth FireStore",
    description: [
      "Constructed an innovative patient-doctor connection app utilizing Dart, Flutter, and Firebase technologies, enabling seamless appointment booking and prescription viewing functionalities",
      "Implemented user-friendly interfaces, enhancing navigation pathways and optimizing user experience. Leveraged heat mapping tools to refine user flow and content accessibility",
    ],
    link: "https://github.com/Ashish-chanchal/pdms_college",
  },
  {
    id: 2,
    image:
      "https://user-images.githubusercontent.com/86229520/191169870-a28f527b-2e61-49ae-b8af-a5c3a2c3527a.png",
    title: "E-Learners",
    tech: "HTML CSS JavaScript",
    description: [
      "Built Vibrant website functionalities by leveraging PHP and MySQL databases",
      "Created user-centric interfaces by streamlining navigation pathways. Employed visualization tools to optimize user navigation and ensure the reachability of content",
    ],
    link: "https://github.com/Ashish-chanchal/E-learners",
  },
  {
    id: 3,
    title: "Movie Tickiter",
    tech: "HTML CSS JavaScript",
    image:
      "https://github-production-user-asset-6210df.s3.amazonaws.com/86229520/371506576-cd00474b-837c-401f-88d4-329d9fe3d56e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240929%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240929T125252Z&X-Amz-Expires=300&X-Amz-Signature=c9b2f8e036c517461e4db047fafaecbcc8a7aefc8d3b289e500d054d52099f0a&X-Amz-SignedHeaders=host",
    description: [
      "Engineered an innovative React.js web application, 'Movie Tickiter, optimizing movie ticket booking and data storage capabilities",
      "It has enhanced user experience by seamlessly merging booking functionality with active content from the Movies Data API",
    ],

    livelink: "https://movieshowticket.netlify.app/",
  },
  {
    id: 4,
    title: "Rent-Up",
    tech: "React Material UI",
    image:
      "https://github-production-user-asset-6210df.s3.amazonaws.com/86229520/371856411-cd972e1d-816f-4140-9a19-00a154eb16bc.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240929%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240929T151720Z&X-Amz-Expires=300&X-Amz-Signature=5ef2ff795b8c1f2e86d3a2896d02eea0bd79ac93fc1e48dbb65caa654cdd415c&X-Amz-SignedHeaders=host",
    description: [
      "Home Page: Search for properties by city, street, or property type.",
      "About Page: Information about the company and mission.",
      "Services: List of services offered.",
      "Property Listings: View recent and featured property listings.",
      "Blog: Access real estate articles and news.",
      "Pricing: Various subscription packages for different user needs.",
      "Contact Page: Get in touch with the team.",
      "Newsletter Subscription: Users can subscribe to the newsletter for updates.",
    ],
    link: "https://github.com/Ashish-chanchal/Rentup",
    livelink: "https://rentup1702.netlify.app/",
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
