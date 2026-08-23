import React, { useState, useEffect } from 'react';

export const MacCalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const val = parseFloat(display);
    setDisplay((val * -1).toString());
  };

  const inputPercent = () => {
    const val = parseFloat(display);
    setDisplay((val / 100).toString());
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const current = prevValue || 0;
      let result = 0;
      switch (operation) {
        case '+':
          result = current + inputValue;
          break;
        case '-':
          result = current - inputValue;
          break;
        case '×':
          result = current * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? current / inputValue : 0;
          break;
        default:
          result = inputValue;
      }
      setPrevValue(result);
      setDisplay(result.toString());
    }

    setWaitingForOperand(true);
    setOperation(nextOp === '=' ? null : nextOp);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDot();
      } else if (e.key === '+' || e.key === '-') {
        performOperation(e.key);
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        performOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        performOperation('=');
      } else if (e.key === 'Escape' || e.key === 'c') {
        clearAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, prevValue, operation, waitingForOperand]);

  return (
    <div className="h-full bg-[#1e1e24] p-4 flex flex-col justify-between text-white select-none max-w-[280px] mx-auto">
      {/* Display */}
      <div className="text-right px-2 py-4 text-4xl font-light font-mono truncate tracking-tight">
        {display}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={clearAll}
          className="w-12 h-12 rounded-full bg-zinc-600 hover:bg-zinc-500 text-black font-semibold text-sm transition-all"
        >
          {display !== '0' ? 'C' : 'AC'}
        </button>
        <button
          onClick={toggleSign}
          className="w-12 h-12 rounded-full bg-zinc-600 hover:bg-zinc-500 text-black font-semibold text-sm transition-all"
        >
          ±
        </button>
        <button
          onClick={inputPercent}
          className="w-12 h-12 rounded-full bg-zinc-600 hover:bg-zinc-500 text-black font-semibold text-sm transition-all"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
            operation === '÷' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        {['7', '8', '9'].map((d) => (
          <button
            key={d}
            onClick={() => inputDigit(d)}
            className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium text-base transition-all"
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => performOperation('×')}
          className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
            operation === '×' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        {['4', '5', '6'].map((d) => (
          <button
            key={d}
            onClick={() => inputDigit(d)}
            className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium text-base transition-all"
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => performOperation('-')}
          className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
            operation === '-' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
          }`}
        >
          –
        </button>

        {/* Row 4 */}
        {['1', '2', '3'].map((d) => (
          <button
            key={d}
            onClick={() => inputDigit(d)}
            className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium text-base transition-all"
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => performOperation('+')}
          className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
            operation === '+' ? 'bg-white text-orange-500' : 'bg-orange-500 hover:bg-orange-400 text-white'
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit('0')}
          className="col-span-2 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium text-base px-5 text-left transition-all"
        >
          0
        </button>
        <button
          onClick={inputDot}
          className="w-12 h-12 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white font-medium text-base transition-all"
        >
          .
        </button>
        <button
          onClick={() => performOperation('=')}
          className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg transition-all"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default MacCalculatorApp;
