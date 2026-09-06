import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Layers, 
  Sparkles, 
  Info, 
  SlidersHorizontal, 
  FolderDown,
  GripVertical,
  Palette
} from 'lucide-react';
import { CanvasFieldItem } from './CanvasFieldItem.jsx';

export function FormCanvas({
  settings,
  fields,
  theme,
  selectedFieldId,
  hoveredFieldId,
  onSelectField,
  onHoverField,
  onReorderField,
  onInsertFieldAtIndex,
  onDuplicate,
  onDeleteField,
  onClearFields,
  onOpenSettings,
  onOpenTemplates,
  onOpenThemeStudio
}) {
  const [dropIndicator, setDropIndicator] = useState(null); // { index, position: 'before' | 'after' }
  const [isCanvasEndOver, setIsCanvasEndOver] = useState(false);

  const handleDragOverItem = (index, position) => {
    setDropIndicator({ index, position });
  };

  const handleDragLeaveItem = (index) => {
    if (dropIndicator && dropIndicator.index === index) {
      setDropIndicator(null);
    }
  };

  const handleDropOnItem = (data, targetIndex) => {
    const position = dropIndicator?.position || 'after';
    setDropIndicator(null);

    if (data.source === 'palette') {
      const insertAt = position === 'after' ? targetIndex + 1 : targetIndex;
      onInsertFieldAtIndex(data.fieldData, insertAt);
    } else if (data.source === 'canvas') {
      const fromIndex = data.index;
      if (fromIndex === targetIndex) return;

      let targetPos = position === 'after' ? targetIndex + 1 : targetIndex;
      if (fromIndex < targetPos) {
        targetPos = targetPos - 1;
      }
      onReorderField(fromIndex, targetPos);
    }
  };

  const handleCanvasEndDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCanvasEndOver(true);
  };

  const handleCanvasEndDragLeave = () => {
    setIsCanvasEndOver(false);
  };

  const handleCanvasEndDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCanvasEndOver(false);
    try {
      const raw = e.dataTransfer.getData('application/json');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.source === 'palette') {
        onInsertFieldAtIndex(data.fieldData, fields.length);
      } else if (data.source === 'canvas') {
        onReorderField(data.index, fields.length - 1);
      }
    } catch (err) {
      console.warn('Canvas end drop error:', err);
    }
  };

  return (
    <main className="canvas-area">
      <div className="form-canvas-wrapper">
        
        {/* Event Banner Hero Card */}
        <div 
          className="glass-panel p-6 md:p-7 relative overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-[#121829] to-[#0c111e]"
          style={{
            borderColor: theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)',
            borderRadius: theme?.decorations?.cardRadius || '16px'
          }}
        >
          {/* Glowing Top Ribbon */}
          <div 
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{
              background: `linear-gradient(90deg, ${theme?.colors?.primaryColor || '#6366f1'} 0%, ${theme?.colors?.secondaryColor || '#8b5cf6'} 50%, ${theme?.colors?.accentColor || '#38bdf8'} 100%)`
            }}
          />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border"
                  style={{
                    backgroundColor: `${theme?.colors?.primaryColor || '#6366f1'}20`,
                    color: theme?.colors?.primaryColor || '#6366f1',
                    borderColor: `${theme?.colors?.primaryColor || '#6366f1'}40`,
                    fontFamily: theme?.typography?.fontHeading === 'Press Start 2P' ? `'Press Start 2P', monospace` : undefined,
                    fontSize: theme?.typography?.fontHeading === 'Press Start 2P' ? '9px' : undefined
                  }}
                >
                  Event Registration Form
                </span>
                <span className="badge badge-emerald text-[11px] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Registration
                </span>
                {settings.registrationDeadline && (
                  <span className="badge badge-amber text-[10px] flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Closes {new Date(settings.registrationDeadline).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              <h1 
                className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight"
                style={{
                  fontFamily: theme?.typography?.fontHeading || 'Outfit',
                  color: theme?.colors?.textColor || '#ffffff'
                }}
              >
                {settings.eventName || 'Untitled Event Registration'}
              </h1>
              
              <p 
                className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed"
                style={{
                  fontFamily: theme?.typography?.fontBody || 'Plus Jakarta Sans',
                  color: theme?.colors?.mutedTextColor || '#94a3b8'
                }}
              >
                {settings.eventDescription || 'No description provided. Click "Configure Policies" to set event rules.'}
              </p>

              {/* Event Metadata Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                {settings.eventLocation && (
                  <div className="flex items-center gap-1.5 text-slate-200 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                    <MapPin className="w-3.5 h-3.5" style={{ color: theme?.colors?.primaryColor || '#6366f1' }} />
                    <span>{settings.eventLocation}</span>
                  </div>
                )}
                {settings.eventDate && (
                  <div className="flex items-center gap-1.5 text-slate-200 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                    <Calendar className="w-3.5 h-3.5" style={{ color: theme?.colors?.secondaryColor || '#8b5cf6' }} />
                    <span>{new Date(settings.eventDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-slate-200 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/5">
                  <Users className="w-3.5 h-3.5" style={{ color: theme?.colors?.accentColor || '#38bdf8' }} />
                  <span>Capacity: <strong className="text-white font-mono">{settings.capacity || 'Unlimited'}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 self-start flex-shrink-0">
              <button
                onClick={onOpenThemeStudio}
                className="btn btn-secondary btn-sm flex items-center gap-1.5 border-pink-500/30 text-pink-300 hover:border-pink-500/60 bg-pink-950/20 shadow-sm"
                title="Open Theme Studio to customize colors, textures, logo palette, and typography"
              >
                <Palette className="w-3.5 h-3.5 text-pink-400" />
                <span className="font-medium truncate max-w-[130px]">{theme?.name || 'Theme Studio'}</span>
              </button>

              <button
                onClick={onOpenSettings}
                className="btn btn-secondary btn-sm flex items-center gap-1.5 shadow-sm"
                title="Edit event title, banner, deadline, and domain restrictions"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Configure Policies</span>
              </button>
            </div>
          </div>
        </div>

        {/* Builder Toolbar & Stats */}
        <div className="flex items-center justify-between px-1 text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-slate-200">
              Form Structure
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              {fields.length} question{fields.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {fields.length > 0 && (
              <button
                onClick={onClearFields}
                className="btn btn-ghost btn-sm text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Fields Grid Canvas */}
        {fields.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, idx) => (
              <CanvasFieldItem
                key={field.id}
                field={field}
                index={idx}
                totalFields={fields.length}
                isSelected={field.id === selectedFieldId}
                isHovered={field.id === hoveredFieldId}
                onSelect={() => onSelectField(field.id)}
                onHover={onHoverField}
                onDuplicate={() => onDuplicate(idx)}
                onDelete={() => onDeleteField(field.id)}
                onDragStartItem={() => {}}
                onDragOverItem={handleDragOverItem}
                onDragLeaveItem={handleDragLeaveItem}
                onDropOnItem={handleDropOnItem}
                dropIndicator={dropIndicator}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div 
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={handleCanvasEndDrop}
            className="glass-panel p-12 text-center border-dashed border-2 border-white/15 flex flex-col items-center justify-center gap-3.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Your registration form is empty</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                Drag any question from the left Field Library and drop it right here, or load a pre-configured template.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenTemplates}
                className="btn btn-primary btn-sm flex items-center gap-1.5"
              >
                <FolderDown className="w-3.5 h-3.5" />
                <span>Load Event Preset</span>
              </button>
            </div>
          </div>
        )}

        {/* Dropzone at Bottom of Canvas */}
        {fields.length > 0 && (
          <div
            onDragOver={handleCanvasEndDragOver}
            onDragLeave={handleCanvasEndDragLeave}
            onDrop={handleCanvasEndDrop}
            className={`w-full p-4 rounded-2xl border-2 border-dashed transition-all duration-200 flex items-center justify-center gap-2 text-xs select-none ${
              isCanvasEndOver
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 scale-[1.01] shadow-lg shadow-indigo-500/20'
                : 'bg-slate-950/20 border-white/10 text-slate-400 hover:border-white/20'
            }`}
          >
            <GripVertical className="w-4 h-4 text-slate-400" />
            <span>Drag questions here to place at the end of the form</span>
          </div>
        )}

        {/* Bottom Status Tip */}
        <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>Drag items from the left palette to insert anywhere, or drag cards on the canvas to reorder.</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Auto-saved
          </span>
        </div>

      </div>
    </main>
  );
}
