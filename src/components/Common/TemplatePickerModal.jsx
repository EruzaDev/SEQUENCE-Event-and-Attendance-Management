import React from 'react';
import { 
  X, 
  Sparkles, 
  Code2, 
  Laptop, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Users
} from 'lucide-react';
import { FORM_TEMPLATES } from '../../constants/templates.js';

const ICON_MAP = {
  Sparkles,
  Code2,
  Laptop
};

export function TemplatePickerModal({
  onSelectTemplate,
  onClose
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-[700px]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Event Registration Templates</h2>
              <p className="text-xs text-slate-400">Select a pre-built form configuration tailored for campus & community events</p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon btn-sm text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          {FORM_TEMPLATES.map(tmpl => {
            const IconComp = ICON_MAP[tmpl.icon] || Sparkles;

            return (
              <div
                key={tmpl.id}
                className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-indigo-500/40 transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {tmpl.title}
                      </h3>
                      <span className="badge badge-indigo text-[10px]">
                        {tmpl.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tmpl.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                      <span className="text-slate-300 font-mono">
                        {tmpl.fields.length} configured fields
                      </span>
                      <span>•</span>
                      <span>
                        Capacity: {tmpl.settings.capacity || 'Unlimited'}
                      </span>
                      <span>•</span>
                      <span>
                        {tmpl.settings.domainRestrictionMode === 'restricted' ? 'Domain Restricted' : 'Open Registration'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectTemplate(tmpl);
                    onClose();
                  }}
                  className="btn btn-secondary group-hover:btn-primary btn-sm flex-shrink-0 flex items-center gap-1.5 w-full md:w-auto"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs text-slate-400">
          <span>Loading a template will replace your current form canvas fields.</span>
          <button onClick={onClose} className="btn btn-ghost btn-sm text-xs">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
