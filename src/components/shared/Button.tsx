import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  setSelectedItem?: React.Dispatch<React.SetStateAction<number>>;
  id?: number;
  variant?: 'cyan' | 'magenta' | 'green' | 'white' | 'dark' | 'yellow' | 'accent' | 'accentSec';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick,
  setSelectedItem,
  id,
  variant = 'accent',
  size = 'md',
  icon,
  external = false,
}) => {
  const handleClick = () => {
    if (setSelectedItem && id !== undefined) {
      setSelectedItem(id);
    }
    if (onClick) {
      onClick();
    }
  };

  const variantStyles = {
    accent: 'bg-accent text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-accent font-bold',
    accentSec: 'bg-accentSec text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-sec font-bold',
    cyan: 'bg-accent text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-accent font-bold',
    magenta: 'bg-accentSec text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-sec font-bold',
    green: 'bg-[#00FF66] text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-green font-bold',
    white: 'bg-white text-black border-2 border-black shadow-brutal-accent hover:shadow-brutal font-bold',
    dark: 'bg-[#141414] text-white border-2 border-white shadow-brutal-accent hover:bg-[#202020] font-semibold',
    yellow: 'bg-accent text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-accent font-bold',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-mono',
    md: 'px-5 py-2.5 text-sm font-mono',
    lg: 'px-7 py-3.5 text-base font-mono',
  };

  const selectedVariant = variantStyles[variant] || variantStyles.accent;
  const combinedClass = `inline-flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider brutal-btn select-none ${selectedVariant} ${sizeStyles[size]}`;

  if (link) {
    const isExt = external || link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('//');
    if (isExt) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={combinedClass}
        >
          {icon && <span className="text-current">{icon}</span>}
          <span>{text}</span>
          <span className="font-mono text-xs">↗</span>
        </a>
      );
    }
    return (
      <Link to={link} onClick={handleClick} className={combinedClass}>
        {icon && <span className="text-current">{icon}</span>}
        <span>{text}</span>
        <span className="font-mono text-xs">→</span>
      </Link>
    );
  }

  return (
    <button onClick={handleClick} type="button" className={combinedClass}>
      {icon && <span className="text-current">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
