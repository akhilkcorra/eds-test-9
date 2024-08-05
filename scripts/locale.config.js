const localeConfig = {
  defaultLocale: 'en',
  availableLocales: [
    { label: 'English', code: 'en' },
    { label: 'French', code: 'fr' },
  ],
  get locales() {
    return this.availableLocales.map((locale) => locale.code);
  },
};

export default localeConfig;
