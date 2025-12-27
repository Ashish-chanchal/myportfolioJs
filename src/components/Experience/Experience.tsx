import rectangle from "../../assets/common/rectangle.png";
import dots from "../../assets/common/dots.png";

import Heading from "../shared/Heading";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ExperienceDataProps {
  id: number;
  tech: string;
  title: string;
  description: string[];
  link?: string;
}


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const timelineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const backgroundVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

// Individual Experience Card Component with expand/collapse
const ExperienceCard = ({ data, index }: { data: ExperienceDataProps; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedDescriptions = isExpanded ? data.description : data.description.slice(0, 1);

  return (
    <motion.div
      variants={timelineVariants}
      className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
        }`}
    >
      {/* Timeline Dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-4 border-gray-900 z-10 shadow-lg shadow-purple-500/50"></div>

      {/* Content Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
          }`}
        variants={cardVariants}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <div className="group relative bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Accent Border */}
          <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-tl-2xl rounded-br-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>

          <div className="relative z-10">
            {/* Company Name with Gradient */}
            <h3 className="text-sm md:text-base font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {data.tech}
            </h3>

            {/* Job Title */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
              {data.title}
            </h2>

            {/* Description Points */}
            <ul className="space-y-2.5 text-gray-300 text-xs md:text-sm">
              <AnimatePresence>
                {displayedDescriptions.map((desc, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mt-2 flex-shrink-0"></span>
                    <span className="group-hover:text-gray-200 transition-colors duration-300">
                      {desc}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Read More/Less Button */}
            {data.description.length > 1 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 text-xs md:text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Show less
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Read more
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            )}

            {/* Link Button */}
            {data.link && (
              <motion.a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs md:text-sm font-semibold rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Work
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Empty space for opposite side on desktop */}
      <div className="hidden md:block w-[calc(50%-3rem)]"></div>
    </motion.div>
  );
};

const Experience = ({ ExperienceData, title }: { ExperienceData: ExperienceDataProps[], title?: string }) => {
  return (
    <motion.div
      className="text-4xl md:py-20 py-16 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Heading text={title || "Experience"} />
        {/* Timeline Layout */}
        <div className="relative mt-16">
          {/* Vertical Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 opacity-30"></div>

          {/* Experience Cards */}
          <motion.div
            className="space-y-12 md:space-y-16"
            variants={containerVariants}
          >
            {ExperienceData.map((data, index) => (
              <ExperienceCard key={data.id} data={data} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <motion.img
        src={dots}
        alt=""
        className="md:block hidden absolute left-0 top-1/4 opacity-30"
        variants={backgroundVariants}
      />
      <motion.img
        src={rectangle}
        alt=""
        className="md:block hidden absolute right-0 top-1/2 opacity-30"
        variants={backgroundVariants}
      />

      {/* Additional Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </motion.div>
  );
};

export default Experience;
