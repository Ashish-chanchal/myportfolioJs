import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    btnimg?: string;
    link?: string;
    id?: number;
    setSelectedItem?: React.Dispatch<React.SetStateAction<number>>
}

function Button({ text, btnimg,link,setSelectedItem ,id}: ButtonProps) {
  return (
    <Link to={link ||"/"} >
    <button className="bg-primary border border-secondary p-2 flex gap-4 " onClick={()=>{setSelectedItem&&setSelectedItem(id||0)}}>
        <span className="text-secondary text-sm">{text}</span>
        {btnimg && <img src={btnimg} alt={text} />}
    </button></Link>
  );
}

export default Button;

