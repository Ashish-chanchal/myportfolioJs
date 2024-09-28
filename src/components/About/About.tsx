import Heading from "../shared/Heading";
import aboutimg from "../../assets/common/aboutimg.png";
import rectangle from "../../assets/common/rectangle.png";
import dots from "../../assets/common/dots.png";
import Button from "../shared/Button";
interface AboutProps {
  id: number;
  description: string;
}
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
<img src={aboutimg} alt="Ashish img" />
<img src={dots} alt="Ashish img" className=" absolute top-1/2 right-1/3"/>
        </div>
      </div>
      <img src={rectangle} alt="" className='md:block hidden absolute left-0 top-1/3 rotate-180'/>
      <img src={dots} alt="" className='md:block hidden absolute right-0 top-3/4'/>
    </div>
  );
};

export default About;
