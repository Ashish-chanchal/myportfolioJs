import { motion } from "framer-motion";

import Button from "./Button";

interface CardProps {
  id?: number;
  img?: string;
  tech?: string;
  title?: string;
  description?: string[];
  link?: string;
  liveLink?: string;
}

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};



const ProjectCard = ({ img , title = "Project Name",tech, description = ["Project Description"], link ,liveLink }: CardProps) => {
  return (
    <motion.div
      className="flex flex-col border border-gray-500 w-fit h-fit relative z-50  bg-primary"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Image Section */}
      {img&&<div className=" overflow-hidden">
        <img src={img} alt="Project" className="md:w-fit w-[280px] " />
      </div>}

      {/* Text Section */}
      <div className="">
        <h2 className="text-sm border-b p-2 border-gray-500">{tech}</h2>
        <h2 className="text-lg p-2">{title}</h2>
        <ul className="text-xs p-2 ">
        {description.map((desc, index) => (
          <li className="p-1" key={index}>{desc} </li>
        ))}
          
        </ul>
      </div>

      {/* Button Section */}
     {link&& <div className="p-2">
        <Button text="View Project" link={link} />
      </div>} 
     {liveLink&& <div className="p-2">
        <Button text="Live Link" link={liveLink} />
      </div>}
    </motion.div>
  );
};

export default ProjectCard;
