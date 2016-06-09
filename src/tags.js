/**
 * Generate a tag index from coverage data.
 *
 * Creates an object where keys are tags and values are arrays of locations.
 *
 * @param {Array} locations – Existing coverage data locations.
 * @param {Array} select – List of tags to get data for.
 * @returns {Object} Locations grouped by tag.
 */
export default function tags(locations, select) {
  const tagIndex = {};
  if (select) {
    select.forEach(entry => {
      tagIndex[entry] = [];
    });
  }
  locations.forEach(location => {
    location.tags.forEach(tag => {
      if (tagIndex.hasOwnProperty(tag)) {
        tagIndex[tag].push(location);
      } else if (!select) {
        tagIndex[tag] = [];
        tagIndex[tag].push(location);
      }
    });
  });
  return tagIndex;
}
