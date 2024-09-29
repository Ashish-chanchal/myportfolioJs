import { motion } from "framer-motion";
import Button from "../shared/Button";
import heroimg from "../../assets/hero/heroimg.png";
import heromain from "../../assets/hero/heromain.png";
import dots from "../../assets/common/dots.png";
import commas from "../../assets/common/commas.png";
import rectangle from "../../assets/common/rectangle.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { yoyo: Infinity } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  hover: { scale: 1.1, rotate: [0, 10, -10, 0], transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } },
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.2, yoyo: Infinity } },
};

const Hero = () => {
  return (
    <motion.div
      className="md:text-4xl text-2xl md:pt-24 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* hero content */}
      <div className="flex items-center md:flex-row flex-col-reverse gap-5 max-w-7xl mx-auto p-4">
        {/* content */}
        <motion.div
          className="md:w-1/2 flex flex-col gap-4 justify-center"
          variants={textVariants}
          whileHover="hover"
        >
          <div>
            <h2 className="font-semibold text-white">
              Ashish Chanchal is a{" "}
              <span className="text-secondary">Software Developer</span>and{" "}
              <span className="text-secondary">Community Manager</span>
            </h2>
          </div>
          <div>
            <p className="text-sm text-white">
              I am a passionate Software Engineer with a strong focus on
              Frontend Development, Full-stack Development, Machine Learning,
              and Open Source. I love engaging with the community and have had
              the privilege to work on diverse projects and internships in the
              tech industry.
            </p>
          </div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              text="Download CV !!"
              link={
                "https://drive.google.com/file/d/105lDwcWenzrpZmccnCBzOh_bMxOowsuT/view?usp=drive_link"
              }
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="md:w-1/2 relative"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          whileHover="hover"
        >
          {/* hero image */}
          <div>
            <motion.img
              src={heroimg}
              alt="heroimg"
              className="md:w-[150px] bg-transparent absolute left-0"
            />
            <div className="md:w-2/3">
              <motion.img
                src={heromain}
                alt="heroimg"
                className="z-10 relative bg-transparent"
              />
              <motion.div
                className="md:text-sm text-xs flex items-center ml-2 gap-5 p-2 border border-white"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="w-3 h-3 bg-secondary"></div>
                <h2 className="text-white">Currently working on Portfolio</h2>
              </motion.div>
              <img
                src={dots}
                alt=""
                className="absolute right-0 md:right-20 z-20 top-20 bg-transparent md:block hidden"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="w-fit mx-auto p-4">
          <motion.fieldset
            className="border border-white w-fit mt-20 mx-auto"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <legend className="ml-2">
              <img src={commas} alt="" className="w-3 h-3" />
            </legend>
            <h2 className="md:text-xl text-lg text-white text-center p-3 w-fit">
              With great power comes great electricity bill
            </h2>
          </motion.fieldset>
          <motion.fieldset
            className="border border-white w-fit ml-auto"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <legend className="ml-2">
              <img src={commas} alt="" className="w-3 h-3" />
            </legend>
            <h2 className="md:text-xl text-lg text-white text-center p-3 w-fit">
              -Dr. who
            </h2>
          </motion.fieldset>
        </div>
        <img
          src={rectangle}
          alt="rectangle"
          className="absolute right-0 md:block hidden top-10"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
