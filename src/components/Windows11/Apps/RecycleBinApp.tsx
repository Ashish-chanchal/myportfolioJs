import React, { useState } from 'react';
import { FaTrashAlt, FaTrash } from 'react-icons/fa';
import { WIN11_ICONS } from '../icons';

export const RecycleBinApp: React.FC = () => {
  const [deletedItems, setDeletedItems] = useState([
    { id: '1', name: 'old_legacy_code.js', originalPath: 'D:\\Projects\\Legacy', dateDeleted: '2026-08-20', size: '24 KB' },
    { id: '2', name: 'unoptimized_weights.bin', originalPath: 'E:\\AI_Models', dateDeleted: '2026-08-22', size: '1.2 GB' },
    { id: '3', name: 'temp_debug_dump.log', originalPath: 'C:\\Windows\\Temp', dateDeleted: '2026-08-23', size: '4.8 MB' },
  ]);

  const handleEmpty = () => {
    setDeletedItems([]);
  };

  return (
    <div className="h-full flex flex-col bg-[#19191d] text-white select-none">
      {/* Top Toolbar */}
      <div className="p-2.5 bg-[#141418] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <img src={WIN11_ICONS.recycle} alt="Recycle Bin" className="w-5 h-5 object-contain" />
          <span className="font-bold">Recycle Bin ({deletedItems.length} items)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleEmpty}
            disabled={deletedItems.length === 0}
            className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 rounded flex items-center gap-1.5 disabled:opacity-40"
          >
            <FaTrash className="w-3 h-3" />
            <span>Empty Recycle Bin</span>
          </button>
        </div>
      </div>

      {/* Items Table */}
      <div className="flex-1 overflow-auto win11-scroll p-3">
        {deletedItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
            <FaTrashAlt className="w-10 h-10 opacity-40" />
            <p className="text-xs">Recycle Bin is completely empty.</p>
          </div>
        ) : (
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 text-[11px]">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Original Location</th>
                <th className="py-2 px-3">Date Deleted</th>
                <th className="py-2 px-3">Size</th>
              </tr>
            </thead>
            <tbody>
              {deletedItems.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 text-zinc-200">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <img src={WIN11_ICONS.notepad} alt="file" className="w-4 h-4 object-contain" />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-2 px-3 text-zinc-400 font-mono text-[11px]">{item.originalPath}</td>
                  <td className="py-2 px-3 text-zinc-400">{item.dateDeleted}</td>
                  <td className="py-2 px-3 text-zinc-400 font-mono">{item.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecycleBinApp;
