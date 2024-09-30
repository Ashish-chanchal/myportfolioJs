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
      "https://github.com/user-attachments/assets/cd00474b-837c-401f-88d4-329d9fe3d56e",
    description: [
      "Engineered an innovative React.js web application, 'Movie Tickiter, optimizing movie ticket booking and data storage capabilities",
      "It has enhanced user experience by seamlessly merging booking functionality with active content from the Movies Data API",
    ],

    livelink: "https://movieshowticket.netlify.app/",
  },
];
const ExperienceData = [
  {
    id: 1,

    tech: "Company Name: Inteleccess",
    title: "Designation: Frontend Developer",
    description: [
      "Spearheaded the complete redesign of Intelecess's website, leveraging cutting-edge technologies like React with Vite, TypeScript,Tailwind CSS, ShadCN UI, and Framer Motion",
      "Implemented modern UI designs that significantly improved the site's aesthetics and user experience. I build the whole website Check the link below",
    ],
    link: "https://www.inteleccess.com/",
  },
  {
    id: 2,

    tech: "Company Name: Kloudidev",
    title: "Designation: React Engineer Intern",
    description: [
      "Kloudidev Digital Solution Oct 2023 – Jun 2024 Acquired advanced proficiency in Tailwind CSS and Shadcnui frameworks , immediately implementing techniques to elevate a company website's design and functionality",
      "Recognized as the top-performing intern within the first month of tenure. Executed frontend enhancements for Teckshila AI, optimizing user interfaces with innovative solutions and streamlined experiences; Websites built by me are below",
    ],
    link: "https://www.kloudidev.com/",
  },
  {
    id: 3,

    tech: "Company Name: Institute of Nuclear Medicine & Allied Sciences (INMAS), DRDO",
    title: "Designation Research Internship",
    description: [
      "Completed a 10-week internship at INMAS, DRDO under G Scientist mentorship.",
      "Spearheaded a comprehensive analysis of EEG data to uncover key patterns in brain activity, resulting in the development of sophisticated predictive models for Parkinson's disease",
      "Developed and implemented sophisticated algorithms, including KNN, Random Forest, and Decision Tree, utilizing Python's MNElibrary to significantly enhance disease prediction accuracy based on EEG data",
    ],
  },
  {
    id: 4,

    tech: "Company Name: Robust Results PVT LTD",
    title: "Designation: Full-stack Developer Intern",
    description: [
      "Finished a 6-week internship as a Full Stack Developer at Robust Results Pvt Ltd, an IITK incubated company.",
      "Gained hands-on experience in HTML5, CSS3, JavaScript, Bootstrap, PHP, and MySQL during the internship",
      "Directed a cross-functional team to create an innovative web platform for E-Learners Technology, harnessing HTML, CSS, JavaScript, PHP, and MySQL",
    ],
  },
];
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
        <Experience ExperienceData={ExperienceData}/>
      </ScrollReveal>
      <ScrollReveal>
        <Projects ProjectsData={ProjectsData} heading="Projects" setSelectedItem={setSelectedItem}/>
      </ScrollReveal>
      <ScrollReveal>
        <Skills showimg={true}/>
      </ScrollReveal>
      <ScrollReveal>
        <About description={aboutData}/>
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
      
    </div>
  );
}

export default HomePage;

