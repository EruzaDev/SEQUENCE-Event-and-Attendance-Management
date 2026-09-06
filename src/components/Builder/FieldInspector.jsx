import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Asterisk, 
  Sliders, 
  CheckSquare, 
  Info,
  Maximize2,
  Columns,
  Layers,
  Sparkles
} from 'lucide-react';

export function FieldInspector({
  selectedField,
  onUpdateField,
  onDeleteField,
  onClose
}) {
  const [newOptionInput, setNewOptionInput] = useState('');

  if (!selectedField) {
    return (
      <aside className="sidebar-inspector p-6 flex flex-col items-center justify-center text-center select-none bg-[#0c101c]/98">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3 shadow-inner">
          <Sliders className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Question Settings</h3>
        <p className="text-xs text-slate-400 mt-1.5 max-w-[210px] leading-relaxed">
          Select any question card in the center canvas to edit its label, validation rules, layout, and choices.
        </p>
      </aside>
    );
  }

  const hasOptions = ['select', 'radio', 'checkbox'].includes(selectedField.type);

  const handleAddOption = (e) => {
    e.preventDefault();
    if (!newOptionInput.trim()) return;
    const currentOptions = selectedField.options ? [...selectedField.options] : [];
    onUpdateField(selectedField.id, {
      options: [...currentOptions, newOptionInput.trim()]
    });
    setNewOptionInput('');
  };

  const handleRemoveOption = (indexToRemove) => {
    const currentOptions = selectedField.options ? [...selectedField.options] : [];
    onUpdateField(selectedField.id, {
      options: currentOptions.filter((_, i) => i !== indexToRemove)
    });
  };

  const handleOptionChange = (index, newVal) => {
    const currentOptions = selectedField.options ? [...selectedField.options] : [];
    currentOptions[index] = newVal;
    onUpdateField(selectedField.id, { options: currentOptions });
  };

  const handleMoveOption = (fromIndex, toIndex) => {
    const currentOptions = selectedField.options ? [...selectedField.options] : [];
    if (toIndex < 0 || toIndex >= currentOptions.length) return;
    const [moved] = currentOptions.splice(fromIndex, 1);
    currentOptions.splice(toIndex, 0, moved);
    onUpdateField(selectedField.id, { options: currentOptions });
  };

  return (
    <aside className="sidebar-inspector p-4 flex flex-col gap-4 bg-[#0c101c]/98 border-l border-white/[0.08]">
      {/* Inspector Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
              Inspector
            </h2>
            <span className="badge badge-indigo text-[10px] uppercase font-mono">
              {selectedField.type}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
            ID: {selectedField.id}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Close inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* Field Label */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
            <span>Question Title / Label</span>
            <span className="text-rose-400 text-[11px]">*</span>
          </label>
          <input
            type="text"
            value={selectedField.label}
            onChange={(e) => onUpdateField(selectedField.id, { label: e.target.value })}
            className="input-base text-xs bg-slate-950/60 border-white/10 focus:border-indigo-500 rounded-xl"
            placeholder="e.g. Full Name or Team Name"
          />
        </div>

        {/* Placeholder hint */}
        {!['consent', 'file'].includes(selectedField.type) && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200">
              Placeholder Hint
            </label>
            <input
              type="text"
              value={selectedField.placeholder || ''}
              onChange={(e) => onUpdateField(selectedField.id, { placeholder: e.target.value })}
              className="input-base text-xs bg-slate-950/60 border-white/10 focus:border-indigo-500 rounded-xl"
              placeholder="e.g. Enter answer..."
            />
          </div>
        )}

        {/* Helper Instructions */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200">
            Helper Text / Subtitle
          </label>
          <textarea
            rows={2}
            value={selectedField.helperText || ''}
            onChange={(e) => onUpdateField(selectedField.id, { helperText: e.target.value })}
            className="input-base text-xs bg-slate-950/60 border-white/10 focus:border-indigo-500 rounded-xl resize-none"
            placeholder="Subtext shown under the question input"
          />
        </div>

        {/* Layout Grid Width */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200">
            Canvas Column Width
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onUpdateField(selectedField.id, { width: 'half' })}
              className={`p-2 rounded-xl border text-xs flex items-center justify-center gap-1.5 transition-all ${
                selectedField.width === 'half'
                  ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5 text-amber-400" />
              <span>50% (Half)</span>
            </button>
            <button
              type="button"
              onClick={() => onUpdateField(selectedField.id, { width: 'full' })}
              className={`p-2 rounded-xl border text-xs flex items-center justify-center gap-1.5 transition-all ${
                selectedField.width === 'full' || !selectedField.width
                  ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>100% (Full)</span>
            </button>
          </div>
        </div>

        {/* Required Toggle */}
        <div className="p-3 rounded-xl bg-slate-900/40 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white flex items-center gap-1">
              <span>Required Field</span>
              <Asterisk className="w-3 h-3 text-rose-400" />
            </div>
            <p className="text-[10px] text-slate-400">
              Mandatory before attendee can submit
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={!!selectedField.required}
              onChange={(e) => onUpdateField(selectedField.id, { required: e.target.checked })}
            />
            <span className="slider" />
          </label>
        </div>

        {/* Options Management */}
        {hasOptions && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200">
                Options / Choices
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {selectedField.options?.length || 0} choices
              </span>
            </div>

            {/* List of current options */}
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
              {(selectedField.options || []).map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 w-4 text-center">
                    {optIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                    className="flex-1 bg-transparent text-xs text-white outline-none border-b border-transparent focus:border-indigo-500 px-1 py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => handleMoveOption(optIdx, optIdx - 1)}
                    disabled={optIdx === 0}
                    className="text-slate-400 hover:text-white p-1 disabled:opacity-20 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveOption(optIdx, optIdx + 1)}
                    disabled={optIdx === (selectedField.options?.length || 0) - 1}
                    className="text-slate-400 hover:text-white p-1 disabled:opacity-20 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(optIdx)}
                    className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                    title="Remove choice"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new option form */}
            <form onSubmit={handleAddOption} className="flex gap-1.5 pt-1">
              <input
                type="text"
                placeholder="Add option..."
                value={newOptionInput}
                onChange={(e) => setNewOptionInput(e.target.value)}
                className="input-base text-xs py-1.5 px-2.5 flex-1 bg-slate-950/60 border-white/10 rounded-lg"
              />
              <button
                type="submit"
                className="btn btn-secondary btn-sm py-1 px-3 text-xs"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Delete Field Button at bottom */}
      <div className="pt-3 border-t border-white/10">
        <button
          onClick={() => onDeleteField(selectedField.id)}
          className="btn btn-danger w-full btn-sm text-xs flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete this Question</span>
        </button>
      </div>
    </aside>
  );
}
