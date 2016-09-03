/**
 * Compute coverage metrics from the given locations.
 * @param {Array} locations – Existing coverage data locations.
 * @return {Object} Metrics.
 */
export default function metrics(locations) {
  const total = locations.length;
  const covered = locations.reduce((sum, {count}) => {
    return count > 0 ? sum + 1 : sum;
  }, 0);
  return {covered, total};
}
