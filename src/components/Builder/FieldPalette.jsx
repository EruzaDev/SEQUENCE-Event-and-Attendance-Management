import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  School, 
  GraduationCap, 
  Layers, 
  Grid, 
  Type, 
  AlignLeft, 
  ChevronDown, 
  CircleDot, 
  CheckSquare, 
  UploadCloud, 
  Shirt, 
  Utensils, 
  ShieldCheck, 
  Plus, 
  Search, 
  Sparkles,
  GripVertical,
  Building2,
  Briefcase,
  MapPin
} from 'lucide-react';
import { AVAILABLE_FIELDS, FIELD_CATEGORIES } from '../../types/formSchema.js';

const ICON_MAP = {
  User,
  Mail,
  Phone,
  CreditCard,
  School,
  GraduationCap,
  Layers,
  Grid,
  Type,
  AlignLeft,
  ChevronDown,
  CircleDot,
  CheckSquare,
  UploadCloud,
  Shirt,
  Utensils,
  ShieldCheck,
  Building2,
  Briefcase,
  MapPin
};

export function FieldPalette({ onAddField }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [draggingField, setDraggingField] = useState(null);

  const filteredFields = AVAILABLE_FIELDS.filter(f => 
    f.defaultLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Object.values(FIELD_CATEGORIES);

  const handleDragStart = (e, item) => {
    setDraggingField(item);
    e.dataTransfer.setData('application/json', JSON.stringify({
      source: 'palette',
      fieldData: item
    }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggingField(null);
  };

  return (
    <aside className="sidebar-palette p-4 flex flex-col gap-4 border-r border-white/[0.08] bg-[#0c101c]/95 select-none">
      {/* Search & Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              Field Library
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
            {AVAILABLE_FIELDS.length} items
          </span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base text-xs pl-8 pr-3 py-2 bg-slate-950/60 border-white/10 focus:border-indigo-500 rounded-xl"
          />
        </div>
      </div>

      {/* Field List by Category */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {categories.map(category => {
          const items = filteredFields.filter(f => f.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1.5 flex items-center justify-between">
                <span>{category}</span>
                <span className="font-mono text-slate-400">{items.length}</span>
              </div>

              <div className="space-y-1">
                {items.map((item, idx) => {
                  const IconComp = ICON_MAP[item.icon] || Type;
                  const isBeingDragged = draggingField?.defaultLabel === item.defaultLabel;

                  return (
                    <div
                      key={idx}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, item)}
                      onDragEnd={handleDragEnd}
                      onClick={() => onAddField(item)}
                      className={`w-full text-left p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/80 border border-white/[0.05] hover:border-indigo-500/40 transition-all duration-150 group flex items-start gap-2.5 shadow-sm cursor-grab active:cursor-grabbing ${
                        isBeingDragged ? 'opacity-40 ring-2 ring-indigo-500' : ''
                      }`}
                      title="Drag onto canvas or click to add"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                            {item.defaultLabel}
                          </span>
                          <span className="flex items-center text-slate-400 group-hover:text-indigo-300 transition-colors">
                            <GripVertical className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredFields.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs">
            No form fields match "{searchQuery}"
          </div>
        )}
      </div>

      {/* Tip Banner */}
      <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-200/80 flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <span className="leading-tight">
          <strong>Drag & drop</strong> any question directly into position on the canvas, or click to append.
        </span>
      </div>
    </aside>
  );
}
