const tagMapping = [
  'statement', // 0
  'expression', // 1
  'function', // 2
  'branch', // 3
  'variable', // 4
  'import', // 5
  'export', // 6
  'directive', // 7
  'constructor' // 8
];

/**
 * Encodes a decoded coverage location.
 * @param {Object} location - Decoded location.
 * @return {Array<Number>} Encoded location.
 */
export function encode({count = 0, loc, tags}) {
  return [
    count,
    loc.start.column, loc.start.line,
    loc.end.column, loc.end.line,
    ...tags.map(tag => tagMapping.indexOf(tag))
  ];
}

/**
 * Encodes a list of decoded coverage locations.
 * @param {Array<Object>} locations - List of decoded locations.
 * @return {Array<Array>} List of encoded locations.
 */
export function encodeAll(locations) {
  return locations.map((location, index) => {
    const encodedLocation = encode(location);
    encodedLocation.id = index;
    return encodedLocation;
  });
}

/**
 * Decodes an encoded coverage location.
 * @param {Array<Number>} location - Encoded location.
 * @param {Number} index - Index of location used as location id.
 * @return {Array<Number>} Encoded location.
 */
export function decode(location, index) {
  return {
    id: index,
    count: location[0],
    loc: {
      start: {column: location[1], line: location[2]},
      end: {column: location[3], line: location[4]}
    },
    tags: location.slice(5).map(tagId => tagMapping[tagId])
  };
}

/**
 * Decodes a list of encoded coverage locations.
 * @param {Array<Array>} locations - List of encoded locations.
 * @return {Array<Object>} List of decoded locations.
 */
export function decodeAll(locations) {
  return locations.map(decode);
}
