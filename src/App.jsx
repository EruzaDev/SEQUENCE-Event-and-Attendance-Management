import React, { useState, useEffect } from 'react';
import { AppHeader } from './components/Header/AppHeader.jsx';
import { FieldPalette } from './components/Builder/FieldPalette.jsx';
import { FormCanvas } from './components/Builder/FormCanvas.jsx';
import { FieldInspector } from './components/Builder/FieldInspector.jsx';
import { LivePreview } from './components/Preview/LivePreview.jsx';
import { FormSettingsModal } from './components/Settings/FormSettingsModal.jsx';
import { TemplatePickerModal } from './components/Common/TemplatePickerModal.jsx';
import { JsonSchemaModal } from './components/Common/JsonSchemaModal.jsx';
import { ThemeStudioModal } from './components/Theme/ThemeStudioModal.jsx';
import { DEFAULT_FORM } from './constants/defaultForm.js';
import { THEME_PRESETS } from './constants/themes.js';
import { createFieldInstance } from './types/formSchema.js';

const STORAGE_KEY = 'sequence_registration_form_v2';

export default function App() {
  // Load initial form from localStorage or fallback to default
  const [formSettings, setFormSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.settings) return parsed.settings;
      }
    } catch (e) {
      console.warn('Could not read saved form:', e);
    }
    return DEFAULT_FORM.settings;
  });

  const [fields, setFields] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.fields) && parsed.fields.length > 0) return parsed.fields;
      }
    } catch (e) {
      console.warn('Could not read saved form:', e);
    }
    return DEFAULT_FORM.fields;
  });

  // Theme state: presets, colors, logo extraction, backgrounds, fonts
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme) return parsed.theme;
      }
    } catch (e) {
      console.warn('Could not read saved theme:', e);
    }
    return THEME_PRESETS[0];
  });

  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [hoveredFieldId, setHoveredFieldId] = useState(null);
  const [activeView, setActiveView] = useState('builder'); // 'builder' | 'split' | 'preview'

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);
  const [isThemeStudioOpen, setIsThemeStudioOpen] = useState(false);

  // Auto-save form and theme to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        settings: formSettings,
        fields: fields,
        theme: currentTheme
      }));
    } catch (e) {
      console.error('Failed to auto-save to localStorage:', e);
    }
  }, [formSettings, fields, currentTheme]);

  // Update theme properties smoothly
  const handleUpdateTheme = (themeUpdates) => {
    setCurrentTheme(prev => ({
      ...prev,
      ...themeUpdates
    }));
  };

  // Selected field instance
  const selectedField = fields.find(f => f.id === selectedFieldId) || null;

  // Add field from palette
  const handleAddField = (paletteItem) => {
    const newField = createFieldInstance(paletteItem);
    setFields(prev => [...prev, newField]);
    setSelectedFieldId(newField.id);
  };

  // Update field properties
  const handleUpdateField = (fieldId, updates) => {
    setFields(prev => prev.map(f => f.id === fieldId ? { ...f, ...updates } : f));
  };

  // Reorder fields via drag and drop
  const handleReorderField = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    setFields(prev => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  // Insert field at specific drop index
  const handleInsertFieldAtIndex = (paletteItem, index) => {
    const newField = createFieldInstance(paletteItem);
    setFields(prev => {
      const copy = [...prev];
      copy.splice(index, 0, newField);
      return copy;
    });
    setSelectedFieldId(newField.id);
  };

  // Duplicate field
  const handleDuplicate = (index) => {
    setFields(prev => {
      const source = prev[index];
      const clone = {
        ...source,
        id: 'field_' + Math.random().toString(36).substring(2, 9),
        label: `${source.label} (Copy)`,
        options: source.options ? [...source.options] : []
      };
      const copy = [...prev];
      copy.splice(index + 1, 0, clone);
      setSelectedFieldId(clone.id);
      return copy;
    });
  };

  // Delete field
  const handleDeleteField = (fieldId) => {
    setFields(prev => prev.filter(f => f.id !== fieldId));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  // Clear all fields
  const handleClearFields = () => {
    if (window.confirm('Are you sure you want to clear all form fields?')) {
      setFields([]);
      setSelectedFieldId(null);
    }
  };

  // Select pre-built template
  const handleSelectTemplate = (template) => {
    setFormSettings({ ...template.settings });
    setFields(template.fields.map(f => ({ ...f, options: f.options ? [...f.options] : [] })));
    setSelectedFieldId(null);
  };

  // Import custom schema
  const handleImportSchema = (newSettings, newFields) => {
    setFormSettings(newSettings);
    setFields(newFields);
    setSelectedFieldId(null);
  };

  // Revert back to default
  const handleResetForm = () => {
    if (window.confirm('Reset registration form back to the default conference configuration?')) {
      setFormSettings({ ...DEFAULT_FORM.settings });
      setFields(DEFAULT_FORM.fields.map(f => ({ ...f, options: f.options ? [...f.options] : [] })));
      setCurrentTheme(THEME_PRESETS[0]);
      setSelectedFieldId(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="app-container">
      {/* App Navigation Bar */}
      <AppHeader
        activeView={activeView}
        setActiveView={setActiveView}
        settings={formSettings}
        fieldCount={fields.length}
        onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenSchema={() => setIsSchemaOpen(true)}
        onResetForm={handleResetForm}
      />

      {/* Main View Area */}
      <div className="main-content">
        {activeView === 'builder' && (
          <>
            {/* Left: Palette */}
            <FieldPalette onAddField={handleAddField} />

            {/* Center: Canvas */}
            <FormCanvas
              settings={formSettings}
              fields={fields}
              theme={currentTheme}
              selectedFieldId={selectedFieldId}
              hoveredFieldId={hoveredFieldId}
              onSelectField={setSelectedFieldId}
              onHoverField={setHoveredFieldId}
              onReorderField={handleReorderField}
              onInsertFieldAtIndex={handleInsertFieldAtIndex}
              onDuplicate={handleDuplicate}
              onDeleteField={handleDeleteField}
              onClearFields={handleClearFields}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenTemplates={() => setIsTemplatesOpen(true)}
              onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
            />

            {/* Right: Inspector */}
            <FieldInspector
              selectedField={selectedField}
              onUpdateField={handleUpdateField}
              onDeleteField={handleDeleteField}
              onClose={() => setSelectedFieldId(null)}
            />
          </>
        )}

        {activeView === 'split' && (
          <div className="flex w-full h-full">
            {/* Left Side: Canvas with Palette Drawer */}
            <div className="w-1/2 border-r border-white/10 flex flex-col h-full overflow-hidden">
              <div className="px-4 py-2 bg-black/40 border-b border-white/10 text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Builder Mode (Visual Canvas)</span>
                <span className="text-[10px] text-slate-400 font-mono">{fields.length} questions</span>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <FieldPalette onAddField={handleAddField} />
                <div className="flex-1 overflow-y-auto">
                  <FormCanvas
                    settings={formSettings}
                    fields={fields}
                    theme={currentTheme}
                    selectedFieldId={selectedFieldId}
                    hoveredFieldId={hoveredFieldId}
                    onSelectField={setSelectedFieldId}
                    onHoverField={setHoveredFieldId}
                    onReorderField={handleReorderField}
                    onInsertFieldAtIndex={handleInsertFieldAtIndex}
                    onDuplicate={handleDuplicate}
                    onDeleteField={handleDeleteField}
                    onClearFields={handleClearFields}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    onOpenTemplates={() => setIsTemplatesOpen(true)}
                    onOpenThemeStudio={() => setIsThemeStudioOpen(true)}
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Live Attendee Preview with Synchronized Highlighting */}
            <div className="w-1/2 flex flex-col h-full overflow-hidden">
              <div className="px-4 py-2 bg-black/40 border-b border-white/10 text-xs font-semibold text-emerald-300 flex items-center justify-between">
                <span>Live Interactive Attendee View</span>
                <span className="text-[10px] text-indigo-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Synchronized Focus
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <LivePreview
                  settings={formSettings}
                  fields={fields}
                  theme={currentTheme}
                  defaultViewport="desktop"
                  selectedFieldId={selectedFieldId}
                  hoveredFieldId={hoveredFieldId}
                  onSelectField={setSelectedFieldId}
                  onHoverField={setHoveredFieldId}
                />
              </div>
            </div>
          </div>
        )}

        {activeView === 'preview' && (
          <LivePreview
            settings={formSettings}
            fields={fields}
            theme={currentTheme}
            defaultViewport="desktop"
            selectedFieldId={selectedFieldId}
            hoveredFieldId={hoveredFieldId}
            onSelectField={setSelectedFieldId}
            onHoverField={setHoveredFieldId}
          />
        )}
      </div>

      {/* Modals */}
      {isThemeStudioOpen && (
        <ThemeStudioModal
          theme={currentTheme}
          onUpdateTheme={handleUpdateTheme}
          onClose={() => setIsThemeStudioOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <FormSettingsModal
          settings={formSettings}
          onSaveSettings={setFormSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isTemplatesOpen && (
        <TemplatePickerModal
          onSelectTemplate={handleSelectTemplate}
          onClose={() => setIsTemplatesOpen(false)}
        />
      )}

      {isSchemaOpen && (
        <JsonSchemaModal
          settings={formSettings}
          fields={fields}
          onImportSchema={handleImportSchema}
          onClose={() => setIsSchemaOpen(false)}
        />
      )}
    </div>
  );
}
