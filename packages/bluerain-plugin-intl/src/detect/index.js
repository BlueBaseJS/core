// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
navigator.language ||
navigator.userLanguage;

// Split locales with a region code
const parentLanguage = language.toLowerCase().split(/[_-]+/)[0];

export {
	language,
	parentLanguage
};
