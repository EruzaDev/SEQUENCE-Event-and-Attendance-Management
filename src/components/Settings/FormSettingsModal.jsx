import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Settings, 
  ShieldAlert, 
  Clock, 
  Users, 
  QrCode, 
  Mail, 
  Calendar, 
  MapPin, 
  Plus, 
  Check,
  AlertTriangle
} from 'lucide-react';

export function FormSettingsModal({
  settings,
  onSaveSettings,
  onClose
}) {
  const [formData, setFormData] = useState({ ...settings });
  const [newDomainInput, setNewDomainInput] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddDomain = (e) => {
    e?.preventDefault();
    const clean = newDomainInput.trim().toLowerCase().replace(/^@/, '');
    if (!clean) return;
    if (!(formData.allowedDomains || []).includes(clean)) {
      setFormData(prev => ({
        ...prev,
        allowedDomains: [...(prev.allowedDomains || []), clean]
      }));
    }
    setNewDomainInput('');
  };

  const handleRemoveDomain = (domainToRemove) => {
    setFormData(prev => ({
      ...prev,
      allowedDomains: (prev.allowedDomains || []).filter(d => d !== domainToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Event Registration Policies</h2>
              <p className="text-xs text-slate-400">Configure attendance caps, deadlines, domain security, and pass settings</p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon btn-sm text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Section 1: Event Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <span>Event Details & Overview</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">Event Title</label>
              <input
                type="text"
                value={formData.eventName || ''}
                onChange={(e) => handleChange('eventName', e.target.value)}
                className="input-base text-xs"
                placeholder="e.g. Global Tech & Innovation Summit 2026"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">Event Description / Guidelines</label>
              <textarea
                rows={2}
                value={formData.eventDescription || ''}
                onChange={(e) => handleChange('eventDescription', e.target.value)}
                className="input-base text-xs resize-none"
                placeholder="Summary displayed at the top of the participant registration page"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-400" /> Venue / Location
                </label>
                <input
                  type="text"
                  value={formData.eventLocation || ''}
                  onChange={(e) => handleChange('eventLocation', e.target.value)}
                  className="input-base text-xs"
                  placeholder="e.g. Convention Center / Grand Ballroom & Online"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" /> Event Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.eventDate || ''}
                  onChange={(e) => handleChange('eventDate', e.target.value)}
                  className="input-base text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Registration Schedule & Capacity */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span>Capacity & Registration Window</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> Registration Deadline
                </label>
                <input
                  type="datetime-local"
                  value={formData.registrationDeadline || ''}
                  onChange={(e) => handleChange('registrationDeadline', e.target.value)}
                  className="input-base text-xs"
                />
                <p className="text-[10px] text-slate-400">
                  Form will automatically show countdown and lock once deadline passes.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-400" /> Participant Limit (Capacity)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={formData.capacity || ''}
                  onChange={(e) => handleChange('capacity', parseInt(e.target.value) || 0)}
                  className="input-base text-xs"
                  placeholder="e.g. 350"
                />
                <p className="text-[10px] text-slate-400">
                  Leave empty for unlimited attendance.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Domain Access Control */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Email Domain Restrictions</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Limit registrations to specific corporate or organization email domains
                </p>
              </div>

              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => handleChange('domainRestrictionMode', 'restricted')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    formData.domainRestrictionMode === 'restricted'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Restricted
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('domainRestrictionMode', 'any')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    formData.domainRestrictionMode === 'any'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Open / Any
                </button>
              </div>
            </div>

            {formData.domainRestrictionMode === 'restricted' && (
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">
                    Allowed Domains List:
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const sampleDomains = ['company.com', 'partner.org'];
                        setFormData(prev => ({
                          ...prev,
                          allowedDomains: Array.from(new Set([...(prev.allowedDomains || []), ...sampleDomains]))
                        }));
                      }}
                      className="text-[10px] text-amber-300 hover:underline"
                    >
                      + Add Example Domain
                    </button>
                  </div>
                </div>

                {/* Domain Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {(formData.allowedDomains || []).map((domain) => (
                    <span
                      key={domain}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-mono"
                    >
                      <span>@{domain}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDomain(domain)}
                        className="text-amber-300 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {(formData.allowedDomains || []).length === 0 && (
                    <span className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> No domains specified! Form will block all registrations until a domain is added.
                    </span>
                  )}
                </div>

                {/* Add Custom Domain Form */}
                <div className="flex gap-2 pt-1">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">@</span>
                    <input
                      type="text"
                      value={newDomainInput}
                      onChange={(e) => setNewDomainInput(e.target.value)}
                      placeholder="e.g. g.batstate-u.edu.ph or partner-tech.com"
                      className="input-base text-xs pl-7"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddDomain}
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Domain</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Pass & Verification */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span>Digital Passes & Security</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Instant QR Ticket Pass</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Generate digital ticket with barcode on successful submission
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!!formData.enableQrPass}
                    onChange={(e) => handleChange('enableQrPass', e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>OTP Email Verification</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Require 6-digit confirmation code sent to email
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!!formData.requireOtp}
                    onChange={(e) => handleChange('requireOtp', e.target.checked)}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-200">
                Digital Pass Ticket Prefix Code
              </label>
              <input
                type="text"
                value={formData.ticketPrefix || ''}
                onChange={(e) => handleChange('ticketPrefix', e.target.value.toUpperCase())}
                className="input-base text-xs font-mono"
                placeholder="e.g. SUMMIT or CONF26"
                maxLength={8}
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Policy Settings</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
