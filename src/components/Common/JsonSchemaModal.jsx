import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  FileCode2, 
  AlertCircle 
} from 'lucide-react';

export function JsonSchemaModal({
  settings,
  fields,
  onImportSchema,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  const currentSchema = {
    version: '1.0.0',
    system: 'Sequence - Event & Attendance Management',
    exportedAt: new Date().toISOString(),
    event: settings,
    fields: fields
  };

  const schemaJsonString = JSON.stringify(currentSchema, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = (settings.eventName || 'registration_form').toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const blob = new Blob([schemaJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sequence_form_${slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyImport = () => {
    try {
      setImportError('');
      const parsed = JSON.parse(importText);
      if (!parsed || (!parsed.fields && !Array.isArray(parsed))) {
        throw new Error('Invalid schema format. Expected object with "fields" array or an array of fields.');
      }

      const importedSettings = parsed.event || parsed.settings || settings;
      const importedFields = Array.isArray(parsed) ? parsed : (parsed.fields || []);

      onImportSchema(importedSettings, importedFields);
      onClose();
    } catch (err) {
      setImportError(err.message || 'Failed to parse JSON schema');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-[650px]">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Form Schema Engine (JSON)</h2>
              <p className="text-xs text-slate-400">Portable representation for backend storage and API endpoints</p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost btn-icon btn-sm text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 px-4 bg-black/20">
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'export'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Export / View Schema
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'import'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Import Custom Schema
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'export' ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Ready to be saved into SQLite / PostgreSQL `events.registration_schema` JSON column.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="btn btn-primary btn-sm text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-black/60 border border-white/10 p-3.5 font-mono text-[11px] text-cyan-300/90 max-h-80 overflow-y-auto">
                <pre>{schemaJsonString}</pre>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-200">
                Paste valid Sequence Form JSON Schema:
              </label>

              {importError && (
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              <textarea
                rows={10}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder='Paste {"version": "1.0.0", "event": {...}, "fields": [...]} here'
                className="input-base text-xs font-mono resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleApplyImport}
                  disabled={!importText.trim()}
                  className="btn btn-primary btn-sm flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import & Apply Form Schema</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-white/10 bg-black/20 flex justify-end">
          <button onClick={onClose} className="btn btn-secondary btn-sm text-xs">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
