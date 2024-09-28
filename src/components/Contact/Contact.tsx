import {  FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";
import Heading from "../shared/Heading";
import dots from '../../assets/common/dots.png'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Contact = () => {
  const location = useLocation();
  const [showHeading, setShowHeading] = React.useState(true);
  useEffect(() => {
    if (location.pathname === "/contact-me") {
      setShowHeading(false);
    }
  }, []);
  return (
    <div className="text-4xl md:py-20 py-16 relative ">
    {showHeading&&<div className="max-w-7xl mx-auto p-4">
      <Heading text="Contacts" />
    </div>}
    <div className="max-w-7xl mx-auto p-4 flex md:flex-row flex-col-reverse md:items-center gap-5 justify-between">
      <div className="space-y-10  text-white  md:w-1/2">
        <h2 className="text-lg">
        I’m interested in freelance opportunities. However, if you have other request or question, don’t hesitate to contact me
        </h2>

       
        </div>
        <div className="text-sm border border-gray-500 p-4 text-white space-y-2 w-fit">
          <h2>
            Message me Here
          </h2>
          <ul className="space-y-2">
            <li className="flex gap-2"><FaLinkedin/> AshishChanchal</li>
            <li className="flex gap-2"><FaGithub/> Github</li>
          </ul>
          </div>
        </div>
        <img src={dots} alt="" className='md:block hidden absolute left top-1/2'/>
    </div>
  )
}

export default Contact
