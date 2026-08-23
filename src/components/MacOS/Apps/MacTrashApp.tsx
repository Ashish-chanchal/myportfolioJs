import React, { useState } from 'react';
import { FaTrash, FaFileAlt } from 'react-icons/fa';

export const MacTrashApp: React.FC = () => {
  const [items, setItems] = useState([
    { id: '1', name: 'old_legacy_prototype_v1.zip', size: '24 MB', deleted: 'Yesterday' },
    { id: '2', name: 'draft_readme_obsolete.md', size: '4 KB', deleted: 'Aug 19' },
    { id: '3', name: 'unoptimized_assets_archive.tar', size: '52 MB', deleted: 'Aug 15' },
  ]);

  const emptyTrash = () => {
    setItems([]);
  };

  return (
    <div className="h-full flex flex-col bg-[#181820] text-white select-none">
      {/* Top Header */}
      <div className="h-11 px-4 bg-[#20202a] border-b border-white/10 flex items-center justify-between text-xs">
        <span className="font-bold">Trash — {items.length} items</span>

        {items.length > 0 && (
          <button
            onClick={emptyTrash}
            className="px-3 py-1 rounded-md bg-white/10 hover:bg-red-600/80 text-zinc-300 hover:text-white font-medium text-xs transition-all"
          >
            Empty Trash
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto macos-scroll bg-[#1c1c24]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-xs font-mono">
            <FaTrash className="text-4xl mb-3 text-zinc-600" />
            <span>Trash is Empty</span>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-zinc-400" />
                  <span className="font-medium text-zinc-200">{item.name}</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
                  <span>{item.size}</span>
                  <span>{item.deleted}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MacTrashApp;
