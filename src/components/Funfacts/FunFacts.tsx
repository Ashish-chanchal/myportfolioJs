import React from 'react';
import Heading from '../shared/Heading';
import { useTheme } from '../../context/ThemeContext';

interface factProps {
  id: number;
  facts: string;
  category?: string;
}

const FunFacts: React.FC<{ facts: factProps[] }> = ({ facts }) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';

  return (
    <div className="py-16 md:py-20 relative bg-brutal-grid">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text="PILOT TRIVIA & FUN FACTS"
          tag="// OFFLINE PROTOCOLS"
          index="DOSSIER_NOTES"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {facts.map((fact, index) => (
            <div
              key={fact.id}
              className={`p-4 flex flex-col justify-between transition-all ${
                isBento
                  ? 'bento-tile'
                  : isMinimal
                  ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md'
                  : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
              }`}
            >
              <div className={`font-mono text-[10px] text-accent font-bold pb-2 mb-3 ${isBento ? 'border-b border-white/10' : isMinimal ? 'border-b border-zinc-800/60' : 'border-b border-[#262626]'}`}>
                {isBento || isMinimal ? `INTEREST #${index + 1}` : `FACT_RECORD #${index + 1}`}
              </div>
              <p className={`text-sm text-white font-medium leading-snug ${isBento || isMinimal ? 'font-sans' : 'font-mono font-bold'}`}>
                "{fact.facts}"
              </p>
              <div className="mt-3 font-mono text-[9px] text-zinc-500">
                {isBento || isMinimal ? 'Verified Interest' : 'STATUS: VERIFIED'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
