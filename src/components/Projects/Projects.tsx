
import rectangle from '../../assets/common/rectangle.png'
import dots from '../../assets/common/dots.png'

import ProjectCard from './ProjectCard'
import Heading from '../shared/Heading'

const Projects = () => {
  return (
    <div className="text-4xl md:py-20 py-16 relative">

      <div className="max-w-7xl mx-auto p-4">
        <Heading text="Projects" btnText="View All ~~>" />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 mt-10 text-white'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      </div>
      <img src={dots} alt="" className='md:block hidden absolute left-0 top-1/3'/>
<img src={rectangle} alt="" className='md:block hidden absolute right-0 top-1/2'/>
    </div>
  )
}

export default Projects
