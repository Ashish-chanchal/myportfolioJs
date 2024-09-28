import rectangle from "../../assets/common/rectangle.png";
import dots from "../../assets/common/dots.png";

import ProjectCard from "../shared/Card";
import Heading from "../shared/Heading";

import { motion } from "framer-motion";
import Button from "../shared/Button";
interface ProjectDataProps {
  id: number;
  title: string;
  image: string;
  tech: string;
  description: string[];
  link?: string;
  livelink?: string;
}[];


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

const Projects = ({ProjectsData,heading,setSelectedItem}:{ProjectsData:ProjectDataProps[],heading:string,setSelectedItem?: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <motion.div
      className="text-4xl md:py-20 py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between">
        <Heading text={heading}  />
        {setSelectedItem&&<Button text="View All ~~>" link="/works" setSelectedItem={setSelectedItem} id={1}/>}
        </div>

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
