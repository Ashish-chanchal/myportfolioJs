import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center cursor-pointer"
        >
          <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
          <span className="font-bold">Elias</span>
        </motion.div>

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
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#home"
            className="hover:text-purple-300 cursor-pointer"
          >
            #home
          </motion.a>
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#works"
            className="hover:text-purple-300 cursor-pointer"
          >
            #works
          </motion.a>
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#about-me"
            className="hover:text-purple-300 cursor-pointer"
          >
            #about-me
          </motion.a>
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#contacts"
            className="hover:text-purple-300 cursor-pointer"
          >
            #contacts
          </motion.a>
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
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#home"
            className="block hover:text-purple-300 cursor-pointer"
          >
            #home
          </motion.a>
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#works"
            className="block hover:text-purple-300 cursor-pointer"
          >
            #works
          </motion.a>
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#about-me"
            className="block hover:text-purple-300 cursor-pointer"
          >
            #about-me
          </motion.a>
          <motion.a
            whileHover={{ color: '#A78BFA', scale: 1.1 }}
            href="#contacts"
            className="block hover:text-purple-300 cursor-pointer"
          >
            #contacts
          </motion.a>
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <span>EN</span>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
