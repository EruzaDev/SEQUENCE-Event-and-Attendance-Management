import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  X, 
  Download, 
  CheckCircle2, 
  QrCode, 
  Calendar, 
  MapPin, 
  User, 
  Copy, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export function QrPassModal({
  attendeeRecord,
  settings,
  fields,
  onClose
}) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [ticketNumber] = useState(() => {
    const prefix = settings.ticketPrefix || 'SEQ26';
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${rand}`;
  });

  // Extract attendee display info
  const nameField = fields.find(f => f.label.toLowerCase().includes('name') || f.type === 'text');
  const emailField = fields.find(f => f.type === 'email');
  const orgField = fields.find(f => f.label.toLowerCase().includes('organization') || f.label.toLowerCase().includes('company') || f.label.toLowerCase().includes('affiliation'));
  const roleField = fields.find(f => f.label.toLowerCase().includes('job') || f.label.toLowerCase().includes('role') || f.label.toLowerCase().includes('title'));
  const tierField = fields.find(f => f.label.toLowerCase().includes('tier') || f.label.toLowerCase().includes('type') || f.label.toLowerCase().includes('category'));

  const attendeeName = (nameField && attendeeRecord[nameField.id]) || 'Registered Attendee';
  const attendeeEmail = (emailField && attendeeRecord[emailField.id]) || 'attendee@example.com';
  const organization = (orgField && attendeeRecord[orgField.id]) || '';
  const roleTitle = (roleField && attendeeRecord[roleField.id]) || '';
  const ticketTier = (tierField && attendeeRecord[tierField.id]) || 'Standard Admission';

  // Fire celebratory confetti on open
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }, []);

  // Generate QR Code
  useEffect(() => {
    if (!canvasRef.current) return;

    const qrPayload = JSON.stringify({
      ticket: ticketNumber,
      event: settings.eventName,
      name: attendeeName,
      email: attendeeEmail,
      org: organization,
      role: roleTitle,
      tier: ticketTier,
      ts: new Date().toISOString()
    });

    QRCode.toCanvas(canvasRef.current, qrPayload, {
      width: 190,
      margin: 1.5,
      color: {
        dark: '#0a0e1a',
        light: '#ffffff'
      }
    }, (error) => {
      if (error) console.error('QR generation error:', error);
    });
  }, [ticketNumber, settings.eventName, attendeeName, attendeeEmail, studentId]);

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTicket = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `${ticketNumber}-${attendeeName.replace(/\s+/g, '_')}-Ticket.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-[480px] bg-[#0c101c] border-white/15">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="badge badge-emerald text-xs flex items-center gap-1.5 px-3 py-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Registration Confirmed
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Digital Badge Card */}
          <div 
            className="rounded-3xl p-6 relative overflow-hidden border border-white/15 shadow-2xl flex flex-col items-center text-center bg-gradient-to-b from-[#131b2e] to-[#0a0f1d]"
            style={{
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.25)'
            }}
          >
            {/* Top Luminous Bar */}
            <div 
              className="absolute top-0 left-0 right-0 h-2"
              style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)'
              }}
            />

            {/* Event Name & Org Branding */}
            <div className="mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 font-mono">
                SEQUENCE EVENT PASS
              </span>
              <h3 className="text-base font-bold text-white leading-tight mt-1 max-w-[320px]">
                {settings.eventName}
              </h3>
              {settings.eventLocation && (
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mt-1">
                  <MapPin className="w-3 h-3 text-indigo-400" />
                  <span>{settings.eventLocation}</span>
                </div>
              )}
            </div>

            {/* QR Code Container */}
            <div className="p-2.5 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-indigo-500/30">
              <canvas ref={canvasRef} className="rounded-lg" />
            </div>

            {/* Ticket Code Tag */}
            <div className="mt-3.5 flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/40 shadow-inner">
                {ticketNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyTicket}
                className="text-slate-400 hover:text-white text-xs p-1"
                title="Copy ticket code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Attendee Details */}
            <div className="w-full mt-4 pt-4 border-t border-white/10 space-y-1">
              <span className="inline-block text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 mb-1">
                {ticketTier}
              </span>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {attendeeName}
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                {attendeeEmail}
              </p>
              
              {(organization || roleTitle) && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs">
                  {roleTitle && (
                    <span className="text-[11px] font-medium text-slate-200">
                      {roleTitle}
                    </span>
                  )}
                  {organization && roleTitle && <span className="text-slate-500">•</span>}
                  {organization && (
                    <span className="text-[11px] font-medium text-slate-300">
                      {organization}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Verification Watermark */}
            <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Entry Ticket
              </span>
              <span>Issued {new Date().toLocaleDateString()}</span>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={handleDownloadTicket}
              className="btn btn-primary flex-1 text-xs py-2.5 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 rounded-xl"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Digital Ticket</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary text-xs px-5 rounded-xl"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
