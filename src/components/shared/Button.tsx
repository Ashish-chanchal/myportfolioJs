import { Link } from "react-router-dom";

interface ButtonProps {
    text: string;
    btnimg?: string;
    link?: string;
}

function Button({ text, btnimg,link }: ButtonProps) {
  return (
    <Link to={link ||"/"}>
    <button className="bg-primary border border-secondary p-2 flex gap-4 ">
        <span className="text-secondary text-sm">{text}</span>
        {btnimg && <img src={btnimg} alt={text} />}
    </button></Link>
  );
}

export default Button;

