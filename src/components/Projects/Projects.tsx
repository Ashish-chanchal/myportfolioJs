import rectangle from "../../assets/common/rectangle.png";
import dots from "../../assets/common/dots.png";

import ProjectCard from "../shared/Card";
import Heading from "../shared/Heading";

import { motion } from "framer-motion";

const ProjectsData = [
  {
    id: 1,
    title: "CareLink",
    image:
      "https://private-user-images.githubusercontent.com/86229520/327551502-6deaf936-3c8c-4319-8c2d-c8a1430e0275.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjc0MzUyNjEsIm5iZiI6MTcyNzQzNDk2MSwicGF0aCI6Ii84NjIyOTUyMC8zMjc1NTE1MDItNmRlYWY5MzYtM2M4Yy00MzE5LThjMmQtYzhhMTQzMGUwMjc1LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI3VDExMDI0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZmNmJhODg4Yzk4YzU2MGRiNDlhNmQ4MDJlMGE1ZDFhYmQzY2IzODQ1NWYwYTcyOWRlNzRiYzA4MmQzYmI4NGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.36T4C5nIwGHVvDkvlaO5xcyZ6j-FJE4B0CXk4-17E_k",
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
      "https://private-user-images.githubusercontent.com/86229520/371506576-cd00474b-837c-401f-88d4-329d9fe3d56e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjc0MzU0MTAsIm5iZiI6MTcyNzQzNTExMCwicGF0aCI6Ii84NjIyOTUyMC8zNzE1MDY1NzYtY2QwMDQ3NGItODM3Yy00MDFmLTg4ZDQtMzI5ZDlmZTNkNTZlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI3VDExMDUxMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU4NDJmODc1MTU0OGZkZTMzMGJjZDM2YmVkYjJkYzlkMWQ3ZWQ1ZmU3MTdjM2IyYzc5NGIwNjg1YjM4NjllNTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.8tQrdn2LdHxjr3XjF19XOQBTYB5cNaFX9oixsLp1my8",
    description: [
      "Engineered an innovative React.js web application, 'Movie Tickiter, optimizing movie ticket booking and data storage capabilities",
      "It has enhanced user experience by seamlessly merging booking functionality with active content from the Movies Data API",
    ],

    livelink: "https://movieshowticket.netlify.app/",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Stagger the appearance of children (ProjectCards)
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const backgroundVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const Projects = () => {
  return (
    <motion.div
      className="text-4xl md:py-20 py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto p-4">
        <Heading text="Projects" btnText="View All ~~>" />

        {/* Project Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-10 mt-10 text-white"
          variants={containerVariants} // Apply staggered animation to the grid
        >
          {ProjectsData.map((data) => (
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              key={data.id}
            >
              <ProjectCard
              title={data.title}
                img={data.image}
                tech={data.tech}
                link={data.link}
                liveLink={data.livelink}
                description={data.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.img
        src={dots}
        alt=""
        className="md:block hidden absolute left-0 top-1/3"
        variants={backgroundVariants}
      />
      <motion.img
        src={rectangle}
        alt=""
        className="md:block hidden absolute right-0 top-1/2"
        variants={backgroundVariants}
      />
    </motion.div>
  );
};

export default Projects;
