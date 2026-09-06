import React, { useState, useRef } from 'react';
import { 
  X, 
  Palette, 
  Sparkles, 
  Upload, 
  Check, 
  Sliders, 
  Type, 
  Image as ImageIcon, 
  Grid, 
  Maximize2, 
  RefreshCw,
  Gamepad2,
  Cpu,
  Layers,
  SunMedium,
  Award,
  Flame,
  Wand2,
  Pipette,
  Eye,
  CheckCircle2,
  Compass,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { 
  THEME_PRESETS, 
  extractPaletteFromImage,
  generateColorHarmonies,
  CURATED_COLOR_PALETTES,
  SAMPLE_IMAGES
} from '../../constants/themes.js';

export function ThemeStudioModal({
  theme,
  onUpdateTheme,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'colors' | 'background' | 'typography'
  const [colorSubTab, setColorSubTab] = useState('extractor'); // 'extractor' | 'harmonies' | 'curated' | 'pickers'
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedColors, setExtractedColors] = useState(null);
  const [extractError, setExtractError] = useState('');
  const [activeSampleImage, setActiveSampleImage] = useState(null);
  const fileInputRef = useRef(null);
  const bgImageInputRef = useRef(null);

  const harmonies = generateColorHarmonies(theme.colors.primaryColor);

  const handleApplyPreset = (preset) => {
    onUpdateTheme({
      presetId: preset.id,
      colors: { ...preset.colors },
      typography: { ...preset.typography },
      decorations: { ...preset.decorations },
      backgroundImage: null
    });
  };

  const handleColorChange = (key, value) => {
    onUpdateTheme({
      colors: {
        ...theme.colors,
        [key]: value
      }
    });
  };

  const handleTypographyChange = (key, value) => {
    onUpdateTheme({
      typography: {
        ...theme.typography,
        [key]: value
      }
    });
  };

  const handleDecorationChange = (key, value) => {
    onUpdateTheme({
      decorations: {
        ...theme.decorations,
        [key]: value
      }
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsExtracting(true);
      setExtractError('');
      setActiveSampleImage(null);
      const result = await extractPaletteFromImage(file);
      setExtractedColors(result.extractedPalette);

      // Auto-apply primary and secondary from logo
      onUpdateTheme({
        colors: {
          ...theme.colors,
          primaryColor: result.primaryColor,
          secondaryColor: result.secondaryColor,
          accentColor: result.accentColor
        }
      });
    } catch (err) {
      setExtractError('Could not sample image colors. Please try a different PNG/JPG file.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleLoadSampleImage = async (sample) => {
    try {
      setIsExtracting(true);
      setExtractError('');
      setActiveSampleImage(sample);
      const result = await extractPaletteFromImage(sample.dataUrl);
      setExtractedColors(result.extractedPalette);

      onUpdateTheme({
        colors: {
          ...theme.colors,
          primaryColor: result.primaryColor,
          secondaryColor: result.secondaryColor,
          accentColor: result.accentColor
        }
      });
    } catch (err) {
      setExtractError('Could not sample image colors from sample.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleApplyHarmony = (harmony) => {
    onUpdateTheme({
      colors: {
        ...theme.colors,
        primaryColor: harmony.primary,
        secondaryColor: harmony.secondary,
        accentColor: harmony.accent,
        backgroundColor: harmony.bg || theme.colors.backgroundColor,
        cardBackground: harmony.card || theme.colors.cardBackground,
        cardBorderColor: harmony.cardBorder || theme.colors.cardBorderColor
      }
    });
  };

  const handleApplyCuratedPalette = (palette) => {
    onUpdateTheme({
      colors: {
        ...theme.colors,
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        accentColor: palette.accent,
        backgroundColor: palette.bg || theme.colors.backgroundColor,
        cardBackground: palette.card || theme.colors.cardBackground,
        cardBorderColor: palette.cardBorder || theme.colors.cardBorderColor
      }
    });
  };

  const handleBgImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onUpdateTheme({
        backgroundImage: event.target.result,
        decorations: {
          ...theme.decorations,
          backgroundPattern: 'custom_image'
        }
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-studio w-[95vw] max-w-[1380px] max-h-[92vh]">
        {/* Header */}
        <div className="p-5 px-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-indigo-500 to-cyan-400 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Palette className="w-4 h-4 text-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Theme & Design Studio</h2>
                <span className="badge badge-indigo text-[10px]">Real-time Live Sync</span>
              </div>
              <p className="text-xs text-slate-400">
                Customize fonts, background textures, color schemes, and logo palettes to fit any theme
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost btn-icon btn-sm text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 px-6 bg-black/30 gap-2 overflow-x-auto">
          {[
            { id: 'presets', label: 'Theme Presets', icon: Sparkles },
            { id: 'colors', label: 'Colors & Logo Extractor', icon: Palette },
            { id: 'background', label: 'Background & Texture', icon: ImageIcon },
            { id: 'typography', label: 'Typography & Sizing', icon: Type }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
                  isActive
                    ? 'border-indigo-400 text-indigo-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">

          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Curated Aesthetic Presets
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Instantly re-skin your entire registration form to match your event vibe
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                {THEME_PRESETS.map(preset => {
                  const isCurrent = theme.presetId === preset.id;

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleApplyPreset(preset)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between gap-3 ${
                        isCurrent 
                          ? 'border-indigo-500 bg-indigo-950/30 ring-2 ring-indigo-500/40 shadow-lg' 
                          : 'border-white/10 bg-slate-900/40 hover:bg-slate-800/80 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                            {preset.id === 'minecraft_pixel' && <Gamepad2 className="w-4 h-4 text-emerald-400" />}
                            {preset.id === 'cyberpunk_neon' && <Cpu className="w-4 h-4 text-pink-400" />}
                            {preset.id === 'modern_dark' && <Sparkles className="w-4 h-4 text-indigo-400" />}
                            {preset.id === 'executive_gold' && <Award className="w-4 h-4 text-amber-400" />}
                            {preset.id === 'clean_light' && <SunMedium className="w-4 h-4 text-blue-400" />}
                            {preset.id === 'midnight_crimson' && <Flame className="w-4 h-4 text-rose-500" />}
                            <span>{preset.name}</span>
                          </h4>
                          <span className="badge badge-indigo text-[9px] uppercase font-mono">
                            {preset.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {preset.description}
                        </p>
                      </div>

                      {/* Color swatch row */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: preset.colors.primaryColor }} title="Primary" />
                          <span className="w-4 h-4 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: preset.colors.secondaryColor }} title="Secondary" />
                          <span className="w-4 h-4 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: preset.colors.backgroundColor }} title="Background" />
                          <span className="w-4 h-4 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: preset.colors.cardBorderColor }} title="Border" />
                        </div>

                        {isCurrent ? (
                          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Active Theme
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 group-hover:text-white">
                            Apply Theme →
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: COLORS, COLOR THEORY & LOGO PALETTE EXTRACTOR */}
          {activeTab === 'colors' && (
            <div className="space-y-5">
              
              {/* Color Navigation Sub-Tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/40 border border-white/10 overflow-x-auto">
                {[
                  { id: 'extractor', label: 'Logo / Poster Extractor', icon: Upload },
                  { id: 'harmonies', label: 'Color Theory Harmonies', icon: Compass },
                  { id: 'curated', label: 'Trending Genre Palettes', icon: Sparkles },
                  { id: 'pickers', label: 'Manual Color Pickers', icon: Sliders }
                ].map(sub => {
                  const SubIcon = sub.icon;
                  const isSubActive = colorSubTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setColorSubTab(sub.id)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                        isSubActive
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <SubIcon className="w-3.5 h-3.5" />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>              {/* Two-Column Area: Left Controls & Right Live Sample UI */}
              <div className="flex flex-col lg:flex-row gap-7 items-start">
                
                {/* Left Side: Specific Color Sub-Tab Controls */}
                <div className="w-full lg:w-[58%] xl:w-[60%] space-y-5">
                  
                  {/* SUBTAB 1: LOGO / POSTER EXTRACTOR */}
                  {colorSubTab === 'extractor' && (
                    <div className="space-y-4">
                      {/* Upload & Instructions */}
                      <div className="p-4.5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 space-y-3.5">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="space-y-1 max-w-sm">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                              Canvas Color Quantizer
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              Upload Event Poster or Logo
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Upload any brand logo, game flyer, or poster image. Sequence samples dominant hues and synchronizes the registration palette instantly.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isExtracting}
                              className="btn btn-primary btn-sm flex-shrink-0 flex items-center gap-1.5 shadow-lg"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isExtracting ? 'Analyzing...' : 'Upload Image'}</span>
                            </button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleLogoUpload}
                              accept="image/*"
                              className="hidden"
                            />
                          </div>
                        </div>

                        {extractError && (
                          <p className="text-xs text-rose-400 font-medium">
                            {extractError}
                          </p>
                        )}
                      </div>

                      {/* Quick 1-Click Sample Images to test immediately */}
                      <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Try Instant Sample Images (No File Needed)</span>
                          </span>
                          <span className="text-[10px] text-slate-400">Click to extract</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {SAMPLE_IMAGES.map(sample => {
                            const isSelected = activeSampleImage?.id === sample.id;
                            return (
                              <button
                                key={sample.id}
                                type="button"
                                onClick={() => handleLoadSampleImage(sample)}
                                className={`p-3 rounded-xl border text-left transition-all group flex flex-col justify-between gap-2.5 ${
                                  isSelected
                                    ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500'
                                    : 'border-white/10 bg-black/40 hover:bg-white/5'
                                }`}
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
                                      {sample.title}
                                    </span>
                                  </div>
                                  <span className="text-[9px] text-slate-400 font-mono block">
                                    {sample.tag}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 pt-1.5 border-t border-white/5">
                                  {sample.previewColors.map((col, idx) => (
                                    <span 
                                      key={idx} 
                                      className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm" 
                                      style={{ backgroundColor: col }} 
                                    />
                                  ))}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Extracted Swatches Section */}
                      {extractedColors && extractedColors.length > 0 && (
                        <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/60 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              <Pipette className="w-3.5 h-3.5 text-pink-400" />
                              <span>Extracted Dominant Hues ({extractedColors.length} sampled)</span>
                            </span>
                            <span className="text-[10px] text-slate-400">Tap to assign color role</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                            {extractedColors.map((hex, i) => (
                              <div
                                key={i}
                                className="p-2.5 rounded-xl border border-white/10 bg-black/40 space-y-2 text-center"
                              >
                                <div 
                                  className="w-full h-8 rounded-lg border border-white/20 shadow-inner"
                                  style={{ backgroundColor: hex }}
                                />
                                <span className="text-[10px] font-mono text-slate-300 font-bold block">
                                  {hex}
                                </span>
                                <div className="flex items-center justify-center gap-1 text-[9px]">
                                  <button
                                    type="button"
                                    onClick={() => handleColorChange('primaryColor', hex)}
                                    className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-indigo-600 text-white transition-colors"
                                    title="Assign as Primary Accent"
                                  >
                                    Primary
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleColorChange('secondaryColor', hex)}
                                    className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-violet-600 text-white transition-colors"
                                    title="Assign as Secondary Accent"
                                  >
                                    Secondary
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUBTAB 2: COLOR THEORY HARMONIES */}
                  {colorSubTab === 'harmonies' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Mathematical Color Harmonies</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Calculated automatically from your current Primary Accent ({theme.colors.primaryColor})
                        </p>
                      </div>

                      <div className="space-y-3">
                        {harmonies.map(harm => (
                          <div
                            key={harm.id}
                            className="p-4 rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/80 transition-all space-y-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white">{harm.name}</span>
                                  <span className="badge badge-indigo text-[9px] uppercase">{harm.tag}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                                  {harm.description}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleApplyHarmony(harm)}
                                className="btn btn-secondary btn-xs flex items-center gap-1.5 flex-shrink-0 text-indigo-300 border-indigo-500/30 hover:border-indigo-500/60 shadow-sm"
                                title="Apply this full harmony to form primary, secondary, and background"
                              >
                                <Zap className="w-3 h-3 text-indigo-400" />
                                <span>Apply Harmony</span>
                              </button>
                            </div>

                            {/* Harmony Swatches */}
                            <div className="flex items-center gap-2 pt-2 border-t border-white/5 flex-wrap">
                              {harm.colors.map((hex, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleColorChange('primaryColor', hex)}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 bg-black/40 hover:scale-105 transition-transform text-[10px] font-mono text-white shadow-sm"
                                  title={`Click to set ${hex} as primary`}
                                >
                                  <span className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: hex }} />
                                  <span>{hex}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 3: TRENDING GENRE PALETTES */}
                  {colorSubTab === 'curated' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                          <span>Pre-Curated Event & Gaming Palettes</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Tested combinations tuned for optimal legibility, mood, and punch
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                        {CURATED_COLOR_PALETTES.map(pal => (
                          <div
                            key={pal.id}
                            className="p-3.5 rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/80 transition-all space-y-2.5 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">{pal.name}</span>
                              <span className="badge badge-indigo text-[9px] font-mono">{pal.category}</span>
                            </div>

                            {/* Swatch Pill Row */}
                            <div className="flex items-center gap-1.5 py-1">
                              {pal.colors.map((hex, idx) => (
                                <span 
                                  key={idx} 
                                  className="flex-1 h-5 rounded-md border border-black/40 shadow-sm"
                                  style={{ backgroundColor: hex }}
                                  title={hex}
                                />
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleApplyCuratedPalette(pal)}
                              className="btn btn-secondary btn-xs w-full text-indigo-300"
                            >
                              <span>Apply Palette →</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUBTAB 4: MANUAL COLOR PICKERS */}
                  {colorSubTab === 'pickers' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Custom Color Role Assignments</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Directly specify hex codes or choose from the visual color picker
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                        {/* Primary Color */}
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                            <span>Primary Accent</span>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.primaryColor }} />
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={theme.colors.primaryColor}
                              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <input
                              type="text"
                              value={theme.colors.primaryColor}
                              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                              className="input-base text-xs font-mono py-1 px-2 uppercase"
                            />
                          </div>
                        </div>

                        {/* Secondary Color */}
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                            <span>Secondary Accent</span>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.secondaryColor }} />
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={theme.colors.secondaryColor}
                              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <input
                              type="text"
                              value={theme.colors.secondaryColor}
                              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                              className="input-base text-xs font-mono py-1 px-2 uppercase"
                            />
                          </div>
                        </div>

                        {/* Page Background */}
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                            <span>Page Background</span>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.backgroundColor }} />
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={theme.colors.backgroundColor}
                              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <input
                              type="text"
                              value={theme.colors.backgroundColor}
                              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                              className="input-base text-xs font-mono py-1 px-2 uppercase"
                            />
                          </div>
                        </div>

                        {/* Card Border Color */}
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                            <span>Card Border Color</span>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.cardBorderColor }} />
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={theme.colors.cardBorderColor.startsWith('#') ? theme.colors.cardBorderColor : '#6366f1'}
                              onChange={(e) => handleColorChange('cardBorderColor', e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <input
                              type="text"
                              value={theme.colors.cardBorderColor}
                              onChange={(e) => handleColorChange('cardBorderColor', e.target.value)}
                              className="input-base text-xs font-mono py-1 px-2"
                            />
                          </div>
                        </div>

                        {/* Text Color */}
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                            <span>Text Heading Color</span>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.textColor }} />
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={theme.colors.textColor}
                              onChange={(e) => handleColorChange('textColor', e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <input
                              type="text"
                              value={theme.colors.textColor}
                              onChange={(e) => handleColorChange('textColor', e.target.value)}
                              className="input-base text-xs font-mono py-1 px-2 uppercase"
                            />
                          </div>
                        </div>

                        {/* Input Box Background */}
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                            <span>Input Background</span>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.inputBackground }} />
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={theme.colors.inputBackground.startsWith('#') ? theme.colors.inputBackground : '#0b0f19'}
                              onChange={(e) => handleColorChange('inputBackground', e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                            />
                            <input
                              type="text"
                              value={theme.colors.inputBackground}
                              onChange={(e) => handleColorChange('inputBackground', e.target.value)}
                              className="input-base text-xs font-mono py-1 px-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Right Side: Interactive Live Mini Form UI Preview */}
                <div className="w-full lg:w-[40%] lg:sticky lg:top-0">
                  <MiniLiveFormPreview theme={theme} />
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: BACKGROUND & TEXTURE */}
          {activeTab === 'background' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Atmosphere & Background Textures
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select texture patterns or upload custom full-bleed artwork for your registration form
                </p>
              </div>

              {/* Background Pattern Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {[
                  { id: 'none', label: 'Solid / Clean' },
                  { id: 'minecraft_blocks', label: 'Minecraft Blocks' },
                  { id: 'grid', label: 'Cyber Tech Grid' },
                  { id: 'dots', label: 'Dot Matrix' },
                  { id: 'mesh', label: 'Gradient Mesh' },
                  { id: 'stripes', label: 'Cyber Stripes' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleDecorationChange('backgroundPattern', p.id)}
                    className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      theme.decorations.backgroundPattern === p.id
                        ? 'border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500 shadow-md'
                        : 'border-white/10 bg-slate-900/40 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="block font-bold">{p.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal block mt-0.5">
                      {theme.decorations.backgroundPattern === p.id ? '✓ Selected' : 'Tap to apply'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Image Upload */}
              <div className="p-4 rounded-2xl border border-white/10 bg-slate-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Custom Background Wallpaper</h4>
                    <p className="text-[11px] text-slate-400">Upload high-res gaming, festival, or corporate artwork</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => bgImageInputRef.current?.click()}
                    className="btn btn-secondary btn-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Wallpaper</span>
                  </button>
                  <input
                    type="file"
                    ref={bgImageInputRef}
                    onChange={handleBgImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {theme.backgroundImage && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-xs text-emerald-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Custom wallpaper applied
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateTheme({ backgroundImage: null })}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Card Shapes & Corners */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Form Card Roundness & Borders
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {[
                    { id: '0px', label: 'Square / Pixel (0px)' },
                    { id: '8px', label: 'Subtle (8px)' },
                    { id: '16px', label: 'Modern (16px)' },
                    { id: '24px', label: 'Soft Pill (24px)' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleDecorationChange('cardRadius', r.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                        theme.decorations.cardRadius === r.id
                          ? 'border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500 shadow-md'
                          : 'border-white/10 bg-slate-900/40 text-slate-400 hover:text-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: TYPOGRAPHY & SIZING */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Typography & Font Sizing
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Control the visual voice, scale, and density of your registration form
                </p>
              </div>

              {/* Font Family Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200">
                  Heading Font Family
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {[
                    { id: 'Outfit', name: 'Outfit', tag: 'Modern Display / Tech' },
                    { id: 'Press Start 2P', name: 'Press Start 2P', tag: 'Minecraft & 8-Bit Pixel Gaming' },
                    { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', tag: 'Clean Professional Sans' },
                    { id: 'Playfair Display', name: 'Playfair Display', tag: 'Luxury Serif & Gala' },
                    { id: 'JetBrains Mono', name: 'JetBrains Mono', tag: 'Developer Terminal & Code' }
                  ].map(font => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => handleTypographyChange('fontHeading', font.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        theme.typography.fontHeading === font.id
                          ? 'border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500 shadow-md'
                          : 'border-white/10 bg-slate-900/40 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="text-sm font-bold truncate" style={{ fontFamily: font.id }}>
                        {font.name}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {font.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Heading Scale & Density */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-white/10">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Heading Font Size Scale
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['normal', 'large', 'xlarge'].map(sz => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleTypographyChange('headingSize', sz)}
                        className={`py-2 px-2.5 rounded-lg border text-xs font-semibold capitalize transition-all ${
                          theme.typography.headingSize === sz
                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                            : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Input Field Padding & Density
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['compact', 'normal', 'spacious'].map(sz => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleTypographyChange('inputSize', sz)}
                        className={`py-2 px-2.5 rounded-lg border text-xs font-semibold capitalize transition-all ${
                          theme.typography.inputSize === sz
                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                            : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-black/30 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            All visual styling changes apply instantly to the canvas and live preview.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary btn-sm px-6"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
}

// Mini Live Interactive Sample UI Card showing palette in action
function MiniLiveFormPreview({ theme }) {
  const isPixelTheme = theme?.presetId === 'minecraft_pixel' || theme?.typography?.fontHeading === 'Press Start 2P' || theme?.decorations?.cardRadius === '0px';

  return (
    <div className="space-y-3 p-4.5 rounded-2xl border border-white/10 bg-slate-950/60 shadow-xl">
      <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          <span>Live Palette UI Testbed</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Real-time Sync
        </span>
      </div>

      {/* Mini Card Container */}
      <div 
        className="relative overflow-hidden p-4 sm:p-5 space-y-3.5 transition-all duration-300 border"
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderColor: theme.colors.cardBorderColor,
          borderWidth: isPixelTheme ? '2px' : '1px',
          borderRadius: isPixelTheme ? '0px' : (theme.decorations.cardRadius || '14px'),
          boxShadow: isPixelTheme 
            ? 'inset -3px -3px 0px 0px rgba(0,0,0,0.65), inset 3px 3px 0px 0px rgba(255,255,255,0.1), 0 10px 25px rgba(0,0,0,0.6)'
            : `0 10px 30px -5px ${theme.colors.primaryColor}30, 0 0 0 1px ${theme.colors.cardBorderColor}`
        }}
      >
        {/* Mini Top Ribbon */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{
            background: isPixelTheme
              ? `repeating-linear-gradient(90deg, ${theme.colors.primaryColor} 0px, ${theme.colors.primaryColor} 8px, ${theme.colors.secondaryColor} 8px, ${theme.colors.secondaryColor} 16px)`
              : `linear-gradient(90deg, ${theme.colors.primaryColor} 0%, ${theme.colors.secondaryColor} 50%, ${theme.colors.accentColor} 100%)`
          }}
        />

        {/* Mini Header */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between">
            <span 
              className="text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider border"
              style={{
                backgroundColor: `${theme.colors.primaryColor}20`,
                color: theme.colors.primaryColor,
                borderColor: `${theme.colors.primaryColor}40`,
                borderRadius: isPixelTheme ? '0px' : '9999px',
                fontFamily: isPixelTheme ? `'Press Start 2P', monospace` : undefined
              }}
            >
              Event Registration Form
            </span>
            <span className="text-[9px] text-slate-400 font-mono">100 Slots</span>
          </div>

          <h5 
            className="text-sm font-bold truncate"
            style={{
              fontFamily: theme.typography.fontHeading,
              color: theme.colors.textColor
            }}
          >
            Sample Registration UI
          </h5>

          <p 
            className="text-[10px] line-clamp-1"
            style={{
              fontFamily: theme.typography.fontBody,
              color: theme.colors.mutedTextColor
            }}
          >
            Interactive live demonstration of your color scheme
          </p>
        </div>

        {/* Mini Input Box 1 */}
        <div className="space-y-1">
          <label 
            className="block text-[10px] font-semibold"
            style={{
              fontFamily: isPixelTheme ? `'Press Start 2P', monospace` : theme.typography.fontBody,
              fontSize: isPixelTheme ? '8px' : '10px',
              color: theme.colors.textColor
            }}
          >
            Attendee Name <span className="text-rose-400">*</span>
          </label>
          <div 
            className="p-2 px-3 text-[11px] border flex items-center justify-between"
            style={{
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.primaryColor,
              borderRadius: isPixelTheme ? '0px' : '8px',
              color: theme.colors.textColor
            }}
          >
            <span>Alex Morgan (Sample)</span>
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.colors.primaryColor }} />
          </div>
        </div>

        {/* Mini Input Box 2: Email */}
        <div className="space-y-1">
          <label 
            className="block text-[10px] font-semibold"
            style={{
              fontFamily: isPixelTheme ? `'Press Start 2P', monospace` : theme.typography.fontBody,
              fontSize: isPixelTheme ? '8px' : '10px',
              color: theme.colors.textColor
            }}
          >
            Work / Attendee Email
          </label>
          <div 
            className="p-2 px-3 text-[11px] border flex items-center justify-between"
            style={{
              backgroundColor: theme.colors.inputBackground,
              borderColor: theme.colors.cardBorderColor,
              borderRadius: isPixelTheme ? '0px' : '8px',
              color: theme.colors.mutedTextColor
            }}
          >
            <span>alex.morgan@organization.org</span>
            <span className="text-[9px] font-mono opacity-60">VERIFIED</span>
          </div>
        </div>

        {/* Mini Radio Selector */}
        <div 
          className="p-2 px-2.5 rounded-lg border flex items-center gap-2 text-[10px]"
          style={{
            backgroundColor: `${theme.colors.primaryColor}18`,
            borderColor: theme.colors.primaryColor,
            borderRadius: isPixelTheme ? '0px' : '8px',
            color: theme.colors.textColor
          }}
        >
          <span 
            className="w-2.5 h-2.5 rounded-full border flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: theme.colors.primaryColor,
              borderColor: theme.colors.primaryColor
            }}
          >
            <span className="w-1 h-1 rounded-full bg-white" />
          </span>
          <span className="font-medium">VIP All-Access Pass (Included)</span>
        </div>

        {/* Mini Submit Button */}
        <button
          type="button"
          className="w-full py-2.5 px-4 text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-md transition-transform hover:brightness-110 active:scale-[0.99]"
          style={
            isPixelTheme ? {
              backgroundColor: theme.colors.primaryColor,
              border: '2px solid #142011',
              boxShadow: 'inset -2px -2px 0px 0px rgba(0,0,0,0.6), inset 2px 2px 0px 0px rgba(255,255,255,0.4)',
              fontFamily: `'Press Start 2P', monospace`,
              borderRadius: '0px',
              color: '#ffffff'
            } : theme.decorations.buttonStyle === 'solid' ? {
              backgroundColor: theme.colors.primaryColor,
              borderRadius: isPixelTheme ? '0px' : '8px',
              color: '#ffffff'
            } : {
              background: `linear-gradient(135deg, ${theme.colors.primaryColor}, ${theme.colors.secondaryColor})`,
              borderRadius: isPixelTheme ? '0px' : '8px',
              color: '#ffffff'
            }
          }
        >
          <span>{isPixelTheme ? 'REGISTER & PASS' : 'Complete Registration'}</span>
        </button>

        {/* Swatch Strip */}
        <div className="pt-2.5 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <span className="text-[9px] text-slate-400 font-mono">Active Palette Harmony</span>
          <div className="flex items-center gap-1.5">
            {[
              theme.colors.primaryColor,
              theme.colors.secondaryColor,
              theme.colors.accentColor,
              theme.colors.cardBorderColor,
              theme.colors.backgroundColor
            ].map((col, idx) => (
              <span 
                key={idx} 
                className="w-3 h-3 rounded-full border border-black/30 shadow-sm"
                style={{ backgroundColor: col }}
                title={col}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
