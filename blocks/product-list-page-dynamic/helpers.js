/* eslint-disable import/prefer-default-export */
import { getMetadata } from '../../scripts/aem.js';

function getPLPconfig() {
  const path = window.location.pathname;
  const result = /\/category\/([\w|-]+)$/.exec(path);
  const urlpath = result?.[1];
  if (!urlpath) {
    return {
      urlpath: null,
      category: null,
    };
  }
  const category = getMetadata('categoryId') || '4';
  return {
    urlpath,
    category,
  };
}

export {
  getPLPconfig,
};
