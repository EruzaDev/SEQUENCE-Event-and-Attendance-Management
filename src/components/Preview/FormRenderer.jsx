import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Upload, 
  Send, 
  Asterisk, 
  Sparkles,
  FileCheck,
  ShieldCheck,
  Check
} from 'lucide-react';

export function FormRenderer({
  settings,
  fields,
  theme,
  onSubmitRegistration,
  formData,
  setFormData,
  selectedFieldId,
  hoveredFieldId,
  onSelectField,
  onHoverField,
  isMobile = false
}) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const handleCheckboxToggle = (fieldId, option) => {
    const current = Array.isArray(formData[fieldId]) ? formData[fieldId] : [];
    const next = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    handleInputChange(fieldId, next);
  };

  const handleFileChange = (fieldId, file) => {
    if (file) {
      handleInputChange(fieldId, {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach(field => {
      const val = formData[field.id];

      // Required check
      if (field.required) {
        if (val === undefined || val === null || val === '') {
          newErrors[field.id] = `${field.label} is required`;
        } else if (Array.isArray(val) && val.length === 0) {
          newErrors[field.id] = `Please select at least one option`;
        } else if (field.type === 'consent' && !val) {
          newErrors[field.id] = `You must agree to continue`;
        }
      }

      // Email domain validation
      if (field.type === 'email' && val) {
        const emailStr = String(val).trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailStr)) {
          newErrors[field.id] = 'Please enter a valid email address';
        } else if (settings.domainRestrictionMode === 'restricted' && settings.allowedDomains?.length > 0) {
          const emailDomain = emailStr.split('@')[1];
          const isAllowed = settings.allowedDomains.some(d => d.toLowerCase() === emailDomain);
          if (!isAllowed) {
            newErrors[field.id] = `Only @${settings.allowedDomains.join(' and @')} email domains are accepted`;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmitRegistration(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={isMobile ? "space-y-3" : "space-y-4"} noValidate>
      {/* Validation alert if errors exist */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-200">Please review the following requirements:</span>
            <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-rose-300/90">
              {Object.values(errors).slice(0, 3).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
              {Object.values(errors).length > 3 && (
                <li>And {Object.values(errors).length - 3} other issue(s)...</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Grid of Dynamic Form Inputs */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isMobile ? 'gap-2.5' : 'gap-4'}`}>
        {fields.map(field => {
          const isHalf = field.width === 'half';
          const val = formData[field.id] !== undefined ? formData[field.id] : '';
          const hasError = !!errors[field.id];
          const isSelected = selectedFieldId === field.id;
          const isHovered = hoveredFieldId === field.id;
          const isHighlighted = isSelected || isHovered;
          const isPixelTheme = theme?.presetId === 'minecraft_pixel' || theme?.typography?.fontHeading === 'Press Start 2P' || theme?.decorations?.cardRadius === '0px';

          // Dynamic density padding
          const inputDensityClass = isMobile
            ? (theme?.typography?.inputSize === 'spacious' ? 'py-2 px-3 text-xs' : 'py-1.5 px-2.5 text-xs')
            : (theme?.typography?.inputSize === 'spacious'
                ? 'py-3 px-3.5 text-sm'
                : theme?.typography?.inputSize === 'compact'
                ? 'py-1.5 px-2.5 text-xs'
                : 'py-2 px-3 text-xs');

          const inputStyle = {
            backgroundColor: theme?.colors?.inputBackground || 'rgba(10, 14, 25, 0.85)',
            borderColor: hasError ? '#ef4444' : (theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.12)'),
            color: theme?.colors?.textColor || '#ffffff',
            borderRadius: isPixelTheme ? '0px' : '10px',
            fontFamily: theme?.typography?.fontBody || 'Plus Jakarta Sans'
          };

          const highlightStyle = isHighlighted ? {
            boxShadow: isPixelTheme 
              ? `0 0 0 3px ${theme?.colors?.primaryColor || '#48a12e'}` 
              : `0 0 30px ${theme?.colors?.primaryColor || '#6366f1'}40`,
            borderColor: theme?.colors?.primaryColor || '#6366f1',
            backgroundColor: `${theme?.colors?.primaryColor || '#6366f1'}15`,
            borderRadius: isPixelTheme ? '0px' : '14px'
          } : {};

          return (
            <div
              key={field.id}
              onClick={() => onSelectField && onSelectField(field.id)}
              onMouseEnter={() => onHoverField && onHoverField(field.id)}
              onMouseLeave={() => onHoverField && onHoverField(null)}
              style={highlightStyle}
              className={`space-y-1.5 transition-all duration-200 cursor-pointer ${
                isHalf ? 'col-span-1' : 'col-span-1 md:col-span-2'
              } ${
                isHighlighted
                  ? 'p-2.5 -m-2.5 border'
                  : 'p-0'
              }`}
            >
              {/* Field Label */}
              {field.type !== 'consent' && (
                <div className="flex items-center justify-between gap-1">
                  <label 
                    className="block font-semibold text-slate-200"
                    style={{
                      fontFamily: isPixelTheme ? `'Press Start 2P', monospace` : (theme?.typography?.fontBody || 'Plus Jakarta Sans'),
                      fontSize: isPixelTheme ? '10px' : (theme?.typography?.inputSize === 'spacious' ? '13px' : '12px'),
                      color: theme?.colors?.textColor || '#f8fafc',
                      lineHeight: isPixelTheme ? '1.6' : '1.3'
                    }}
                  >
                    {field.label}
                    {field.required && <span className="text-rose-400 ml-1 font-bold">*</span>}
                  </label>
                  {isHighlighted && (
                    <span 
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full animate-pulse border"
                      style={{
                        backgroundColor: `${theme?.colors?.primaryColor || '#6366f1'}25`,
                        color: theme?.colors?.primaryColor || '#6366f1',
                        borderColor: `${theme?.colors?.primaryColor || '#6366f1'}50`,
                        borderRadius: isPixelTheme ? '0px' : '9999px',
                        fontFamily: isPixelTheme ? `'Press Start 2P', monospace` : undefined
                      }}
                    >
                      {isSelected ? 'Active' : 'Focused'}
                    </span>
                  )}
                </div>
              )}

              {/* Input Variants */}
              {field.type === 'textarea' ? (
                <textarea
                  rows={3}
                  value={val}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  placeholder={field.placeholder || ''}
                  style={inputStyle}
                  className={`input-base border resize-none ${inputDensityClass} ${
                    hasError ? 'ring-1 ring-rose-500' : ''
                  }`}
                />
              ) : field.type === 'select' ? (
                <select
                  value={val}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  style={inputStyle}
                  className={`input-base border ${inputDensityClass} ${
                    hasError ? 'ring-1 ring-rose-500' : ''
                  }`}
                >
                  <option value="" disabled className="text-slate-400">
                    {field.placeholder || 'Select an option...'}
                  </option>
                  {(field.options || []).map((opt, i) => (
                    <option key={i} value={opt} className="bg-slate-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === 'radio' ? (
                <div className="space-y-1.5 pt-0.5">
                  {(field.options || []).map((opt, i) => {
                    const isChecked = val === opt;
                    return (
                      <label
                        key={i}
                        style={{
                          backgroundColor: isChecked
                            ? `${theme?.colors?.primaryColor || '#6366f1'}20`
                            : (theme?.colors?.inputBackground || 'rgba(10, 14, 25, 0.85)'),
                          borderColor: isChecked
                            ? (theme?.colors?.primaryColor || '#6366f1')
                            : (theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)'),
                          borderRadius: isPixelTheme ? '0px' : '12px'
                        }}
                        className={`flex items-center gap-2.5 p-2.5 border text-xs cursor-pointer transition-all duration-150 ${
                          isChecked ? 'text-white shadow-sm' : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span 
                          style={{
                            borderColor: isChecked ? (theme?.colors?.primaryColor || '#6366f1') : '#64748b',
                            backgroundColor: isChecked ? (theme?.colors?.primaryColor || '#6366f1') : 'transparent',
                            borderRadius: isPixelTheme ? '0px' : '9999px'
                          }}
                          className="w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0"
                        >
                          {isChecked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span style={{ fontFamily: theme?.typography?.fontBody || 'Plus Jakarta Sans' }}>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              ) : field.type === 'checkbox' ? (
                <div className="space-y-1.5 pt-0.5">
                  {(field.options || []).map((opt, i) => {
                    const checked = Array.isArray(val) && val.includes(opt);
                    return (
                      <label
                        key={i}
                        style={{
                          backgroundColor: checked
                            ? `${theme?.colors?.primaryColor || '#6366f1'}20`
                            : (theme?.colors?.inputBackground || 'rgba(10, 14, 25, 0.85)'),
                          borderColor: checked
                            ? (theme?.colors?.primaryColor || '#6366f1')
                            : (theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)'),
                          borderRadius: isPixelTheme ? '0px' : '12px'
                        }}
                        className={`flex items-center gap-2.5 p-2.5 border text-xs cursor-pointer transition-all duration-150 ${
                          checked ? 'text-white shadow-sm' : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span 
                          style={{
                            borderColor: checked ? (theme?.colors?.primaryColor || '#6366f1') : '#64748b',
                            backgroundColor: checked ? (theme?.colors?.primaryColor || '#6366f1') : 'transparent',
                            borderRadius: isPixelTheme ? '0px' : '4px'
                          }}
                          className="w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0"
                        >
                          {checked && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </span>
                        <span style={{ fontFamily: theme?.typography?.fontBody || 'Plus Jakarta Sans' }}>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              ) : field.type === 'consent' ? (
                <label 
                  style={{
                    backgroundColor: val
                      ? `${theme?.colors?.primaryColor || '#6366f1'}20`
                      : (theme?.colors?.inputBackground || 'rgba(10, 14, 25, 0.85)'),
                    borderColor: val
                      ? (theme?.colors?.primaryColor || '#6366f1')
                      : (theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.1)'),
                    borderRadius: isPixelTheme ? '0px' : '14px'
                  }}
                  className={`flex items-start gap-3 p-3.5 border text-xs cursor-pointer transition-all ${
                    hasError ? 'border-rose-500 ring-1 ring-rose-500' : ''
                  }`}
                >
                  <span 
                    style={{
                      borderColor: val ? (theme?.colors?.primaryColor || '#6366f1') : '#64748b',
                      backgroundColor: val ? (theme?.colors?.primaryColor || '#6366f1') : 'transparent',
                      borderRadius: isPixelTheme ? '0px' : '4px'
                    }}
                    className="w-4 h-4 mt-0.5 border flex items-center justify-center flex-shrink-0"
                  >
                    {val && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </span>
                  <div className="space-y-0.5">
                    <span 
                      className="font-semibold"
                      style={{
                        fontFamily: isPixelTheme ? `'Press Start 2P', monospace` : (theme?.typography?.fontBody || 'Plus Jakarta Sans'),
                        fontSize: isPixelTheme ? '10px' : '12px',
                        color: theme?.colors?.textColor || '#ffffff'
                      }}
                    >
                      {field.label} {field.required && <span className="text-rose-400 font-bold">*</span>}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {field.placeholder || 'I acknowledge and agree to the event regulations and data privacy guidelines.'}
                    </p>
                  </div>
                </label>
              ) : field.type === 'file' ? (
                <div 
                  style={{
                    backgroundColor: val ? 'rgba(16, 185, 129, 0.1)' : (theme?.colors?.inputBackground || 'rgba(10, 14, 25, 0.85)'),
                    borderColor: val ? '#10b981' : (theme?.colors?.cardBorderColor || 'rgba(255, 255, 255, 0.15)'),
                    borderRadius: isPixelTheme ? '0px' : '14px'
                  }}
                  className={`p-4 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
                    hasError ? 'border-rose-500' : ''
                  }`}
                >
                  {val ? (
                    <div className="flex items-center gap-2 text-xs">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-white">{val.name}</span>
                      <span className="text-[10px] text-slate-400">({val.size})</span>
                      <button
                        type="button"
                        onClick={() => handleInputChange(field.id, null)}
                        className="text-rose-400 text-[10px] underline ml-2 hover:text-rose-300"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer space-y-1">
                      <Upload className="w-5 h-5 mx-auto text-slate-400" />
                      <span 
                        className="text-xs font-semibold block"
                        style={{ color: theme?.colors?.primaryColor || '#6366f1' }}
                      >
                        Upload Document or Image
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        PNG, JPG, PDF up to 5MB
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(field.id, e.target.files?.[0])}
                      />
                    </label>
                  )}
                </div>
              ) : (
                <input
                  type={field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text'}
                  value={val}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  placeholder={field.placeholder || ''}
                  style={inputStyle}
                  className={`input-base border ${inputDensityClass} ${
                    hasError ? 'ring-1 ring-rose-500' : ''
                  }`}
                />
              )}

              {/* Helper text or Error message */}
              {hasError ? (
                <p className="text-[10px] text-rose-400 font-medium">
                  {errors[field.id]}
                </p>
              ) : field.helperText ? (
                <p className="text-[10px] text-slate-400">
                  {field.helperText}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      <div className="pt-4">
        {(() => {
          const isPixelTheme = theme?.presetId === 'minecraft_pixel' || theme?.typography?.fontHeading === 'Press Start 2P' || theme?.decorations?.buttonStyle === 'pixel';
          const isSolid = theme?.decorations?.buttonStyle === 'solid';

          const submitButtonStyle = isPixelTheme ? {
            backgroundColor: theme?.colors?.primaryColor || '#48a12e',
            border: '3px solid #152212',
            boxShadow: 'inset -3px -3px 0px 0px rgba(0,0,0,0.65), inset 3px 3px 0px 0px rgba(255,255,255,0.4)',
            fontFamily: `'Press Start 2P', monospace`,
            borderRadius: '0px',
            color: '#ffffff',
            letterSpacing: '0.04em'
          } : isSolid ? {
            backgroundColor: theme?.colors?.primaryColor || '#2563eb',
            boxShadow: `0 10px 25px -5px ${theme?.colors?.primaryColor || '#2563eb'}50`,
            borderRadius: theme?.decorations?.cardRadius || '12px',
            color: '#ffffff'
          } : {
            background: `linear-gradient(135deg, ${theme?.colors?.primaryColor || '#6366f1'}, ${theme?.colors?.secondaryColor || '#8b5cf6'})`,
            boxShadow: `0 10px 25px -5px ${theme?.colors?.primaryColor || '#6366f1'}45`,
            borderRadius: theme?.decorations?.cardRadius || '12px',
            color: '#ffffff'
          };

          return (
            <button
              type="submit"
              style={submitButtonStyle}
              className={`w-full font-bold flex items-center justify-center gap-2 transition-all duration-150 hover:brightness-110 active:scale-[0.99] ${
                isPixelTheme ? 'text-xs' : (isMobile ? 'text-xs py-2.5 px-3' : 'text-xs md:text-sm py-3.5 px-4')
              } ${isMobile && isPixelTheme ? 'py-2 px-2.5' : ''}`}
            >
              <Send className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
              <span>{isPixelTheme ? 'REGISTER & GET PASS' : 'Complete Registration & Generate Pass'}</span>
            </button>
          );
        })()}

        <p className="text-center text-[10px] text-slate-400 mt-2">
          ⚡ Registration immediately issues a signed QR entry ticket.
        </p>
      </div>
    </form>
  );
}
