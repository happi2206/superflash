import React from 'react';

function Settings({ settings, onChange }) {
  const update = (key, value) => onChange({ ...settings, [key]: value });

  return (
    <div className="space-y-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
          <div>
            <p className="text-slate-100 font-medium">Shuffle cards</p>
            <p className="text-xs text-slate-400">Randomize order each session</p>
          </div>
          <button
            onClick={() => update('shuffle', !settings.shuffle)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold min-h-[44px] ${
              settings.shuffle ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-200'
            }`}
          >
            {settings.shuffle ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
          <div>
            <p className="text-slate-100 font-medium">Auto flip</p>
            <p className="text-xs text-slate-400">Reveal answers automatically</p>
          </div>
          <button
            onClick={() => update('autoFlip', !settings.autoFlip)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold min-h-[44px] ${
              settings.autoFlip ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-200'
            }`}
          >
            {settings.autoFlip ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
          <div>
            <p className="text-slate-100 font-medium">Auto next</p>
            <p className="text-xs text-slate-400">Advance when timer hits zero</p>
          </div>
          <button
            onClick={() => update('autoNext', !settings.autoNext)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold min-h-[44px] ${
              settings.autoNext ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-200'
            }`}
          >
            {settings.autoNext ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
          <div>
            <p className="text-slate-100 font-medium">Timer</p>
            <p className="text-xs text-slate-400">Count down per card</p>
          </div>
          <button
            onClick={() => update('timerEnabled', !settings.timerEnabled)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold min-h-[44px] ${
              settings.timerEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-200'
            }`}
          >
            {settings.timerEnabled ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 sm:col-span-2">
          <div>
            <p className="text-slate-100 font-medium">Time per card</p>
            <p className="text-xs text-slate-400">Pacing for the timer</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 15].map((sec) => (
              <button
                key={sec}
                onClick={() => update('timePerCard', sec)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border min-h-[44px] ${
                  settings.timePerCard === sec
                    ? 'bg-purple-500 text-white border-purple-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 sm:col-span-2">
          <div>
            <p className="text-slate-100 font-medium">Animation speed</p>
            <p className="text-xs text-slate-400">Flip and motion timing</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['slow', 'normal', 'fast'].map((speed) => (
              <button
                key={speed}
                onClick={() => update('animationSpeed', speed)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border min-h-[44px] ${
                  settings.animationSpeed === speed
                    ? 'bg-purple-500 text-white border-purple-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
