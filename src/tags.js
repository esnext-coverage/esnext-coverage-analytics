import {decode} from './codec';

/**
 * Generate a tag index from coverage data.
 * @param {Array<Array>} coverage – Encoded coverage data.
 * @param {Array} [tagsToSelect] – List of tags to get data for.
 * @returns {Object} Locations grouped by tag.
 */
export default function coverageByTag(coverage, tagsToSelect) {
  const tagIndex = {};
  if (tagsToSelect) {
    tagsToSelect.forEach(entry => {
      tagIndex[entry] = [];
    });
  }
  decode(coverage).locations.forEach(location => {
    location.tags.forEach(tag => {
      if (Object.hasOwnProperty.call(tagIndex, tag)) {
        tagIndex[tag].push(location);
      } else if (!tagsToSelect) {
        tagIndex[tag] = [];
        tagIndex[tag].push(location);
      }
    });
  });
  return tagIndex;
}
