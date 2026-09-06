import React, { useState } from 'react';
import { 
  Copy, 
  Trash2, 
  Settings2, 
  Asterisk, 
  Columns, 
  Maximize2, 
  GripVertical 
} from 'lucide-react';

export function CanvasFieldItem({
  field,
  index,
  totalFields,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onDuplicate,
  onDelete,
  onDragStartItem,
  onDragOverItem,
  onDragLeaveItem,
  onDropOnItem,
  dropIndicator
}) {
  const [isDraggingSelf, setIsDraggingSelf] = useState(false);

  const handleDragStart = (e) => {
    setIsDraggingSelf(true);
    e.dataTransfer.setData('application/json', JSON.stringify({
      source: 'canvas',
      index: index
    }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStartItem && onDragStartItem(index);
  };

  const handleDragEnd = () => {
    setIsDraggingSelf(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const offset = e.clientY - rect.top;
    const position = offset < rect.height / 2 ? 'before' : 'after';
    onDragOverItem && onDragOverItem(index, position);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    onDragLeaveItem && onDragLeaveItem(index);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const raw = e.dataTransfer.getData('application/json');
      if (!raw) return;
      const data = JSON.parse(raw);
      onDropOnItem && onDropOnItem(data, index);
    } catch (err) {
      console.warn('Drop parse error:', err);
    }
  };

  const showIndicatorBefore = dropIndicator && dropIndicator.index === index && dropIndicator.position === 'before';
  const showIndicatorAfter = dropIndicator && dropIndicator.index === index && dropIndicator.position === 'after';

  return (
    <div
      style={{
        gridColumn: field.width === 'half' ? 'span 1' : 'span 2'
      }}
      className="relative flex flex-col"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Visual Drop Line Before */}
      {showIndicatorBefore && (
        <div className="absolute -top-2.5 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-400 rounded-full z-30 shadow-lg shadow-indigo-500/80 animate-pulse" />
      )}

      <div
        onClick={onSelect}
        onMouseEnter={() => onHover && onHover(field.id)}
        onMouseLeave={() => onHover && onHover(null)}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`canvas-field-card group transition-all duration-200 select-none ${
          isDraggingSelf ? 'opacity-30 scale-95 border-indigo-500/60' : ''
        } ${
          isSelected 
            ? 'is-selected ring-2 ring-indigo-500/70 bg-[#161f38]' 
            : isHovered 
              ? 'ring-2 ring-indigo-400/50 bg-[#141b32]' 
              : 'bg-[#0f1526]/90'
        }`}
      >
        {/* Top Header / Meta Bar with Drag Handle */}
        <div className="flex items-center justify-between gap-2 pb-1 border-b border-white/[0.04]">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Dedicated Drag Handle */}
            <div 
              className="flex items-center gap-1 text-[11px] font-mono font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/25 cursor-grab active:cursor-grabbing transition-colors"
              title="Drag to reorder anywhere"
            >
              <GripVertical className="w-3.5 h-3.5 opacity-70" />
              <span>#{index + 1}</span>
            </div>

            <span className="badge badge-indigo text-[10px] font-mono uppercase">
              {field.type}
            </span>

            {field.required ? (
              <span className="badge badge-rose text-[10px] flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Required
              </span>
            ) : (
              <span className="badge badge-cyan text-[10px]">
                Optional
              </span>
            )}

            <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] flex items-center gap-1">
              {field.width === 'half' ? (
                <>
                  <Columns className="w-2.5 h-2.5 text-amber-400" /> 50% Col
                </>
              ) : (
                <>
                  <Maximize2 className="w-2.5 h-2.5 text-indigo-400" /> Full Width
                </>
              )}
            </span>
          </div>

          {/* Action Toolbar (Duplicate & Delete) */}
          <div 
            className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity bg-slate-950/60 p-0.5 rounded-lg border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onDuplicate}
              className="p-1 rounded text-slate-400 hover:text-indigo-300 hover:bg-white/10 transition-colors"
              title="Duplicate question"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors"
              title="Delete question"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Field Content & Mock Input */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <label className="block text-sm font-semibold text-white">
              {field.label || 'Untitled Question'}
              {field.required && <span className="text-rose-400 ml-1 font-bold">*</span>}
            </label>
          </div>

          {field.helperText && (
            <p className="text-[11px] text-slate-400 mt-0.5 mb-2 leading-tight">
              {field.helperText}
            </p>
          )}

          {/* Input Placeholder Mock */}
          <div className="mt-2">
            {field.type === 'textarea' ? (
              <div className="w-full h-12 rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-xs text-slate-400 font-mono select-none flex items-start">
                <span>{field.placeholder || 'Long response paragraph text...'}</span>
              </div>
            ) : field.type === 'select' ? (
              <div className="space-y-1.5">
                <div className="w-full h-9 rounded-xl bg-slate-950/60 border border-white/10 px-3 flex items-center justify-between text-xs text-slate-400 select-none">
                  <span>{field.placeholder || 'Select an option...'}</span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {field.options?.length || 0} options
                  </span>
                </div>
                {field.options && field.options.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {field.options.slice(0, 3).map((opt, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 truncate max-w-[180px]">
                        {opt}
                      </span>
                    ))}
                    {field.options.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-mono">
                        +{field.options.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : field.type === 'radio' || field.type === 'checkbox' ? (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {(field.options && field.options.length > 0 ? field.options.slice(0, 4) : ['Option 1', 'Option 2']).map((opt, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/40 px-2.5 py-1 rounded-lg border border-white/10">
                    <span className={`w-2.5 h-2.5 rounded-${field.type === 'radio' ? 'full' : 'sm'} border border-slate-500 inline-block`} />
                    <span className="truncate max-w-[150px]">{opt}</span>
                  </div>
                ))}
              </div>
            ) : field.type === 'consent' ? (
              <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-3.5 h-3.5 mt-0.5 rounded border border-indigo-400/80 bg-indigo-950 inline-block flex-shrink-0" />
                <span className="text-[11px] text-slate-300/90 leading-snug">
                  {field.placeholder || 'Terms & condition consent agreement text'}
                </span>
              </div>
            ) : field.type === 'file' ? (
              <div className="w-full h-10 rounded-xl bg-slate-950/60 border border-dashed border-white/20 px-3 flex items-center justify-center text-xs text-slate-400 gap-2">
                <span>Attachment Upload (PDF, PNG, JPG up to 5MB)</span>
              </div>
            ) : (
              <div className="w-full h-9 rounded-xl bg-slate-950/60 border border-white/10 px-3 flex items-center text-xs text-slate-400 select-none">
                {field.placeholder || 'Enter value...'}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/[0.04]">
          <span className="flex items-center gap-1">
            <GripVertical className="w-3 h-3 text-slate-400" />
            <span>Drag card to reorder position</span>
          </span>
          {isSelected ? (
            <span className="text-indigo-400 font-semibold flex items-center gap-1">
              <Settings2 className="w-3 h-3" /> Active in Inspector
            </span>
          ) : null}
        </div>
      </div>

      {/* Visual Drop Line After */}
      {showIndicatorAfter && (
        <div className="absolute -bottom-2.5 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-400 rounded-full z-30 shadow-lg shadow-indigo-500/80 animate-pulse" />
      )}
    </div>
  );
}
