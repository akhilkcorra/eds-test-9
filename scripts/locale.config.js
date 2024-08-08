const localeConfig = {
  defaultLocale: 'en',
  availableLocales: [
    { label: 'English', code: 'en' },
    { label: 'French', code: 'fr' },
  ],
  get locales() {
    return this.availableLocales.map((locale) => locale.code);
  },
  get currentLocale() {
    const pathnameLocale = window?.location?.pathname?.split('/')[1];
    return this.locales.includes(pathnameLocale) ? pathnameLocale : this.defaultLocale;
  },
};

export default localeConfig;
