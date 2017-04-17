import {decode} from './codec';

export function isLine({tags}) {
  for (let i = 0; i < tags.length; i += 1) {
    // We do not consider "branch" or "function" as lines:
    if (tags[i] === 'expression' || tags[i] === 'statement' || tags[i] === 'directive') {
      return true;
    }
  }
  return false;
}

/**
 * Compute line coverage given a list of instrumented locations.
 * @param {Array<Array>} coverage – Encoded coverage data.
 * @returns {Array} Array of line data.
 */
export default function lines(coverage) {
  const lineExecCount = {};

  decode(coverage).locations
    .filter(isLine)
    .forEach(entry => {
      const line = entry.loc.start.line;
      if (Object.hasOwnProperty.call(lineExecCount, line)) {
        lineExecCount[line] = Math.max(lineExecCount[line], entry.count);
      } else {
        lineExecCount[line] = entry.count;
      }
    });

  return Object.keys(lineExecCount).map(line => {
    const count = lineExecCount[line];
    return {line, count};
  });
}
