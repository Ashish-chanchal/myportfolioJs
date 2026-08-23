import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true }) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Crisp Monogram Icon Badge */}
      <div className={`relative ${sizeMap[size]} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 bg-accent/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Modern Glassmorphic Container */}
        <div className="w-full h-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center relative z-10 shadow-lg shadow-black/60 overflow-hidden">
          {/* Subtle Corner Accent Light */}
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-accent/30 rounded-full blur-sm pointer-events-none" />
          
          {/* Typographic Monogram */}
          <div className="font-heading font-black tracking-tighter flex items-center select-none">
            <span className="text-accent font-extrabold">A</span>
            <span className="text-white font-extrabold">C</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent ml-0.5 animate-pulse" />
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="font-heading font-black text-sm tracking-tight text-white flex items-center gap-1.5 leading-none mb-1">
            <span>ASHISH</span>
            <span className="text-accent">CHANCHAL</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 tracking-wider leading-none">
            SOFTWARE & AI SYSTEMS
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
