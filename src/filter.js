import {decodeAll} from './codec';

/**
 * Filters out unwanted tags from coverage data.
 *
 * Given some rules, return a filter map object that marks which entries in the
 * coverage data should be included or excluded. The rules list is an array of
 * { "rule": "include|exclude", "tag": "sometag" } and the last rule always
 * takes precedence when analyzing a statement.
 *
 * @param {Array<Array>} locations – Encoded coverage data locations.
 * @param {Array} rules – List of rules.
 * @returns {Object} New coverage data.
 */
export default function filter(locations, rules) {
  const map = {};
  const index = {};

  rules.forEach(({rule, tag}, i) => {
    const value = rule === 'include';
    map[i] = value;
    index[tag] = i;
  });

  return decodeAll(locations).filter(location => {
    const {tags} = location;
    const indices = tags.map(tag => index[tag]);
    const max = Math.max(...indices);
    return map[max];
  });
}
