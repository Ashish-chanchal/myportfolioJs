import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import Heading from "../shared/Heading"
import { Link } from "react-router-dom"


const SocialsData=[
    {
        id:0,
        name:"Linkedin",
        link:"https://www.linkedin.com/in/ashishchanchal/",
        icon : <FaLinkedin className="w-4 h-4 "/>
    },
    {
        id:1,
        name:"Github",
        link:"https://github.com/Ashish-chanchal",
        icon : <FaGithub className="w-4 h-4 "/> 
    },
    {
        id:2,
        name:"Instagram",
        link:"https://www.instagram.com/ashish._chanchal/",
        icon : <FaInstagram className="w-4 h-4 "/>
    },
    {
        id:3,
        name:"Twitter",
        link:"https://x.com/_ashishchanchal",
        icon : <FaTwitter className="w-4 h-4 "/>
    },
    {
        id:3,
        name:"Email",
        link:"mailto:akchanchal2002@gmail.com",
        icon : <FaEnvelope className="w-4 h-4 "/>
    },
    


]

const Socials = () => {
  return (
    <div className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto p-4">
        <Heading text="all-media" />
      </div>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5">
      
            {SocialsData.map((social)=>(
                <Link to={social.link} target="_blank" className="flex gap-2 text-white items-center" key={social.id}>{social.icon}{social.name}</Link>
            ))}
        
      </div>
    </div>
  )
}

export default Socials
