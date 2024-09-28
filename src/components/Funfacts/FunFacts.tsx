
import Heading from "../shared/Heading";

interface factProps {
    id: number;
    facts: string;
}

const FunFacts = ({facts}:{facts:factProps[]}) => {
  return (
    <div className=" md:py-20 py-16 ">
        <div className="max-w-7xl mx-auto p-4">
        <Heading text="my-fun-facts"  />
        </div>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-10 md:w-2/3">
        {facts.map((fact)=>(
            <h2 key={fact.id} className="p-3 border border-gray-400 w-fit text-white text-left">{fact.facts}</h2>
        ))}
      </div>
    </div>
  )
}

export default FunFacts
