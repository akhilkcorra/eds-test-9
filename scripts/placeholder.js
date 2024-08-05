import { getMetadata, toCamelCase } from './aem.js';
import localeConfig from './locale.config.js';
/**
 * Retrieves the locale path for fetching localized placeholders.
 *
 * @param {string} [locale=config.defaultLocale] - The locale for which to fetch the placeholders.
 *   If not provided, the default locale from the config file will be used.
 * @param {string} [namespace='common'] - The namespace for which to fetch the placeholders.
 *   If not provided, the 'common' namespace will be used.
 *
 * @returns {Object} - An object containing the locale path key and path.
 *   The 'key' property is a string in the format '{locale}/{namespace}'.
 *   The 'path' property is a string in the format 'i18n/{namespace}.json?sheet={locale}'.
 */
function getLocalePath(locale = localeConfig.defaultLocale, namespace = 'common') {
  const validLocale = localeConfig.locales.includes(locale) ? locale : localeConfig.defaultLocale;
  return {
    key: `${validLocale}/${namespace}`,
    path: `/placeholders/${namespace}.json?sheet=${validLocale}`,
  };
}
/**
 * Fetches localized placeholders from a JSON file based on the provided locale and namespace.
 * If the placeholders for the given locale and namespace have already been fetched,
 * the function will return the cached placeholders. Otherwise, it will fetch the placeholders
 * from the specified JSON file and cache them for future use.
 *
 * @param {string} [namespace='common'] - The namespace for which to fetch the placeholders.
 *   If not provided, the 'common' namespace will be used.
 *
 * @returns {Promise<Object>} - A promise that resolves the localized placeholders.
 *   The keys of the object are the camelCased versions of the placeholder keys from the JSON file,
 *   and the values are the corresponding placeholder texts.
 */
async function fetchLocalizedPlaceholders(namespace = 'common') {
  const locale = getMetadata('locale');
  const { path, pkey: prefix } = getLocalePath(locale, namespace);
  window.placeholders = window.placeholders || {};
  if (!window.placeholders[prefix]) {
    window.placeholders[prefix] = new Promise((resolve) => {
      fetch(path)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          return {};
        })
        .then((json) => {
          const placeholders = {};
          json.data
            .filter((placeholder) => placeholder.Key)
            .forEach((placeholder) => {
              placeholders[toCamelCase(placeholder.Key)] = placeholder.Text;
            });
          window.placeholders[prefix] = placeholders;
          resolve(window.placeholders[prefix]);
        })
        .catch(() => {
          // error loading placeholders
          window.placeholders[prefix] = {};
          resolve(window.placeholders[prefix]);
        });
    });
  }
  return window.placeholders[`${prefix}`];
}

// eslint-disable-next-line import/prefer-default-export
export { fetchLocalizedPlaceholders };
