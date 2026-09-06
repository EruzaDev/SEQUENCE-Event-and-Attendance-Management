// Event Form Presets & Templates for Sequence Form Studio
// Generalized for conferences, summits, corporate events, workshops, expos, and community meetups
import { createFieldInstance, AVAILABLE_FIELDS } from '../types/formSchema.js';

function getByLabel(label) {
  return AVAILABLE_FIELDS.find(f => f.defaultLabel === label) || AVAILABLE_FIELDS[0];
}

export const FORM_TEMPLATES = [
  {
    id: 'global_conference',
    title: 'Global Tech & Innovation Summit',
    category: 'Conference & Expo',
    description: 'Comprehensive registration form for large conferences, expos, and symposiums with ticket tiers and catering preferences.',
    icon: 'Sparkles',
    settings: {
      eventName: 'Future Horizons Summit 2026: The AI & Cloud Era',
      eventDescription: 'A multi-track conference bringing together industry leaders, innovators, researchers, and creators from around the world.',
      eventLocation: 'Metropolitan Convention Center & Global Livestream',
      eventDate: '2026-10-22T09:00',
      registrationDeadline: '2026-10-18T23:59',
      capacity: 500,
      domainRestrictionMode: 'any',
      allowedDomains: [],
      requireOtp: false,
      enableQrPass: true,
      ticketPrefix: 'SUMMIT',
      accentColor: '#6366f1'
    },
    fields: [
      createFieldInstance(getByLabel('Full Name'), { required: true, width: 'full' }),
      createFieldInstance(getByLabel('Email Address'), { 
        required: true, 
        placeholder: 'name@company.com',
        helperText: 'Your dynamic QR ticket pass will be delivered here',
        width: 'full' 
      }),
      createFieldInstance(getByLabel('Phone / Mobile Number'), { required: false, width: 'half' }),
      createFieldInstance(getByLabel('Registration Type / Ticket Tier'), { required: true, width: 'half' }),
      createFieldInstance(getByLabel('Organization / Company Name'), { required: true, width: 'half' }),
      createFieldInstance(getByLabel('Job Title / Role'), { required: true, width: 'half' }),
      createFieldInstance(getByLabel('Dietary Preferences'), { required: false, width: 'half' }),
      createFieldInstance(getByLabel('Merchandise / T-Shirt Size'), { required: false, width: 'half' }),
      createFieldInstance(getByLabel('Checkboxes (Multiple Choice)'), {
        label: 'Conference Tracks of Interest',
        options: ['Keynote & Main Stage', 'Cloud & DevOps Architecture', 'AI, Data & Machine Learning', 'Product Design & Leadership'],
        required: false,
        width: 'full'
      }),
      createFieldInstance(getByLabel('Terms & Code of Conduct Agreement'), { required: true, width: 'full' })
    ]
  },
  {
    id: 'executive_seminar',
    title: 'Corporate Executive Leadership Forum',
    category: 'Corporate & Business',
    description: 'Targeted registration for executive briefings, corporate galas, and industry networking assemblies.',
    icon: 'Building2',
    settings: {
      eventName: 'Executive Leadership Roundtable & Gala 2026',
      eventDescription: 'An exclusive forum discussing global business strategies, digital transformation, and governance.',
      eventLocation: 'Grand Ballroom, Plaza Hotel & Virtual Boardroom',
      eventDate: '2026-11-12T17:30',
      registrationDeadline: '2026-11-08T18:00',
      capacity: 180,
      domainRestrictionMode: 'any',
      allowedDomains: [],
      requireOtp: true,
      enableQrPass: true,
      ticketPrefix: 'EXEC26',
      accentColor: '#10b981'
    },
    fields: [
      createFieldInstance(getByLabel('Full Name'), { required: true, width: 'full' }),
      createFieldInstance(getByLabel('Email Address'), { required: true, width: 'full' }),
      createFieldInstance(getByLabel('Organization / Company Name'), { required: true, width: 'half' }),
      createFieldInstance(getByLabel('Job Title / Role'), { required: true, width: 'half' }),
      createFieldInstance(getByLabel('Industry / Sector'), { required: true, width: 'half' }),
      createFieldInstance(getByLabel('Short Text'), {
        label: 'LinkedIn Profile or Professional Website',
        placeholder: 'https://linkedin.com/in/yourprofile',
        required: false,
        width: 'half'
      }),
      createFieldInstance(getByLabel('Dietary Preferences'), { required: true, width: 'half' }),
      createFieldInstance(getByLabel('Radio Choice'), {
        label: 'Attendance Format',
        options: ['In-Person Reception & Dinner', 'Virtual Executive Stream Only'],
        required: true,
        width: 'half'
      }),
      createFieldInstance(getByLabel('Terms & Code of Conduct Agreement'), { required: true, width: 'full' })
    ]
  },
  {
    id: 'hands_on_workshop',
    title: 'Hands-on Technical Masterclass',
    category: 'Workshop & Training',
    description: 'Interactive training session capturing participant background, technical prerequisites, and learning goals.',
    icon: 'Laptop',
    settings: {
      eventName: 'Full-Stack Modern Web Architecture Masterclass',
      eventDescription: 'An intensive, hands-on masterclass focusing on high-scale distributed web applications and modern cloud workflows.',
      eventLocation: 'Tech Hub Arena, Lab 4 & Remote Sandbox',
      eventDate: '2026-09-29T13:00',
      registrationDeadline: '2026-09-26T23:59',
      capacity: 75,
      domainRestrictionMode: 'any',
      allowedDomains: [],
      requireOtp: false,
      enableQrPass: true,
      ticketPrefix: 'WKSP26',
      accentColor: '#06b6d4'
    },
    fields: [
      createFieldInstance(getByLabel('Full Name'), { required: true, width: 'full' }),
      createFieldInstance(getByLabel('Email Address'), { required: true, width: 'full' }),
      createFieldInstance(getByLabel('Organization / Company Name'), { required: false, width: 'half' }),
      createFieldInstance(getByLabel('Job Title / Role'), { required: false, width: 'half' }),
      createFieldInstance(getByLabel('Dropdown Select'), {
        label: 'Technical Experience Level',
        placeholder: 'Select proficiency',
        options: ['Beginner / Entry Level', 'Intermediate (1-3 years experience)', 'Senior / Lead Engineer (4+ years)'],
        required: true,
        width: 'half'
      }),
      createFieldInstance(getByLabel('Radio Choice'), {
        label: 'Will you bring your own laptop?',
        options: ['Yes, will bring laptop', 'No, need lab workstation reserved'],
        required: true,
        width: 'half'
      }),
      createFieldInstance(getByLabel('Paragraph / Long Text'), {
        label: 'What key outcomes or challenges do you want to address?',
        placeholder: 'Share your specific interests or questions for the instructor...',
        required: false,
        width: 'full'
      }),
      createFieldInstance(getByLabel('Terms & Code of Conduct Agreement'), { required: true, width: 'full' })
    ]
  },
  {
    id: 'community_meetup',
    title: 'Community Meetup & Networking Mixer',
    category: 'Meetup & Community',
    description: 'Lightweight registration for community meetups, social mixers, and developer user groups.',
    icon: 'Users',
    settings: {
      eventName: 'Designers & Developers Community Mixer',
      eventDescription: 'An informal evening of lightning talks, networking, and collaborative discussions with creators and engineers.',
      eventLocation: 'Downtown Innovation Commons & Rooftop Lounge',
      eventDate: '2026-10-05T18:30',
      registrationDeadline: '2026-10-04T12:00',
      capacity: 120,
      domainRestrictionMode: 'any',
      allowedDomains: [],
      requireOtp: false,
      enableQrPass: true,
      ticketPrefix: 'MEET26',
      accentColor: '#f59e0b'
    },
    fields: [
      createFieldInstance(getByLabel('Full Name'), { required: true, width: 'full' }),
      createFieldInstance(getByLabel('Email Address'), { required: true, width: 'full' }),
      createFieldInstance(getByLabel('Organization / Company Name'), { 
        label: 'Company, Project, or Freelance Affiliation',
        required: false, 
        width: 'half' 
      }),
      createFieldInstance(getByLabel('Short Text'), {
        label: 'Twitter / X or LinkedIn Handle',
        placeholder: '@yourhandle',
        required: false,
        width: 'half'
      }),
      createFieldInstance(getByLabel('Checkboxes (Multiple Choice)'), {
        label: 'Discussion Circles You Want to Join',
        options: ['UI/UX & Product Design', 'Frontend & React Ecosystem', 'AI Tools in Production', 'Startup & Freelance Life'],
        required: false,
        width: 'full'
      }),
      createFieldInstance(getByLabel('Terms & Code of Conduct Agreement'), { required: true, width: 'full' })
    ]
  }
];
