// Theme Presets, Pattern Generators, and Logo/Image Color Extractor for Sequence Form Studio

export const THEME_PRESETS = [
  {
    id: 'modern_dark',
    name: 'Modern Studio Dark',
    category: 'Sleek & Professional',
    description: 'Deep navy glassmorphism with luminous indigo & violet accents',
    colors: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#38bdf8',
      backgroundColor: '#090d16',
      cardBackground: 'rgba(17, 23, 40, 0.88)',
      cardBorderColor: 'rgba(255, 255, 255, 0.1)',
      textColor: '#f8fafc',
      mutedTextColor: '#94a3b8',
      inputBackground: 'rgba(10, 14, 25, 0.85)'
    },
    typography: {
      fontHeading: 'Outfit',
      fontBody: 'Plus Jakarta Sans',
      headingSize: 'large',
      inputSize: 'normal'
    },
    decorations: {
      backgroundPattern: 'dots',
      cardRadius: '16px',
      cardGlow: 'indigo',
      cardBorderWidth: '1px',
      buttonStyle: 'gradient'
    }
  },
  {
    id: 'minecraft_pixel',
    name: 'Minecraft / Pixel Quest',
    category: 'Gaming & Retro',
    description: 'Chunky blocky pixels, creeper greens, stone obsidian, and 8-bit retro arcade fonts',
    colors: {
      primaryColor: '#48a12e',
      secondaryColor: '#2e6f1f',
      accentColor: '#ffbb00',
      backgroundColor: '#1b2318',
      cardBackground: 'rgba(26, 36, 23, 0.95)',
      cardBorderColor: '#3c8527',
      textColor: '#ffffff',
      mutedTextColor: '#a3d995',
      inputBackground: '#11180f'
    },
    typography: {
      fontHeading: 'Press Start 2P',
      fontBody: 'JetBrains Mono',
      headingSize: 'normal',
      inputSize: 'spacious'
    },
    decorations: {
      backgroundPattern: 'minecraft_blocks',
      cardRadius: '0px',
      cardGlow: 'emerald',
      cardBorderWidth: '3px',
      buttonStyle: 'pixel'
    }
  },
  {
    id: 'cyberpunk_neon',
    name: 'Cyberpunk Neon Matrix',
    category: 'High-Tech & Futuristic',
    description: 'High-contrast jet black with electric pink and cyan glowing borders',
    colors: {
      primaryColor: '#ec4899',
      secondaryColor: '#06b6d4',
      accentColor: '#f43f5e',
      backgroundColor: '#050508',
      cardBackground: 'rgba(13, 13, 22, 0.94)',
      cardBorderColor: 'rgba(236, 72, 153, 0.5)',
      textColor: '#ffffff',
      mutedTextColor: '#94a3b8',
      inputBackground: '#090912'
    },
    typography: {
      fontHeading: 'Outfit',
      fontBody: 'Plus Jakarta Sans',
      headingSize: 'xlarge',
      inputSize: 'normal'
    },
    decorations: {
      backgroundPattern: 'grid',
      cardRadius: '8px',
      cardGlow: 'pink',
      cardBorderWidth: '2px',
      buttonStyle: 'gradient'
    }
  },
  {
    id: 'executive_gold',
    name: 'Executive Platinum & Gold',
    category: 'Luxury & Gala',
    description: 'Prestigious deep charcoal with warm gold accents and elegant serif typography',
    colors: {
      primaryColor: '#f59e0b',
      secondaryColor: '#d97706',
      accentColor: '#fbbf24',
      backgroundColor: '#0c0e14',
      cardBackground: 'rgba(19, 21, 30, 0.92)',
      cardBorderColor: 'rgba(245, 158, 11, 0.35)',
      textColor: '#fdfbf7',
      mutedTextColor: '#a1a1aa',
      inputBackground: '#11131b'
    },
    typography: {
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      headingSize: 'large',
      inputSize: 'normal'
    },
    decorations: {
      backgroundPattern: 'mesh',
      cardRadius: '12px',
      cardGlow: 'amber',
      cardBorderWidth: '1px',
      buttonStyle: 'solid'
    }
  },
  {
    id: 'clean_light',
    name: 'Minimal Clean Light',
    category: 'Clean & Paper',
    description: 'Minimalist porcelain white with high-contrast slate typography and crisp lines',
    colors: {
      primaryColor: '#2563eb',
      secondaryColor: '#4f46e5',
      accentColor: '#0284c7',
      backgroundColor: '#f1f5f9',
      cardBackground: 'rgba(255, 255, 255, 0.96)',
      cardBorderColor: '#cbd5e1',
      textColor: '#0f172a',
      mutedTextColor: '#64748b',
      inputBackground: '#f8fafc'
    },
    typography: {
      fontHeading: 'Outfit',
      fontBody: 'Plus Jakarta Sans',
      headingSize: 'large',
      inputSize: 'normal'
    },
    decorations: {
      backgroundPattern: 'dots',
      cardRadius: '16px',
      cardGlow: 'none',
      cardBorderWidth: '1px',
      buttonStyle: 'solid'
    }
  },
  {
    id: 'emerald_eco',
    name: 'Emerald Eco & Botanical',
    category: 'Nature & Organic',
    description: 'Forest moss background with fresh botanical emerald and mint accents',
    colors: {
      primaryColor: '#10b981',
      secondaryColor: '#059669',
      accentColor: '#34d399',
      backgroundColor: '#0a1410',
      cardBackground: 'rgba(13, 26, 20, 0.92)',
      cardBorderColor: 'rgba(16, 185, 129, 0.3)',
      textColor: '#f0fdf4',
      mutedTextColor: '#86efac',
      inputBackground: '#0b1913'
    },
    typography: {
      fontHeading: 'Outfit',
      fontBody: 'Plus Jakarta Sans',
      headingSize: 'large',
      inputSize: 'normal'
    },
    decorations: {
      backgroundPattern: 'mesh',
      cardRadius: '20px',
      cardGlow: 'emerald',
      cardBorderWidth: '1px',
      buttonStyle: 'gradient'
    }
  },
  {
    id: 'midnight_crimson',
    name: 'Midnight Crimson & Esports',
    category: 'Gaming & Tournament',
    description: 'Aggressive tournament aesthetic with blood red accents and carbon dark surfaces',
    colors: {
      primaryColor: '#ef4444',
      secondaryColor: '#b91c1c',
      accentColor: '#f87171',
      backgroundColor: '#0c0708',
      cardBackground: 'rgba(23, 11, 14, 0.94)',
      cardBorderColor: 'rgba(239, 68, 68, 0.4)',
      textColor: '#ffffff',
      mutedTextColor: '#fca5a5',
      inputBackground: '#160a0d'
    },
    typography: {
      fontHeading: 'Outfit',
      fontBody: 'Plus Jakarta Sans',
      headingSize: 'large',
      inputSize: 'normal'
    },
    decorations: {
      backgroundPattern: 'grid',
      cardRadius: '8px',
      cardGlow: 'rose',
      cardBorderWidth: '2px',
      buttonStyle: 'gradient'
    }
  }
];

