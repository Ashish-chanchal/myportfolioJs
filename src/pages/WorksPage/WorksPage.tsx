import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import HeadingSec from "../../components/shared/HeadingSec";
import Projects from "../../components/Projects/Projects";


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
        "https://github-production-user-asset-6210df.s3.amazonaws.com/86229520/371506576-cd00474b-837c-401f-88d4-329d9fe3d56e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240928%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240928T093220Z&X-Amz-Expires=300&X-Amz-Signature=8d66060a1a6f38045c186a270193b268b970c8edcbfd51241ea68d89fe092525&X-Amz-SignedHeaders=host",
      description: [
        "Engineered an innovative React.js web application, 'Movie Tickiter, optimizing movie ticket booking and data storage capabilities",
        "It has enhanced user experience by seamlessly merging booking functionality with active content from the Movies Data API",
      ],
  
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
const WorksPage = () => {
  return (
    <div>   
      <ScrollReveal>
        <HeadingSec title="projects" description="List of my projects"/>
      </ScrollReveal>
      <ScrollReveal>
        <Projects heading="complete-webApps" ProjectsData={ProjectsData} />
      </ScrollReveal>
      <ScrollReveal>
        <Projects heading="small-projects" ProjectsData={ProjectsData} />
      </ScrollReveal>
    </div>
  )
}

export default WorksPage
