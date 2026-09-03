// Registry mapping a language id to its exercise module. Every consumer
// (filters, badges, progress, the carousel) reads through here keyed by the
// active language, so adding a language means adding a module and one entry
// rather than touching each consumer.
//
// Each module must export the same shape: exercises, CORE_FUNCTIONS,
// SECONDARY_FUNCTIONS, KNOWN_FUNCTIONS, DIFFICULTIES, exerciseHasFunction,
// DOC_SITE_NAME and KNOWN_FUNCTION_DOC_LINKS.
import * as javascript from './javascript-exercises.js';
import * as python from './python-exercises.js';

const REGISTRY = {
  javascript,
  python
};

export const DEFAULT_LANGUAGE = 'javascript';

// Falls back to the default rather than throwing: a stale persisted language
// or a hand-edited ?lang= should degrade to JavaScript, not blank the page.
export function getLanguageData(languageId) {
  return REGISTRY[languageId] ?? REGISTRY[DEFAULT_LANGUAGE];
}

export function isKnownLanguage(languageId) {
  return Object.hasOwn(REGISTRY, languageId);
}
