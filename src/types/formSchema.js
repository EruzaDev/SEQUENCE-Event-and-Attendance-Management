// Form Schema definitions and helpers for Sequence Registration Form Builder
// Generalized for conferences, summits, corporate events, workshops, expos, and community events

export const FIELD_CATEGORIES = {
  IDENTITY: 'Attendee Identity',
  ORGANIZATION: 'Organization & Professional',
  CUSTOM: 'Custom Inputs',
  LOGISTICS: 'Logistics & Preferences'
};

export const AVAILABLE_FIELDS = [
  // Attendee Identity
  {
    type: 'text',
    category: FIELD_CATEGORIES.IDENTITY,
    defaultLabel: 'Full Name',
    icon: 'User',
    defaultPlaceholder: 'Alex Morgan',
    defaultWidth: 'full',
    defaultRequired: true,
    description: 'Attendee full name or display name'
  },
  {
    type: 'email',
    category: FIELD_CATEGORIES.IDENTITY,
    defaultLabel: 'Email Address',
    icon: 'Mail',
    defaultPlaceholder: 'alex.morgan@company.com',
    defaultHelperText: 'Confirmation pass and QR ticket will be sent here',
    defaultWidth: 'full',
    defaultRequired: true,
    description: 'Attendee email address'
  },
  {
    type: 'phone',
    category: FIELD_CATEGORIES.IDENTITY,
    defaultLabel: 'Phone / Mobile Number',
    icon: 'Phone',
    defaultPlaceholder: '+1 (555) 234-5678',
    defaultWidth: 'half',
    defaultRequired: false,
    description: 'Contact number for event updates & SMS alerts'
  },
  {
    type: 'select',
    category: FIELD_CATEGORIES.IDENTITY,
    defaultLabel: 'Registration Type / Ticket Tier',
    icon: 'Layers',
    defaultPlaceholder: 'Select registration tier',
    defaultOptions: [
      'General Attendee',
      'VIP Pass',
      'Speaker / Panelist',
      'Sponsor / Exhibitor',
      'Media / Press',
      'Staff / Volunteer'
    ],
    defaultWidth: 'half',
    defaultRequired: true,
    description: 'Attendee category or admission pass tier'
  },

  // Organization & Professional
  {
    type: 'text',
    category: FIELD_CATEGORIES.ORGANIZATION,
    defaultLabel: 'Organization / Company Name',
    icon: 'Building2',
    defaultPlaceholder: 'Acme Corporation',
    defaultWidth: 'half',
    defaultRequired: false,
    description: 'Company, institution, agency, or affiliation'
  },
  {
    type: 'text',
    category: FIELD_CATEGORIES.ORGANIZATION,
    defaultLabel: 'Job Title / Role',
    icon: 'Briefcase',
    defaultPlaceholder: 'Product Lead / Senior Engineer',
    defaultWidth: 'half',
    defaultRequired: false,
    description: 'Professional position or job title'
  },
  {
    type: 'select',
    category: FIELD_CATEGORIES.ORGANIZATION,
    defaultLabel: 'Industry / Sector',
    icon: 'Grid',
    defaultPlaceholder: 'Select industry',
    defaultOptions: [
      'Technology & Software',
      'Finance & Banking',
      'Healthcare & Biotech',
      'Education & Academia',
      'Energy & Sustainability',
      'Media & Entertainment',
      'Government & Non-Profit',
      'Other'
    ],
    defaultWidth: 'half',
    defaultRequired: false,
    description: 'Primary industry domain'
  },
  {
    type: 'text',
    category: FIELD_CATEGORIES.ORGANIZATION,
    defaultLabel: 'City / Country',
    icon: 'MapPin',
    defaultPlaceholder: 'San Francisco, USA',
    defaultWidth: 'half',
    defaultRequired: false,
    description: 'Attendee location'
  },

  // Custom Inputs
  {
    type: 'text',
    category: FIELD_CATEGORIES.CUSTOM,
    defaultLabel: 'Short Text',
    icon: 'Type',
    defaultPlaceholder: 'Enter your answer',
    defaultWidth: 'full',
    defaultRequired: false,
    description: 'Single-line general response'
  },
  {
    type: 'textarea',
    category: FIELD_CATEGORIES.CUSTOM,
    defaultLabel: 'Paragraph / Long Text',
    icon: 'AlignLeft',
    defaultPlaceholder: 'Write detailed response here...',
    defaultWidth: 'full',
    defaultRequired: false,
    description: 'Multi-line notes, bios, or expectations'
  },
  {
    type: 'select',
    category: FIELD_CATEGORIES.CUSTOM,
    defaultLabel: 'Dropdown Select',
    icon: 'ChevronDown',
    defaultPlaceholder: 'Choose an option',
    defaultOptions: ['Option 1', 'Option 2', 'Option 3'],
    defaultWidth: 'full',
    defaultRequired: false,
    description: 'Single-choice dropdown selector'
  },
  {
    type: 'radio',
    category: FIELD_CATEGORIES.CUSTOM,
    defaultLabel: 'Radio Choice',
    icon: 'CircleDot',
    defaultOptions: ['Yes', 'No', 'Maybe'],
    defaultWidth: 'full',
    defaultRequired: false,
    description: 'Single visible choice selector'
  },
  {
    type: 'checkbox',
    category: FIELD_CATEGORIES.CUSTOM,
    defaultLabel: 'Checkboxes (Multiple Choice)',
    icon: 'CheckSquare',
    defaultOptions: ['Keynote Sessions', 'Hands-on Labs', 'Networking Lounge', 'Product Demos'],
    defaultWidth: 'full',
    defaultRequired: false,
    description: 'Multi-select options list'
  },
  {
    type: 'file',
    category: FIELD_CATEGORIES.CUSTOM,
    defaultLabel: 'File Attachment / Document Upload',
    icon: 'UploadCloud',
    defaultHelperText: 'Upload valid ID, business card, or proof document (PDF, PNG, JPG up to 5MB)',
    defaultWidth: 'full',
    defaultRequired: false,
    description: 'Attendee file or document upload'
  },

  // Logistics & Preferences
  {
    type: 'select',
    category: FIELD_CATEGORIES.LOGISTICS,
    defaultLabel: 'Dietary Preferences',
    icon: 'Utensils',
    defaultPlaceholder: 'Select dietary preference',
    defaultOptions: [
      'No Restrictions (Standard)',
      'Vegetarian',
      'Vegan',
      'Halal',
      'Kosher',
      'Gluten-Free',
      'Dairy-Free',
      'Other / Multiple'
    ],
    defaultWidth: 'half',
    defaultRequired: false,
    description: 'Catering and food accommodations'
  },
  {
    type: 'select',
    category: FIELD_CATEGORIES.LOGISTICS,
    defaultLabel: 'Merchandise / T-Shirt Size',
    icon: 'Shirt',
    defaultPlaceholder: 'Select size',
    defaultOptions: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    defaultWidth: 'half',
    defaultRequired: false,
    description: 'Event apparel sizing'
  },
  {
    type: 'consent',
    category: FIELD_CATEGORIES.LOGISTICS,
    defaultLabel: 'Terms & Code of Conduct Agreement',
    icon: 'ShieldCheck',
    defaultPlaceholder: 'I agree to the Event Code of Conduct and consent to the processing of registration data for event admissions.',
    defaultWidth: 'full',
    defaultRequired: true,
    description: 'Required registration consent or policy agreement'
  }
];

export function createFieldInstance(paletteItem, customOverrides = {}) {
  const id = 'field_' + Math.random().toString(36).substring(2, 9);
  return {
    id,
    type: paletteItem.type,
    label: customOverrides.label || paletteItem.defaultLabel,
    placeholder: customOverrides.placeholder || paletteItem.defaultPlaceholder || '',
    helperText: customOverrides.helperText || paletteItem.defaultHelperText || '',
    required: customOverrides.required !== undefined ? customOverrides.required : (paletteItem.defaultRequired || false),
    width: customOverrides.width || paletteItem.defaultWidth || 'full',
    options: customOverrides.options || (paletteItem.defaultOptions ? [...paletteItem.defaultOptions] : []),
    category: paletteItem.category,
    icon: paletteItem.icon,
    ...customOverrides
  };
}
