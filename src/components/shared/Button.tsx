interface ButtonProps {
    text: string;
    btnimg?: string;
}

function Button({ text, btnimg }: ButtonProps) {
  return (
    <button className="bg-primary border border-secondary p-2 flex gap-4 ">
        <span className="text-secondary text-sm">{text}</span>
        {btnimg && <img src={btnimg} alt={text} />}
    </button>
  );
}

export default Button;

