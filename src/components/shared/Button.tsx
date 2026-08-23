import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

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
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';

  const handleClick = () => {
    if (setSelectedItem && id !== undefined) {
      setSelectedItem(id);
    }
    if (onClick) {
      onClick();
    }
  };

  const brutalVariantStyles = {
    accent: 'bg-accent text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-accent font-bold',
    accentSec: 'bg-accentSec text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-sec font-bold',
    cyan: 'bg-accent text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-accent font-bold',
    magenta: 'bg-accentSec text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-sec font-bold',
    green: 'bg-[#00FF66] text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-green font-bold',
    white: 'bg-white text-black border-2 border-black shadow-brutal-accent hover:shadow-brutal font-bold',
    dark: 'bg-[#141414] text-white border-2 border-white shadow-brutal-accent hover:bg-[#202020] font-semibold',
    yellow: 'bg-accent text-black border-2 border-black shadow-brutal-white hover:shadow-brutal-accent font-bold',
  };

  const minimalVariantStyles = {
    accent: 'bg-accent text-black font-bold rounded-full shadow-lg shadow-black/30 hover:opacity-90',
    accentSec: 'bg-accentSec text-black font-bold rounded-full shadow-lg shadow-black/30 hover:opacity-90',
    cyan: 'bg-accent text-black font-bold rounded-full shadow-lg shadow-black/30 hover:opacity-90',
    magenta: 'bg-accentSec text-black font-bold rounded-full shadow-lg shadow-black/30 hover:opacity-90',
    green: 'bg-[#00FF66] text-black font-bold rounded-full shadow-lg shadow-black/30 hover:opacity-90',
    white: 'bg-white text-black font-bold rounded-full shadow-md hover:bg-zinc-200',
    dark: 'bg-zinc-900 text-zinc-200 border border-zinc-700/80 font-medium rounded-full hover:bg-zinc-800 hover:text-white',
    yellow: 'bg-accent text-black font-bold rounded-full shadow-lg hover:opacity-90',
  };

  const sizeStyles = {
    sm: isMinimal ? 'px-3.5 py-1.5 text-xs font-sans' : 'px-3 py-1.5 text-xs font-mono',
    md: isMinimal ? 'px-5 py-2.5 text-sm font-sans' : 'px-5 py-2.5 text-sm font-mono',
    lg: isMinimal ? 'px-7 py-3 text-base font-sans' : 'px-7 py-3.5 text-base font-mono',
  };

  const variantStyles = isMinimal ? minimalVariantStyles : brutalVariantStyles;
  const selectedVariant = variantStyles[variant] || variantStyles.accent;
  const combinedClass = `inline-flex items-center justify-center gap-2 cursor-pointer select-none brutal-btn ${
    isMinimal ? 'tracking-normal font-medium' : 'uppercase tracking-wider'
  } ${selectedVariant} ${sizeStyles[size]}`;

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
          <span className="font-mono text-xs opacity-70">↗</span>
        </a>
      );
    }
    return (
      <Link to={link} onClick={handleClick} className={combinedClass}>
        {icon && <span className="text-current">{icon}</span>}
        <span>{text}</span>
        <span className="font-mono text-xs opacity-70">→</span>
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
