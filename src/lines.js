/**
 * Compute line coverage given a list of instrumented locations.
 * @param {Array} locations – Existing coverage data locations.
 * @returns {Array} Array of line data.
 */
export default function lines(locations) {
  const index = {};
  locations.forEach(entry => {
    for (let i = entry.loc.start.line; i <= entry.loc.end.line; i += 1) {
      // If a statement hasn't been covered ensure the line is marked as
      // not covered.
      if (i in index) {
        index[i] = Math.min(index[i], entry.count);
      } else {
        index[i] = entry.count;
      }
    }
  });
  return Object.keys(index).map(line => {
    return {
      line,
      passed: index[line] > 0,
      count: index[line]
    };
  });
}
