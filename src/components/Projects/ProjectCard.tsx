import p1 from '../../assets/projects/p1.png'
import Button from '../shared/Button'

const ProjectCard = () => {
  return (
    <div className='flex flex-col border border-gray-500 w-fit'>
        <div>
            <img src={p1} alt="Project1" />
        </div>
        <div className=''>
            <h2 className='text-sm border-b p-2 border-gray-500'>PHTML CSS Javasccript</h2>
            <h2 className='text-lg  p-2 '>Project Name</h2>
            <p className='text-sm p-2' >Project Description</p>
         </div>   
      <div className='p-2'>
        <Button text="View Project" />
      </div>
    </div>
  )
}

export default ProjectCard
