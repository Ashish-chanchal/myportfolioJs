import {Link} from 'react-router-dom'

import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
   <div className=" border-t border-gray-500"> 
     <div className="mx-auto max-w-7xl p-4  text-white">
      <div className="flex justify-between items-center">
        
        <div
         
         className="flex  flex-col "
       >
         <img src="/Logo.png" alt="Logo" className="w-1/3 mr-2" />
         <p className="md:ml-2 mt-3 md:text-base text-sm">Software Developer</p>
    
        </div>
        <div>
            <h3 className="text-lg font-semibold">Media</h3>
            <div className='flex gap-3'>
        
        <Link to='https://www.linkedin.com/in/ashishchanchal/'  target='_blank' className='text-brandWhite font-semibold bg-transparent'><FaLinkedinIn className='text-brandWhite w-5 h-5'/></Link>
        <Link to='https://github.com/ashish-chanchal'  target='_blank'className='text-brandWhite font-semibold'> <FaGithub className='text-brandWhite w-5 h-5'/></Link>
        <Link to='https://www.instagram.com/ashish._chanchal/' target='_blank' className='text-brandWhite font-semibold'><FaInstagram className='text-brandWhite w-5 h-5'/></Link>
        
       
        
      </div>
        </div>
      </div>
      <div className="text-center p-4 md:text-lg text-sm">
<h2>@CopyRight 2024 Made by <span className="text-secondary">Ashish Chanchal</span></h2>
      </div>
    </div>
   </div>
  )
}

export default Footer
