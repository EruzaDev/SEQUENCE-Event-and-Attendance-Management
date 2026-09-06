import React from 'react';
import { 
  Sparkles, 
  Settings, 
  Eye, 
  PenTool, 
  Columns, 
  FileCode2, 
  FolderDown, 
  RotateCcw, 
  Calendar, 
  Users,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Palette
} from 'lucide-react';

export function AppHeader({
  activeView,
  setActiveView,
  settings,
  fieldCount,
  onOpenThemeStudio,
  onOpenSettings,
  onOpenTemplates,
  onOpenSchema,
  onResetForm
}) {
  const isDomainRestricted = settings.domainRestrictionMode === 'restricted' && settings.allowedDomains?.length > 0;

  return (
    <header className="glass-header px-5 py-3 flex items-center justify-between gap-4 select-none z-30 relative border-b border-white/[0.08]">
      {/* Brand & Event Title */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-wider font-display text-white">
                SEQUENCE
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                Form Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[260px] flex items-center gap-1.5 mt-0.5">
              <span>{settings.eventName || 'Untitled Event'}</span>
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-white/10 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px]">
            <Users className="w-3 h-3 text-cyan-400" />
            Max {settings.capacity || '∞'}
          </span>
          {isDomainRestricted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[10px]" title={settings.allowedDomains.join(', ')}>
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              Restricted Domain
            </span>
          )}
          <span className="text-slate-400 font-mono text-[11px] ml-1">
            {fieldCount} question{fieldCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Segmented View Switcher */}
      <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-white/10 shadow-inner">
        <button
          onClick={() => setActiveView('builder')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
            activeView === 'builder'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Builder</span>
        </button>

        <button
          onClick={() => setActiveView('split')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
            activeView === 'split'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Columns className="w-3.5 h-3.5" />
          <span>Split</span>
        </button>

        <button
          onClick={() => setActiveView('preview')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
            activeView === 'preview'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenThemeStudio}
          className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5 border-pink-500/30 hover:border-pink-500/60 text-pink-300 bg-pink-950/20 hover:bg-pink-950/40 shadow-sm"
          title="Open Theme Studio to customize colors, textures, logo palette, and typography"
        >
          <Palette className="w-3.5 h-3.5 text-pink-400" />
          <span className="font-semibold">Theme Studio</span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse hidden sm:inline-block" />
        </button>

        <button
          onClick={onOpenTemplates}
          className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
          title="Choose a pre-built event registration template"
        >
          <FolderDown className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
          title="Configure event rules, domains, and capacity"
        >
          <Settings className="w-3.5 h-3.5 text-slate-300" />
          <span className="hidden sm:inline">Event Policies</span>
        </button>

        <button
          onClick={onOpenSchema}
          className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
          title="View, export, or import form JSON schema"
        >
          <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Schema JSON</span>
        </button>

        <button
          onClick={onResetForm}
          className="btn btn-ghost btn-icon btn-sm text-slate-400 hover:text-rose-400"
          title="Reset to default form"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
