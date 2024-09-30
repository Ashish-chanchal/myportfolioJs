import Heading from "../shared/Heading";
import { motion } from "framer-motion";
import macbook from "../../assets/common/macbook.png";
import rectangle from "../../assets/common/rectangle.png";
import dots from "../../assets/common/dots.png";
import Button from "../shared/Button";
interface AboutProps {
  id: number;
  description: string;
}
const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  hover: { scale: 1.1, rotate: [0, 10, -10, 0], transition: { duration: 0.5 } },
};
const About = ({setSelectedItem,description}:{setSelectedItem?: React.Dispatch<React.SetStateAction<number>>,description:AboutProps[]}) => {
  return (
    <div className="text-4xl md:py-20 py-16 relative">
      {setSelectedItem?"":<div className="max-w-7xl mx-auto p-4">
        <Heading text="AboutMe" />
      </div>}
      <div className="max-w-7xl mx-auto p-4 flex md:flex-row flex-col-reverse md:items-center gap-5">
        
        <div className="space-y-10  text-white  md:w-2/3">
          <h2 className="text-xl">
            Hello, i’m <span className="text-secondary">Ashish Chanchal</span>
          </h2>
{description.map((desc)=><p key={desc.id} className="text-sm">{desc.description}</p>)}
      
          <div>
          {setSelectedItem?"": <Button text="Read more ~~>" setSelectedItem={setSelectedItem} id={2}/>}
          </div>
        </div>
        <div className="relative">
<img src={dots} alt="Ashish img" className=" absolute top-0 "/>
<motion.img   initial="hidden"
          animate="visible"
          variants={imageVariants}
          whileHover="hover" src={macbook} alt="Ashish img md:w-[80%]" />

        </div>
      </div>
      <img src={rectangle} alt="" className='md:block hidden absolute left-0 top-1/3 rotate-180'/>
      <img src={dots} alt="" className='md:block hidden absolute right-0 top-3/4'/>
    </div>
  );
};

export default About;
