import rectangle from "../../assets/common/rectangle.png";
import dots from "../../assets/common/dots.png";

import ProjectCard from "../shared/Card";
import Heading from "../shared/Heading";

import { motion } from "framer-motion";

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

const Experience = () => {
  return (
    <motion.div
      className="text-4xl md:py-20 py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto p-4">
        <Heading text="Experience" btnText="View All ~~>" />

        {/* Project Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-10 mt-10 text-white items-start"
          variants={containerVariants} // Apply staggered animation to the grid
        >
          {ExperienceData.map((data) => (
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              key={data.id}
            >
              <ProjectCard
                tech={data.tech}
                description={data.description}
                title={data.title}
                link={data.link}
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

export default Experience;
