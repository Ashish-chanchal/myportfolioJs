
interface BoxProps {
    category: string;
    technologies: string[];
}


const Box = ({category,technologies}:BoxProps) => {
  return (
    <div className="flex flex-col text-white border border-gray-500 ">
        <h2 className="font-semibold text-sm border-b border-gray-500 p-3">{category}</h2>
        <ul className="p-3 flex flex-wrap h-fit gap-2">
            {technologies.map((tech, index) => (
                <li key={index} className="text-xs">{tech}</li>
            ))}</ul>        
      
    </div>
  )
}

export default Box
