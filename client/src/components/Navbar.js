import React from 'react';

const tabs = [
  { id: 'study', label: 'Study Mode' },
  { id: 'manage', label: 'Manage Cards' },
  { id: 'settings', label: 'Settings' },
];

function Navbar({ current, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg">
      <div className="flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
        <span className="text-lg font-semibold text-white">SuperFlash</span>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Web Dev</span>
      </div>
      <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-2.5 sm:px-4 py-2.5 text-xs sm:text-sm rounded-xl border transition min-h-[44px] ${
              current === tab.id
                ? 'bg-emerald-500 text-white border-emerald-400 shadow shadow-emerald-500/40'
                : 'border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
