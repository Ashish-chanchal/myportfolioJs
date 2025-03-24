import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Heading from "../shared/Heading";
import skillgroup from "../../assets/skillgroup.png";
import Box from "../shared/Box";

// techData.ts
export const techData = [
  {
    id: 1,
    category: "Frontend Development",
    technologies: ["HTML", "CSS","Tailwind CSS", "Javascript", "Typescript"],
  },
  {
    id: 2,
    category: "Backend Development",
    technologies: ["NodeJS", "ExpressJS","NestJS"],
  },
  {
    id: 3,
    category: "Databases",
    technologies: ["Firbase", "MongoDB"],
  },
  {
    id: 4,
    category: "App Development",
    technologies: ["Dart", "Flutter"],
  },
  {
    id: 5,
    category: "Data Structures & Algorithms",
    technologies: ["C & C++"],
  },
  {
    id: 6,
    category: "Tools & Environments",
    technologies: [
      "VSCode",
      "Git",
      "GitHub",
      "Canva",
      "Font Awesome",
    ],
  },

  {
    id: 7,
    category: "Frameworks & Libraries",
    technologies: ["React",  "Next JS", "Zod", "ShadCN UI", "BootStrap"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills = ( {showimg}:{showimg?:boolean}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start("visible");
    }
  }, [inView, animation]);

  return (
    <div className="text-4xl md:py-20 py-16 relative">
      <div className="max-w-7xl mx-auto p-4">
        <Heading text="Skills" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto p-4">
        {/* Image Section */}
       {showimg&& <div className="md:block hidden">
          <img src={skillgroup} alt="" />
        </div>}

        {/* Skills Boxes */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 col-span-2 gap-4 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={animation}
        >
          {techData.map((tech) => (
            <motion.div key={tech.id} variants={itemVariants}>
              <Box category={tech.category} technologies={tech.technologies} />
            </motion.div>
          ))}
        </motion.div>
        {!showimg&& <div className="md:block hidden">
          <img src={skillgroup} alt="" />
        </div>}
      </div>
    </div>
  );
};

export default Skills;
