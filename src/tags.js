/**
 * Generate a tag index from coverage data.
 * @param {Array} locations – Existing coverage data locations.
 * @param {Array} [tagsToSelect] – List of tags to get data for.
 * @returns {Object} Locations grouped by tag.
 */
export default function coverageByTag(locations, tagsToSelect) {
  const tagIndex = {};
  if (tagsToSelect) {
    tagsToSelect.forEach(entry => {
      tagIndex[entry] = [];
    });
  }
  locations.forEach(location => {
    location.tags.forEach(tag => {
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
