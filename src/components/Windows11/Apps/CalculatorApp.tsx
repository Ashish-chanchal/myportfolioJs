import React, { useState } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [clearNext, setClearNext] = useState(false);

  const handleDigit = (digit: string) => {
    if (display === '0' || clearNext) {
      setDisplay(digit);
      setClearNext(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOp = (operator: string) => {
    setPrevVal(parseFloat(display));
    setOp(operator);
    setClearNext(true);
  };

  const handleEqual = () => {
    if (prevVal === null || op === null) return;
    const current = parseFloat(display);
    let result = 0;

    switch (op) {
      case '+': result = prevVal + current; break;
      case '-': result = prevVal - current; break;
      case '×': result = prevVal * current; break;
      case '÷': result = current !== 0 ? prevVal / current : 0; break;
    }

    setDisplay(String(result));
    setPrevVal(null);
    setOp(null);
    setClearNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOp(null);
    setClearNext(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#202024] text-white select-none p-4 justify-between font-sans">
      {/* Calculator Header & Display */}
      <div>
        <div className="text-[11px] text-zinc-400 font-bold mb-1">Standard Calculator</div>
        <div className="text-right text-3xl sm:text-4xl font-light font-mono text-white py-4 overflow-x-auto no-scrollbar">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-1.5 text-sm font-medium">
        <button onClick={handleClear} className="p-3.5 rounded bg-[#2b2b32] hover:bg-[#35353d] text-amber-400 font-bold transition-all">C</button>
        <button onClick={() => setDisplay(String(-parseFloat(display)))} className="p-3.5 rounded bg-[#2b2b32] hover:bg-[#35353d] transition-all">±</button>
        <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className="p-3.5 rounded bg-[#2b2b32] hover:bg-[#35353d] transition-all">%</button>
        <button onClick={() => handleOp('÷')} className="p-3.5 rounded bg-[#2b2b32] hover:bg-[#35353d] text-blue-400 font-bold transition-all">÷</button>

        <button onClick={() => handleDigit('7')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">7</button>
        <button onClick={() => handleDigit('8')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">8</button>
        <button onClick={() => handleDigit('9')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">9</button>
        <button onClick={() => handleOp('×')} className="p-3.5 rounded bg-[#2b2b32] hover:bg-[#35353d] text-blue-400 font-bold transition-all">×</button>

        <button onClick={() => handleDigit('4')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">4</button>
        <button onClick={() => handleDigit('5')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">5</button>
        <button onClick={() => handleDigit('6')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">6</button>
        <button onClick={() => handleOp('-')} className="p-3.5 rounded bg-[#2b2b32] hover:bg-[#35353d] text-blue-400 font-bold transition-all">−</button>

        <button onClick={() => handleDigit('1')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">1</button>
        <button onClick={() => handleDigit('2')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">2</button>
        <button onClick={() => handleDigit('3')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">3</button>
        <button onClick={() => handleOp('+')} className="p-3.5 rounded bg-[#2b2b32] hover:bg-[#35353d] text-blue-400 font-bold transition-all">+</button>

        <button onClick={() => handleDigit('0')} className="col-span-2 p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">0</button>
        <button onClick={() => !display.includes('.') && setDisplay(display + '.')} className="p-3.5 rounded bg-[#32323a] hover:bg-[#3d3d46] transition-all">.</button>
        <button onClick={handleEqual} className="p-3.5 rounded bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-lg transition-all">=</button>
      </div>
    </div>
  );
};

export default CalculatorApp;
