import {isLine} from './lines';

/**
 * Generate a tag index from coverage data.
 * @param {Array} locations – Existing coverage data locations.
 * @param {Array} [tagsToSelect] – List of tags to get data for.
 * @returns {Object} Locations grouped by tag.
 */
export default function tags(locations, tagsToSelect) {
  const tagIndex = {};
  if (tagsToSelect) {
    tagsToSelect.forEach(entry => {
      tagIndex[entry] = [];
    });
  }
  locations.forEach(location => {
    const locationTags = tagIndex.line && isLine(location) ?
      location.tags.concat('line') :
      location.tags;
    locationTags.forEach(tag => {
      if (tagIndex.hasOwnProperty(tag)) {
        tagIndex[tag].push(location);
      } else if (!tagsToSelect) {
        tagIndex[tag] = [];
        tagIndex[tag].push(location);
      }
    });
  });
  return tagIndex;
}
