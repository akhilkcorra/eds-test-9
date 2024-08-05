/* eslint-disable import/prefer-default-export */
import { getMetadata } from './aem.js';
import localeConfig from './locale.config.js';

/**
 * Updates the locale part of a given path with a new locale.
 *
 * @param {string} path - The original path to be updated.
 * @param {string} newLocale - The new locale to replace the existing one.
 * @returns {string} The updated path with the new locale.
 *
 * @example
 * // Given:
 * const originalPath = '/en/about-us';
 * const newLocale = 'fr';
 *
 * // When:
 * const updatedPath = updatePathWithLocale(originalPath, newLocale);
 *
 * // Then:
 * updatedPath === '/fr/about-us';
 */
function updatePathWithLocale(path, newLocale) {
  const parts = path.split('/');
  parts[1] = newLocale;
  return parts.join('/');
}

/**
 * Decorates anchor tags in the provided element by updating their href attribute
 * with the current locale from the AEM metadata. Only local URLs starting with '/'
 * are updated.
 *
 * @param {HTMLElement} element - The HTML element to search for anchor tags.
 *
 * @returns {void} The function does not return a value.
 *
 * @example
 * // Given:
 * const element = document.querySelector("#main-content");
 *
 * // When:
 * decorateLinks(element);
 *
 * // Then:
 * // The href attribute of all local anchor tags in the #main-content element
 * // will be updated with the current locale.
 */
function decorateLinks(element) {
  const links = element.querySelectorAll('a');
  const locale = getMetadata('locale');
  const isDefaultLocale = localeConfig.defaultLocale === locale;
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/') && !isDefaultLocale) {
      // Adjust only local URLs
      const newHref = updatePathWithLocale(href, locale);
      link.setAttribute('href', newHref);
    }
  });
}

export { decorateLinks };
