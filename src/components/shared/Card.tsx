import { motion } from "framer-motion";

import Button from "./Button";

interface CardProps {
  img?: string;
  title?: string;
  description?: string;
  link?: string;
}

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};



const ProjectCard = ({ img , title = "Project Name", description = "Project Description", link = "/" }: CardProps) => {
  return (
    <motion.div
      className="flex flex-col border border-gray-500 w-fit h-fit "
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Image Section */}
      {img&&<div className="md:w-[380px] w-[280px] overflow-hidden">
        <img src={img} alt="Project" className="md:w-[380px] w-[280px] " />
      </div>}

      {/* Text Section */}
      <div className="">
        <h2 className="text-sm border-b p-2 border-gray-500">HTML CSS JavaScript</h2>
        <h2 className="text-lg p-2">{title}</h2>
        <p className="text-xs p-2">{description}</p>
      </div>

      {/* Button Section */}
      <div className="p-2">
        <Button text="View Project" link={link} />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