// Helper to extract palette from an image file using Canvas API
export function extractPaletteFromImage(fileOrUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = 64;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);

        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        const colorCounts = {};

        // Sample pixels
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a < 128) continue; // skip transparent

          // Quantize to reduce variations
          const qr = Math.round(r / 20) * 20;
          const qg = Math.round(g / 20) * 20;
          const qb = Math.round(b / 20) * 20;
          const key = `${qr},${qg},${qb}`;
          colorCounts[key] = (colorCounts[key] || 0) + 1;
        }

        // Sort by frequency
        const sorted = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([k]) => {
            const [r, g, b] = k.split(',').map(Number);
            return rgbToHex(r, g, b);
          });

        const dominant = sorted.slice(0, 8);
        const primary = dominant[0] || '#6366f1';
        const secondary = dominant[1] || '#8b5cf6';
        const accent = dominant[2] || '#06b6d4';

        resolve({
          primaryColor: primary,
          secondaryColor: secondary,
          accentColor: accent,
          extractedPalette: dominant
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image for color extraction'));

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrUrl);
    }
  });
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.min(255, Math.max(0, x)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Helper to convert Hex to HSL
export function hexToHsl(hex) {
  let c = (hex || '#6366f1').replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Helper to convert HSL to Hex
export function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Generate Mathematical Color Theory Harmonies from a base color
export function generateColorHarmonies(baseHex) {
  const { h, s, l } = hexToHsl(baseHex || '#6366f1');
  const sat = Math.max(45, s);
  const light = Math.max(35, Math.min(65, l));

  return [
    {
      id: 'complementary',
      name: 'Complementary',
      tag: 'High Energy & Maximum Contrast',
      description: 'Opposite 180° on the color wheel. Maximum visual tension and eye-catching focus.',
      colors: [
        baseHex,
        hslToHex((h + 180) % 360, sat, light),
        hslToHex((h + 180) % 360, Math.min(100, sat + 15), Math.min(85, light + 20))
      ],
      primary: baseHex,
      secondary: hslToHex((h + 180) % 360, sat, light),
      accent: hslToHex((h + 180) % 360, Math.min(100, sat + 15), Math.min(85, light + 20)),
      bg: hslToHex((h + 180) % 360, 20, 6),
      card: hslToHex((h + 180) % 360, 25, 10),
      cardBorder: hslToHex((h + 180) % 360, sat, 35)
    },
    {
      id: 'analogous',
      name: 'Analogous',
      tag: 'Cohesive & Natural Harmony',
      description: 'Adjacent 30° hues on the wheel. Pleasing, unified aesthetic commonly seen in nature and luxury UI.',
      colors: [
        hslToHex((h - 30 + 360) % 360, sat, light),
        baseHex,
        hslToHex((h + 30) % 360, sat, light)
      ],
      primary: baseHex,
      secondary: hslToHex((h + 30) % 360, sat, light),
      accent: hslToHex((h - 30 + 360) % 360, sat, light),
      bg: hslToHex(h, 25, 6),
      card: hslToHex(h, 22, 10),
      cardBorder: hslToHex(h, sat, 35)
    },
    {
      id: 'triadic',
      name: 'Triadic',
      tag: 'Vibrant & Balanced 3-Way',
      description: 'Equally spaced 120° apart. Provides rich variety while maintaining harmonious balance.',
      colors: [
        baseHex,
        hslToHex((h + 120) % 360, sat, light),
        hslToHex((h + 240) % 360, sat, light)
      ],
      primary: baseHex,
      secondary: hslToHex((h + 120) % 360, sat, light),
      accent: hslToHex((h + 240) % 360, sat, light),
      bg: hslToHex(h, 20, 6),
      card: hslToHex(h, 22, 11),
      cardBorder: hslToHex((h + 120) % 360, sat, 35)
    },
    {
      id: 'split_complementary',
      name: 'Split-Complementary',
      tag: 'Nuanced Contrast Without Harshness',
      description: 'The base color paired with the two colors flanking its direct complement (150° and 210°).',
      colors: [
        baseHex,
        hslToHex((h + 150) % 360, sat, light),
        hslToHex((h + 210) % 360, sat, light)
      ],
      primary: baseHex,
      secondary: hslToHex((h + 150) % 360, sat, light),
      accent: hslToHex((h + 210) % 360, sat, light),
      bg: hslToHex((h + 150) % 360, 20, 6),
      card: hslToHex((h + 150) % 360, 25, 10),
      cardBorder: hslToHex((h + 150) % 360, sat, 35)
    },
    {
      id: 'tetradic',
      name: 'Tetradic / Square',
      tag: 'Rich 4-Color Spectrum',
      description: 'Four points arranged 90° apart on the color wheel. Ideal for multi-track conferences and festivals.',
      colors: [
        baseHex,
        hslToHex((h + 90) % 360, sat, light),
        hslToHex((h + 180) % 360, sat, light),
        hslToHex((h + 270) % 360, sat, light)
      ],
      primary: baseHex,
      secondary: hslToHex((h + 180) % 360, sat, light),
      accent: hslToHex((h + 90) % 360, sat, light),
      bg: hslToHex(h, 20, 6),
      card: hslToHex(h, 25, 10),
      cardBorder: hslToHex((h + 180) % 360, sat, 35)
    },
    {
      id: 'monochromatic',
      name: 'Monochromatic',
      tag: 'Clean Minimalist Gradient',
      description: 'Pure single-hue shades and tints. Unbeatable for clean corporate and executive interfaces.',
      colors: [
        hslToHex(h, sat * 0.7, 18),
        hslToHex(h, sat * 0.85, 34),
        baseHex,
        hslToHex(h, sat, Math.min(80, light + 20)),
        hslToHex(h, sat * 0.6, 88)
      ],
      primary: baseHex,
      secondary: hslToHex(h, sat, Math.min(80, light + 20)),
      accent: hslToHex(h, sat * 0.85, 34),
      bg: hslToHex(h, sat * 0.4, 6),
      card: hslToHex(h, sat * 0.45, 10),
      cardBorder: hslToHex(h, sat * 0.6, 28)
    }
  ];
}

// Curated Genre and Trend Palettes
export const CURATED_COLOR_PALETTES = [
  {
    id: 'minecraft_biome',
    name: 'Minecraft Biome',
    category: 'Gaming / Pixel',
    colors: ['#48a12e', '#2e6f1f', '#7a5230', '#ffbb00', '#1c2617'],
    primary: '#48a12e',
    secondary: '#7a5230',
    accent: '#ffbb00',
    bg: '#161e14',
    card: '#1e291b',
    cardBorder: '#3c8527'
  },
  {
    id: 'cyberpunk_glitch',
    name: 'Cyberpunk Neon',
    category: 'High-Tech & Synth',
    colors: ['#ec4899', '#06b6d4', '#f43f5e', '#a855f7', '#090912'],
    primary: '#ec4899',
    secondary: '#06b6d4',
    accent: '#f43f5e',
    bg: '#05050a',
    card: '#0f0f1c',
    cardBorder: '#ec4899'
  },
  {
    id: 'aurora_borealis',
    name: 'Nordic Aurora',
    category: 'Atmospheric & Deep',
    colors: ['#38bdf8', '#34d399', '#818cf8', '#c084fc', '#0b1329'],
    primary: '#38bdf8',
    secondary: '#34d399',
    accent: '#c084fc',
    bg: '#070c18',
    card: '#0f172a',
    cardBorder: '#38bdf8'
  },
  {
    id: 'sunset_horizon',
    name: 'Sunset Heatwave',
    category: 'Vibrant Warm',
    colors: ['#f97316', '#db2777', '#fbbf24', '#e11d48', '#1a0b12'],
    primary: '#f97316',
    secondary: '#db2777',
    accent: '#fbbf24',
    bg: '#14080e',
    card: '#220d18',
    cardBorder: '#f97316'
  },
  {
    id: 'executive_champagne',
    name: 'Imperial Gold',
    category: 'Prestige & Luxury',
    colors: ['#f59e0b', '#d97706', '#fbbf24', '#fef3c7', '#0f131d'],
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24',
    bg: '#0a0d14',
    card: '#131824',
    cardBorder: '#f59e0b'
  },
  {
    id: 'deep_emerald',
    name: 'Botanical Canopy',
    category: 'Nature & Organic',
    colors: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#061a12'],
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    bg: '#05120c',
    card: '#0c2217',
    cardBorder: '#10b981'
  },
  {
    id: 'tokyo_neon',
    name: 'Tokyo Midnight Drive',
    category: 'Futuristic Glow',
    colors: ['#6366f1', '#14b8a6', '#f43f5e', '#38bdf8', '#040714'],
    primary: '#6366f1',
    secondary: '#14b8a6',
    accent: '#f43f5e',
    bg: '#040711',
    card: '#0d1326',
    cardBorder: '#6366f1'
  },
  {
    id: 'terracotta_dune',
    name: 'Warm Earth & Sand',
    category: 'Organic Earth',
    colors: ['#ea580c', '#c2410c', '#f59e0b', '#78350f', '#190d07'],
    primary: '#ea580c',
    secondary: '#f59e0b',
    accent: '#c2410c',
    bg: '#140a05',
    card: '#21120a',
    cardBorder: '#ea580c'
  }
];

// Offline instant test sample logos and posters
export const SAMPLE_IMAGES = [
  {
    id: 'minecraft_quest',
    title: 'Minecraft Quest Logo',
    tag: 'Gaming & Retro',
    previewColors: ['#48a12e', '#2e6f1f', '#7a5230', '#ffbb00'],
    dataUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#1b2318"/>
        <rect x="20" y="20" width="160" height="160" fill="#2e6f1f"/>
        <rect x="40" y="40" width="120" height="120" fill="#48a12e"/>
        <rect x="60" y="60" width="30" height="30" fill="#182415"/>
        <rect x="110" y="60" width="30" height="30" fill="#182415"/>
        <rect x="85" y="90" width="30" height="40" fill="#182415"/>
        <rect x="70" y="130" width="20" height="30" fill="#182415"/>
        <rect x="110" y="130" width="20" height="30" fill="#182415"/>
        <rect x="15" y="15" width="20" height="20" fill="#ffbb00"/>
        <rect x="165" y="15" width="20" height="20" fill="#ffbb00"/>
      </svg>
    `)
  },
  {
    id: 'cyber_summit',
    title: 'Cyberpunk Summit Poster',
    tag: 'Tech & Synth',
    previewColors: ['#ec4899', '#06b6d4', '#8b5cf6', '#090912'],
    dataUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="cyber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ec4899" />
            <stop offset="50%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="#090912"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="url(#cyber)" stroke-width="12"/>
        <polygon points="100,45 150,135 50,135" fill="#06b6d4" opacity="0.85"/>
        <circle cx="100" cy="100" r="24" fill="#ec4899"/>
      </svg>
    `)
  },
  {
    id: 'luxury_gala',
    title: 'Executive Gala Crest',
    tag: 'Prestige & Gold',
    previewColors: ['#f59e0b', '#d97706', '#fbbf24', '#0c0e14'],
    dataUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#0c0e14"/>
        <polygon points="100,20 170,75 140,165 60,165 30,75" fill="#131722" stroke="#f59e0b" stroke-width="6"/>
        <polygon points="100,45 150,85 130,145 70,145 50,85" fill="#d97706" opacity="0.9"/>
        <circle cx="100" cy="100" r="22" fill="#fbbf24"/>
      </svg>
    `)
  }
];

// Background pattern CSS rules
export function getPatternStyle(pattern, theme) {
  if (pattern === 'dots') {
    return {
      backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)`,
      backgroundSize: '24px 24px'
    };
  }
  if (pattern === 'grid') {
    return {
      backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)`,
      backgroundSize: '30px 30px'
    };
  }
  if (pattern === 'minecraft_blocks') {
    // Pixelated Minecraft block grid texture with grass / stone pixel variations
    return {
      backgroundImage: `
        linear-gradient(45deg, rgba(72, 161, 46, 0.15) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(72, 161, 46, 0.15) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(72, 161, 46, 0.15) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(72, 161, 46, 0.15) 75%),
        radial-gradient(circle at 16px 16px, rgba(46, 111, 31, 0.2) 8px, transparent 8px)
      `,
      backgroundSize: '32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px',
      backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px, 0 0'
    };
  }
  if (pattern === 'stripes') {
    return {
      backgroundImage: `repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03) 10px, transparent 10px, transparent 20px)`
    };
  }
  if (pattern === 'mesh') {
    return {
      backgroundImage: `
        radial-gradient(ellipse 60% 40% at 20% 20%, ${theme?.colors?.primaryColor || '#6366f1'}25, transparent 60%),
        radial-gradient(circle at 80% 80%, ${theme?.colors?.secondaryColor || '#8b5cf6'}20, transparent 50%)
      `
    };
  }
  return {};
}
