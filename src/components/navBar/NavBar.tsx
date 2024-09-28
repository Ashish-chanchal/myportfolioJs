import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Line from '../../assets/common/line.png'
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
// Navigation Items


const NavItems=[
  {
    id:0,
    name:"home",
    link:"/"
  },
  {
    id:1,
    name:"works",
    link:"/works"
  },
  {
    id:2,
    name:"about-me",
    link:"/about-me"
  },
  {
    id:3,
    name:"contacts",
    link:"/contact-me"
  }
]
const Navbar = ({setSelectedItem,selectedItem}:{setSelectedItem: React.Dispatch<React.SetStateAction<number>>,selectedItem:number}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    const item = NavItems.find((item) => item.link === path);
    if (item) {
      setSelectedItem(item.id);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary text-white p-4 top-0 w-full z-50 fixed ">
      <div className='flex flex-col absolute top-0 md:left-5 left-0 items-center gap-1 bg-transparent'>
        <img src={Line} alt=""  className='md:w-[2px]  w-[2px]'/>
        <Link to='https://www.linkedin.com/in/ashishchanchal/'  target='_blank' className='text-brandWhite font-semibold bg-transparent'><FaLinkedinIn className='text-brandWhite w-5 h-5'/></Link>
        <Link to='https://github.com/ashish-chanchal'  target='_blank'className='text-brandWhite font-semibold'> <FaGithub className='text-brandWhite w-5 h-5'/></Link>
        <Link to='https://www.instagram.com/ashish._chanchal/' target='_blank' className='text-brandWhite font-semibold'><FaInstagram className='text-brandWhite w-5 h-5'/></Link>
        
       
        
      </div>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div
         
          className="flex items-center cursor-pointer"
        >
          <img src="/Logo.png" alt="Logo" className="w-1/4 mr-2" />
        
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="lg:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8">
          {NavItems.map((item)=>(
           <Link key={item.id} onClick={() => setSelectedItem(item.id)} to={item.link} className={`hover:text-white cursor-pointer font-semibold  ${selectedItem === item.id ? 'text-white' : 'text-gray-600'}`}>
            <span className='text-secondary'>#</span>
            {item.name}
         
           </Link>
          ))}
          
          
        </div>

        {/* Language Selector for Desktop */}
        <div className="hidden lg:flex items-center">
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <span className="mr-2">EN</span>
            <motion.div whileHover={{ rotate: 180 }} className="inline-block">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="lg:hidden bg-gray-900 text-white p-4 space-y-2"
        >
           {NavItems.map((item)=>(
           <Link key={item.id} onClick={() => setSelectedItem(item.id)} to={item.link} className={`block hover:text-secondary cursor-pointer font-semibold ${selectedItem === item.id ? 'text-secondary' : ''}`}>
            <span className='text-secondary'>#</span>
            {item.name}
         
           </Link>
          ))}
         
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
