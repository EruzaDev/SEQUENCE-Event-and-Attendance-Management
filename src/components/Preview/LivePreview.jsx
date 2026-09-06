import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  Wand2, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { FormRenderer } from './FormRenderer.jsx';
import { QrPassModal } from './QrPassModal.jsx';
import { getPatternStyle } from '../../constants/themes.js';

export function LivePreview({
  settings,
  fields,
  theme,
  defaultViewport = 'desktop',
  selectedFieldId,
  hoveredFieldId,
  onSelectField,
  onHoverField
}) {
  const [viewport, setViewport] = useState(defaultViewport);
  const [formData, setFormData] = useState({});
  const [submittedRecord, setSubmittedRecord] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, expired: false });

  // Countdown timer calculation
  useEffect(() => {
    if (!settings.registrationDeadline) return;

    const timer = setInterval(() => {
      const target = new Date(settings.registrationDeadline).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown({ hours: 0, minutes: 0, seconds: 0, expired: true });
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ hours, minutes, seconds, expired: false });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.registrationDeadline]);

  // Autofill sample data for testing
  const handleAutofill = () => {
    const auto = {};
    const sampleNames = ['Alex Morgan', 'Sarah Chen', 'Marcus Vance', 'Elena Rostova'];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const allowedDomain = settings.allowedDomains?.[0] || 'example.com';

    fields.forEach(f => {
      if (f.label.toLowerCase().includes('name') || f.type === 'text' && !auto[f.id]) {
        if (!Object.values(auto).some(v => sampleNames.includes(v))) {
          auto[f.id] = randomName;
          return;
        }
      }
      if (f.type === 'email') {
        const slug = randomName.toLowerCase().replace(/\s+/g, '.');
        auto[f.id] = `${slug}@${allowedDomain}`;
      } else if (f.label.toLowerCase().includes('organization') || f.label.toLowerCase().includes('company')) {
        auto[f.id] = 'Apex Technologies';
      } else if (f.label.toLowerCase().includes('job') || f.label.toLowerCase().includes('role') || f.label.toLowerCase().includes('title')) {
        auto[f.id] = 'Director of Product';
      } else if (f.type === 'phone') {
        auto[f.id] = '+1 (555) 349-8821';
      } else if (f.type === 'select' && f.options?.length > 0) {
        auto[f.id] = f.options[0];
      } else if (f.type === 'radio' && f.options?.length > 0) {
        auto[f.id] = f.options[0];
      } else if (f.type === 'checkbox' && f.options?.length > 0) {
        auto[f.id] = [f.options[0]];
      } else if (f.type === 'consent') {
        auto[f.id] = true;
      } else if (f.type === 'textarea') {
        auto[f.id] = 'Looking forward to the keynote presentations, panel sessions, and networking with industry peers.';
      } else if (f.type === 'text') {
        auto[f.id] = 'General attendee response';
      }
    });

    setFormData(auto);
  };

  const handleReset = () => {
    setFormData({});
  };

  const handleSubmitRegistration = (submittedData) => {
    setSubmittedRecord(submittedData);
  };

  return (
    <div className="flex-1 bg-[#090d16] flex flex-col h-full overflow-hidden">
      
      {/* Viewport & Test Controls Bar */}
      <div className="px-6 py-2.5 bg-[#0e1424] border-b border-white/[0.08] flex items-center justify-between text-xs select-none z-20 shadow-sm">
        
        {/* Device Viewport switch */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all text-xs font-semibold ${
              viewport === 'desktop'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all text-xs font-semibold ${
              viewport === 'mobile'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Phone</span>
          </button>
        </div>

        {/* Live Attendee Notice */}
        <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">Attendee Registration Preview</span>
        </div>

        {/* Test Utilities */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAutofill}
            className="btn btn-secondary btn-sm text-xs flex items-center gap-1.5 border-amber-500/30 hover:border-amber-500/60 text-amber-200"
            title="Populate all fields with valid mock attendee data"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Autofill Sample</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-ghost btn-sm text-slate-400 hover:text-white text-xs"
            title="Clear all entered responses"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

      </div>

      {/* Main Preview Container with Dynamic Theme Background */}
      <div 
        className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center items-start transition-all duration-300"
        style={{
          backgroundColor: theme?.colors?.backgroundColor || '#090d16',
          ...(theme?.backgroundImage
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url(${theme.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }
            : getPatternStyle(theme?.decorations?.backgroundPattern, theme))
        }}
      >
        {viewport === 'mobile' ? (
          /* Mobile Frame Simulation */
          <div 
            className="mobile-frame"
            style={{
              backgroundColor: theme?.colors?.backgroundColor || '#090d16',
              ...(theme?.backgroundImage
                ? {
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${theme.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }
                : getPatternStyle(theme?.decorations?.backgroundPattern, theme))
            }}
          >
            <div className="mobile-notch" />
            <div className="mobile-content">
              {renderFormCard({
                settings,
                fields,
                theme,
                formData,
                setFormData,
                countdown,
                handleSubmitRegistration,
                selectedFieldId,
                hoveredFieldId,
                onSelectField,
                onHoverField,
                isMobile: true
              })}
            </div>
          </div>
        ) : (
          /* Desktop Container */
          <div className="w-full max-w-2xl space-y-6">
            {renderFormCard({
              settings,
              fields,
              theme,
              formData,
              setFormData,
              countdown,
              handleSubmitRegistration,
              selectedFieldId,
              hoveredFieldId,
              onSelectField,
              onHoverField,
              isMobile: false
            })}
          </div>
        )}
      </div>

      {/* QR Ticket Pass Modal */}
      {submittedRecord && (
        <QrPassModal
          attendeeRecord={submittedRecord}
          settings={settings}
          fields={fields}
          onClose={() => setSubmittedRecord(null)}
        />
      )}

    </div>
  );
}

function renderFormCard({
  settings,
  fields,
  theme,
  formData,
  setFormData,
  countdown,
  handleSubmitRegistration,
  selectedFieldId,
  hoveredFieldId,
  onSelectField,
  onHoverField,
  isMobile = false
}) {
  const isPixelTheme = theme?.presetId === 'minecraft_pixel' || theme?.typography?.fontHeading === 'Press Start 2P' || theme?.decorations?.cardRadius === '0px';

  // Dynamic heading size class
  const getHeadingSizeClass = () => {
    if (isPixelTheme) return isMobile ? 'text-xs leading-relaxed tracking-wider' : 'text-sm md:text-base leading-relaxed tracking-wider';
    const sz = theme?.typography?.headingSize || 'large';
    if (isMobile) {
      if (sz === 'xlarge') return 'text-xl font-extrabold tracking-tight';
      if (sz === 'large') return 'text-lg font-bold tracking-tight';
      return 'text-base font-bold tracking-tight';
    }
    if (sz === 'xlarge') return 'text-2xl md:text-3xl font-extrabold tracking-tight';
    if (sz === 'large') return 'text-xl md:text-2xl font-bold tracking-tight';
    return 'text-lg md:text-xl font-bold tracking-tight';
  };

  const cardStyle = {
    backgroundColor: theme?.colors?.cardBackground || 'rgba(17, 23, 40, 0.90)',
    borderColor: theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)',
    borderWidth: theme?.decorations?.cardBorderWidth || '1px',
    borderRadius: isMobile ? (isPixelTheme ? '0px' : '16px') : (theme?.decorations?.cardRadius || '16px'),
    boxShadow: isPixelTheme
      ? 'inset -4px -4px 0px 0px rgba(0,0,0,0.65), inset 4px 4px 0px 0px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.85)'
      : `0 20px 50px -15px ${theme?.colors?.primaryColor || '#6366f1'}30, 0 0 0 1px ${theme?.colors?.cardBorderColor || 'rgba(255,255,255,0.08)'}`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)'
  };

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-300 ${
        isMobile ? 'p-4 sm:p-5 space-y-4' : 'p-6 md:p-8 space-y-6'
      }`}
      style={cardStyle}
    >
      {/* Top Gradient Ribbon */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: isPixelTheme
            ? `repeating-linear-gradient(90deg, ${theme?.colors?.primaryColor || '#48a12e'} 0px, ${theme?.colors?.primaryColor || '#48a12e'} 16px, ${theme?.colors?.secondaryColor || '#2e6f1f'} 16px, ${theme?.colors?.secondaryColor || '#2e6f1f'} 32px)`
            : `linear-gradient(90deg, ${theme?.colors?.primaryColor || '#6366f1'} 0%, ${theme?.colors?.secondaryColor || '#8b5cf6'} 50%, ${theme?.colors?.accentColor || '#38bdf8'} 100%)`
        }}
      />

      {/* Registration Header */}
      <div 
        className={`${isMobile ? 'space-y-2 pb-3.5' : 'space-y-3 pb-6'} border-b`}
        style={{ borderColor: theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span 
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{
              backgroundColor: `${theme?.colors?.primaryColor || '#6366f1'}20`,
              color: theme?.colors?.primaryColor || '#6366f1',
              border: `1px solid ${theme?.colors?.primaryColor || '#6366f1'}40`,
              borderRadius: isPixelTheme ? '0px' : '9999px',
              fontFamily: isPixelTheme ? `'Press Start 2P', monospace` : undefined,
              fontSize: isPixelTheme ? '9px' : undefined
            }}
          >
            Registration Form
          </span>

          {settings.registrationDeadline && (
            <div className={`flex items-center gap-1.5 text-amber-300 bg-amber-950/50 rounded-full border border-amber-500/30 ${isMobile ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}`}>
              <Clock className="w-3 h-3 text-amber-400" />
              <span className="font-mono font-bold">
                {countdown.expired ? 'Closed' : `${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s remaining`}
              </span>
            </div>
          )}
        </div>

        <h1 
          className={getHeadingSizeClass()}
          style={{
            fontFamily: theme?.typography?.fontHeading || 'Outfit',
            color: theme?.colors?.textColor || '#ffffff'
          }}
        >
          {settings.eventName || 'Event Registration'}
        </h1>

        <p 
          className={`leading-relaxed ${isMobile ? 'text-[11px] line-clamp-2' : 'text-xs'}`}
          style={{
            fontFamily: theme?.typography?.fontBody || 'Plus Jakarta Sans',
            color: theme?.colors?.mutedTextColor || '#94a3b8'
          }}
        >
          {settings.eventDescription || 'Please fill out this form to register and receive your official digital entry pass.'}
        </p>

        {/* Metadata Badges */}
        <div className={`flex flex-wrap items-center ${isMobile ? 'gap-1.5 pt-1 text-[10px]' : 'gap-3 pt-2 text-xs'}`}>
          {settings.eventLocation && (
            <div 
              className={`flex items-center gap-1.5 border ${isMobile ? 'px-2 py-0.5 rounded-md' : 'px-2.5 py-1 rounded-lg'}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)',
                color: theme?.colors?.textColor || '#ffffff',
                borderRadius: isPixelTheme ? '0px' : (isMobile ? '6px' : '8px')
              }}
            >
              <MapPin className="w-3 h-3" style={{ color: theme?.colors?.primaryColor || '#6366f1' }} />
              <span>{settings.eventLocation}</span>
            </div>
          )}
          {settings.eventDate && (
            <div 
              className={`flex items-center gap-1.5 border ${isMobile ? 'px-2 py-0.5 rounded-md' : 'px-2.5 py-1 rounded-lg'}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)',
                color: theme?.colors?.textColor || '#ffffff',
                borderRadius: isPixelTheme ? '0px' : (isMobile ? '6px' : '8px')
              }}
            >
              <Calendar className="w-3 h-3" style={{ color: theme?.colors?.secondaryColor || '#8b5cf6' }} />
              <span>{new Date(settings.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}
          {settings.capacity && (
            <div 
              className={`flex items-center gap-1.5 border ${isMobile ? 'px-2 py-0.5 rounded-md' : 'px-2.5 py-1 rounded-lg'}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)',
                color: theme?.colors?.textColor || '#ffffff',
                borderRadius: isPixelTheme ? '0px' : (isMobile ? '6px' : '8px')
              }}
            >
              <Users className="w-3 h-3" style={{ color: theme?.colors?.accentColor || '#38bdf8' }} />
              <span>Limit: {settings.capacity} slots</span>
            </div>
          )}
        </div>
      </div>

      {/* Domain Policy Notice */}
      {settings.domainRestrictionMode === 'restricted' && settings.allowedDomains?.length > 0 && (
        <div 
          className={`rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 flex items-start gap-2 ${
            isMobile ? 'p-2.5 text-[11px]' : 'p-3.5 text-xs'
          }`}
          style={{ borderRadius: isPixelTheme ? '0px' : '14px' }}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Authorized Domain Requirement:</span>
            <p className="text-[10px] text-amber-200/90 mt-0.5">
              Only emails with <strong>{settings.allowedDomains.map(d => `@${d}`).join(', ')}</strong> are accepted for this event.
            </p>
          </div>
        </div>
      )}

      {/* Form Fields Component */}
      {fields.length > 0 ? (
        <FormRenderer
          settings={settings}
          fields={fields}
          theme={theme}
          formData={formData}
          setFormData={setFormData}
          onSubmitRegistration={handleSubmitRegistration}
          selectedFieldId={selectedFieldId}
          hoveredFieldId={hoveredFieldId}
          onSelectField={onSelectField}
          onHoverField={onHoverField}
          isMobile={isMobile}
        />
      ) : (
        <div className="text-center py-10 text-slate-400 text-xs">
          No fields configured for this registration form.
        </div>
      )}

    </div>
  );
}
