// Initial default form state for Sequence Event Registration Studio
// Generalized for conferences, summits, corporate events, and workshops
import { FORM_TEMPLATES } from './templates.js';

export const DEFAULT_FORM = {
  settings: { ...FORM_TEMPLATES[0].settings },
  fields: FORM_TEMPLATES[0].fields.map(f => ({ ...f, options: f.options ? [...f.options] : [] }))
};
