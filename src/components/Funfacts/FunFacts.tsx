import React from 'react';
import Heading from '../shared/Heading';

interface factProps {
  id: number;
  facts: string;
  category?: string;
}

const FunFacts: React.FC<{ facts: factProps[] }> = ({ facts }) => {
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
              className="bg-[#121212] border-2 border-white p-4 shadow-brutal hover:shadow-brutal-accent brutal-card flex flex-col justify-between"
            >
              <div className="font-mono text-[10px] text-accent font-bold pb-2 border-b border-[#262626] mb-3">
                FACT_RECORD #{index + 1}
              </div>
              <p className="font-mono text-sm text-white font-bold leading-snug">
                "{fact.facts}"
              </p>
              <div className="mt-3 font-mono text-[9px] text-[#666666]">
                STATUS: VERIFIED
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
