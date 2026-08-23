import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', showText = true }) => {
  const sizeMap = {
    sm: 'w-11 h-11 text-base',
    md: 'w-14 h-14 text-lg',
    lg: 'w-16 h-16 text-xl',
  };

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Monogram Icon Badge */}
      <div className={`relative ${sizeMap[size]} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 bg-accent/25 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Borderless Transparent Container */}
        <div className="w-full h-full rounded-2xl flex items-center justify-center relative z-10 overflow-hidden">
          {/* Corner Accent Light */}
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent/20 rounded-full blur-md pointer-events-none" />

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
