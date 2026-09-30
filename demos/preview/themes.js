/* Shared theme data for the configurator demo sites.
   Used by build.html (configurator), index.html (homepage showcase)
   and every page in demos/preview/. Edit palettes and fonts here only. */
window.JH_THEMES = {
  fonts: {
    Editorial: {
      label: 'Editorial', desc: 'Soft serif headlines, warm and inviting.',
      display: "'Fraunces', Georgia, serif", body: "'Figtree', system-ui, sans-serif",
      g: 'family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400;1,9..144,600&family=Figtree:wght@400;500;600;700',
      weight: 600, transform: 'none', spacing: '-0.02em', scale: 1, pair: 'Fraunces + Figtree'
    },
    Elegant: {
      label: 'Elegant', desc: 'Refined high-contrast serif, calm and luxurious.',
      display: "'Cormorant Garamond', Georgia, serif", body: "'Jost', system-ui, sans-serif",
      g: 'family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600',
      weight: 600, transform: 'none', spacing: '-0.01em', scale: 1.14, pair: 'Cormorant Garamond + Jost'
    },
    Modern: {
      label: 'Modern', desc: 'Crisp, confident sans serif. Clean and current.',
      display: "'Plus Jakarta Sans', system-ui, sans-serif", body: "'Plus Jakarta Sans', system-ui, sans-serif",
      g: 'family=Plus+Jakarta+Sans:wght@400;500;600;700;800',
      weight: 800, transform: 'none', spacing: '-0.035em', scale: 0.94, pair: 'Plus Jakarta Sans'
    },
    Bold: {
      label: 'Bold', desc: 'Tall condensed caps with serious energy.',
      display: "'Anton', Impact, sans-serif", body: "'Barlow', system-ui, sans-serif",
      g: 'family=Anton&family=Barlow:wght@400;500;600;700',
      weight: 400, transform: 'uppercase', spacing: '0.01em', scale: 1.06, pair: 'Anton + Barlow'
    },
    Classic: {
      label: 'Classic', desc: 'Traditional book serif. Trusted and established.',
      display: "'Libre Baskerville', Georgia, serif", body: "'Source Sans 3', system-ui, sans-serif",
      g: 'family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600;700',
      weight: 700, transform: 'none', spacing: '-0.02em', scale: 0.86, pair: 'Libre Baskerville + Source Sans 3'
    },
    Minimal: {
      label: 'Minimal', desc: 'Light, airy spaced capitals. Quiet and stylish.',
      display: "'Josefin Sans', system-ui, sans-serif", body: "'Mulish', system-ui, sans-serif",
      g: 'family=Josefin+Sans:wght@300;400;600&family=Mulish:wght@400;600;700',
      weight: 300, transform: 'uppercase', spacing: '0.06em', scale: 0.82, pair: 'Josefin Sans + Mulish'
    },
    Sturdy: {
      label: 'Sturdy', desc: 'Heavy, no-nonsense type that feels dependable.',
      display: "'Archivo', system-ui, sans-serif", body: "'Archivo', system-ui, sans-serif",
      g: 'family=Archivo:wght@400;500;600;800;900',
      weight: 900, transform: 'none', spacing: '-0.03em', scale: 0.92, pair: 'Archivo Heavy + Archivo'
    },
    Artsy: {
      label: 'Artsy', desc: 'Wide, expressive display type with personality.',
      display: "'Syne', system-ui, sans-serif", body: "'Work Sans', system-ui, sans-serif",
      g: 'family=Syne:wght@500;700;800&family=Work+Sans:wght@400;500;600',
      weight: 800, transform: 'none', spacing: '-0.04em', scale: 0.86, pair: 'Syne + Work Sans'
    },
    Tech: {
      label: 'Tech', desc: 'Geometric and precise. Feels like modern software.',
      display: "'Sora', system-ui, sans-serif", body: "'Sora', system-ui, sans-serif",
      g: 'family=Sora:wght@300;400;600;700',
      weight: 600, transform: 'none', spacing: '-0.045em', scale: 0.9, pair: 'Sora'
    }
  },

  /* Each palette: bg, surface (cards and soft sections), ink (text), muted,
     brand (buttons and key color), accent (highlights), dark (dark bands). */
  industries: {
    restaurant: {
      label: 'Restaurant / Cafe', name: 'Tidewater Kitchen', url: 'tidewaterkitchen.com',
      file: 'demos/preview/restaurant.html', font: 'Editorial', palette: 'Forest & Brass',
      sample: 'Coastal cooking, served slow.',
      palettes: {
        'Forest & Brass': { bg: '#FAFAF8', surface: '#EFF1EC', ink: '#1B2420', muted: '#5F6A64', brand: '#1F3A32', accent: '#B8914A', dark: '#13241F' },
        'Harbor Blue':    { bg: '#F8FAFC', surface: '#EAF0F6', ink: '#102233', muted: '#58697A', brand: '#15395B', accent: '#E07A6B', dark: '#0C2238' },
        'Noir':           { bg: '#121211', surface: '#1C1C1A', ink: '#F3EFE8', muted: '#A8A298', brand: '#E9DFCC', accent: '#D1A857', dark: '#0A0A09' },
        'Plum & Olive':   { bg: '#FBF9FA', surface: '#F2ECEF', ink: '#2A1F26', muted: '#6E5E68', brand: '#5A2A48', accent: '#8C9A5B', dark: '#2A1422' }
      }
    },
    salon: {
      label: 'Salon / Spa', name: 'Solace Studio', url: 'solacestudio.com',
      file: 'demos/preview/salon.html', font: 'Elegant', palette: 'Blush',
      sample: 'Where calm meets color.',
      palettes: {
        'Blush':          { bg: '#FCF8F7', surface: '#F4EAE8', ink: '#3B2D30', muted: '#86737A', brand: '#7B5763', accent: '#C99A94', dark: '#2E2226' },
        'Eucalyptus':     { bg: '#F7F9F7', surface: '#E8EFEA', ink: '#243129', muted: '#66756B', brand: '#4B6B5A', accent: '#B8A078', dark: '#1E2A23' },
        'Champagne Noir': { bg: '#161314', surface: '#211C1D', ink: '#F4ECE7', muted: '#B3A6A0', brand: '#D8BFA6', accent: '#B99378', dark: '#0E0C0C' },
        'Lavender Mist':  { bg: '#F9F8FC', surface: '#EEEBF6', ink: '#2C2940', muted: '#6F6A87', brand: '#5C5690', accent: '#B89BD0', dark: '#221F36' }
      }
    },
    realestate: {
      label: 'Real Estate', name: 'Harborline Realty', url: 'harborlinerealty.com',
      file: 'demos/preview/realestate.html', font: 'Modern', palette: 'Navy & Teal',
      sample: 'Find your place on the coast.',
      palettes: {
        'Navy & Teal':     { bg: '#FFFFFF', surface: '#F2F5F8', ink: '#0F1B2A', muted: '#5B6B7C', brand: '#0F2A44', accent: '#1FA39A', dark: '#0B1E33' },
        'Sand & Sea':      { bg: '#FFFFFF', surface: '#EFF4F3', ink: '#14302E', muted: '#5E7270', brand: '#1D4E5F', accent: '#C9A15E', dark: '#10323D' },
        'Graphite & Gold': { bg: '#FFFFFF', surface: '#F3F3F2', ink: '#18181B', muted: '#62626B', brand: '#1F1F23', accent: '#B08D57', dark: '#111113' },
        'Evergreen':       { bg: '#FFFFFF', surface: '#EFF4F0', ink: '#142019', muted: '#5A6B60', brand: '#1E4636', accent: '#6FA35C', dark: '#10281E' }
      }
    },
    fitness: {
      label: 'Fitness / Gym', name: 'Ironclad Athletic', url: 'ironcladathletic.com',
      file: 'demos/preview/fitness.html', font: 'Bold', palette: 'Volt',
      sample: 'Stronger every single day.',
      palettes: {
        'Volt':          { bg: '#0B0B0C', surface: '#161618', ink: '#F4F4F5', muted: '#9A9AA2', brand: '#D4FF3A', accent: '#D4FF3A', dark: '#000000' },
        'Blaze':         { bg: '#0C0A0A', surface: '#181414', ink: '#F7F3F2', muted: '#A39A98', brand: '#FF3B30', accent: '#FF3B30', dark: '#000000' },
        'Ice':           { bg: '#090C10', surface: '#131820', ink: '#EFF4F9', muted: '#93A0AE', brand: '#38BDF8', accent: '#38BDF8', dark: '#000000' },
        'Gold Standard': { bg: '#0D0C0A', surface: '#191713', ink: '#F6F2EA', muted: '#A39D90', brand: '#F5B301', accent: '#F5B301', dark: '#000000' }
      }
    },
    professional: {
      label: 'Professional Services', name: 'Whitfield & Hale', url: 'whitfieldhale.com',
      file: 'demos/preview/professional.html', font: 'Classic', palette: 'Navy & Gold',
      sample: 'Steady counsel for decisions that matter.',
      palettes: {
        'Navy & Gold':    { bg: '#FFFFFF', surface: '#F4F5F7', ink: '#151B26', muted: '#5A6272', brand: '#1C2B4A', accent: '#A07F3F', dark: '#111827' },
        'Oxblood':        { bg: '#FFFFFF', surface: '#F6F3F2', ink: '#221A1A', muted: '#6B5E5E', brand: '#5A1E24', accent: '#A8875C', dark: '#2A1215' },
        'Slate & Teal':   { bg: '#FFFFFF', surface: '#F2F5F5', ink: '#1D2327', muted: '#5E686D', brand: '#23303A', accent: '#2A7F7A', dark: '#172027' },
        'Forest Counsel': { bg: '#FFFFFF', surface: '#F1F4F1', ink: '#18221B', muted: '#5D6A60', brand: '#1F3B2D', accent: '#A88B4A', dark: '#14261D' }
      }
    },
    retail: {
      label: 'Retail / Boutique', name: 'Salt & Stone', url: 'saltandstonegoods.com',
      file: 'demos/preview/retail.html', font: 'Minimal', palette: 'Sea Glass',
      sample: 'The summer edit is here.',
      palettes: {
        'Sea Glass':   { bg: '#FFFFFF', surface: '#EEF3F1', ink: '#1A2321', muted: '#66726F', brand: '#2F5D57', accent: '#8DBBAE', dark: '#1A2321' },
        'Monochrome':  { bg: '#FFFFFF', surface: '#F2F2F2', ink: '#111111', muted: '#6B6B6B', brand: '#111111', accent: '#A8927A', dark: '#111111' },
        'Sunset Clay': { bg: '#FFFFFF', surface: '#F8EEEA', ink: '#2B1B17', muted: '#7A625A', brand: '#7B2D26', accent: '#E3A791', dark: '#2B1B17' },
        'Cobalt':      { bg: '#FFFFFF', surface: '#EEF1FB', ink: '#121A33', muted: '#5B6480', brand: '#1F3FA8', accent: '#E9C34F', dark: '#121A33' }
      }
    },
    trades: {
      label: 'Trades / Home Services', name: 'TrueNorth Home Services', url: 'truenorthhome.com',
      file: 'demos/preview/trades.html', font: 'Sturdy', palette: 'Blueprint',
      sample: 'Home repairs done right, on schedule.',
      palettes: {
        'Blueprint':    { bg: '#FFFFFF', surface: '#F2F5F8', ink: '#13202B', muted: '#56636F', brand: '#0E3B66', accent: '#FFC43D', dark: '#0B2540' },
        'Workshop Red': { bg: '#FFFFFF', surface: '#F4F4F5', ink: '#18181B', muted: '#5F5F66', brand: '#1D1D1F', accent: '#E23D28', dark: '#111112' },
        'Pine':         { bg: '#FFFFFF', surface: '#F0F4F0', ink: '#16241A', muted: '#5B6A5E', brand: '#1F4D2B', accent: '#F2B33D', dark: '#13301B' },
        'Steel & Aqua': { bg: '#FFFFFF', surface: '#F1F4F6', ink: '#1B232C', muted: '#5B6672', brand: '#2B3440', accent: '#22B8CF', dark: '#1B232C' }
      }
    },
    creative: {
      label: 'Creative / Portfolio', name: 'Kestrel Studio', url: 'kestrel.studio',
      file: 'demos/preview/creative.html', font: 'Artsy', palette: 'Electric Violet',
      sample: 'Brands with something to say.',
      palettes: {
        'Electric Violet': { bg: '#FFFFFF', surface: '#F3F3F0', ink: '#0E0E0E', muted: '#6B6B6B', brand: '#0E0E0E', accent: '#5B4BFF', dark: '#0E0E0E' },
        'Acid Night':      { bg: '#0E0E0E', surface: '#1A1A1A', ink: '#F2F2F2', muted: '#9C9C9C', brand: '#C8F560', accent: '#C8F560', dark: '#000000' },
        'Pop Pink':        { bg: '#FFF6F4', surface: '#FFE9E4', ink: '#1E1315', muted: '#7A6266', brand: '#1E1315', accent: '#FF4F79', dark: '#1E1315' },
        'Klein Blue':      { bg: '#F4F6FF', surface: '#E3E8FF', ink: '#0A1454', muted: '#4F5890', brand: '#1B2CC1', accent: '#1B2CC1', dark: '#0A1454' }
      }
    },
    other: {
      label: 'Other', name: 'Northstar', url: 'northstar.co',
      file: 'demos/preview/other.html', font: 'Tech', palette: 'Indigo',
      sample: 'Run your business with less busywork.',
      palettes: {
        'Indigo':   { bg: '#FFFFFF', surface: '#F5F7FB', ink: '#0B1220', muted: '#5B6478', brand: '#4F46E5', accent: '#06B6D4', dark: '#0B1220' },
        'Emerald':  { bg: '#FFFFFF', surface: '#F2F8F5', ink: '#0B1A14', muted: '#56675F', brand: '#059669', accent: '#84CC16', dark: '#0B1A14' },
        'Sunrise':  { bg: '#FFFFFF', surface: '#FFF5F5', ink: '#1F0F14', muted: '#6E5A60', brand: '#E11D48', accent: '#F59E0B', dark: '#1F0F14' },
        'Midnight': { bg: '#0A0E1A', surface: '#121829', ink: '#EEF1F8', muted: '#98A2B8', brand: '#818CF8', accent: '#22D3EE', dark: '#05070D' }
      }
    }
  }
};

/* Map configurator industry labels to slugs. */
window.JH_THEMES.slugFor = function (label) {
  var ind = window.JH_THEMES.industries;
  for (var k in ind) { if (ind[k].label === label) return k; }
  return 'other';
};
