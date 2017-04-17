const locationTagMapping = [
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

const tokenTypeMapping = [
  'keyword', // 0
  'comment', // 1
  'name', // 2
  'string', // 3
  'other' // 4
];

/**
 * Encodes a decoded coverage location.
 * @param {Object} location - Decoded location.
 * @return {Array<Number>} Encoded location.
 */
export function encodeLocation({count = 0, loc, tags}) {
  return [
    count,
    loc.start.column, loc.start.line,
    loc.end.column, loc.end.line,
    ...tags.map(tag => locationTagMapping.indexOf(tag))
  ];
}

/**
 * Decodes an encoded coverage location.
 * @param {Array<Number>} location - Encoded location.
 * @param {Number} index - Index of location used as location id.
 * @return {Array<Number>} Decoded location.
 */
export function decodeLocation(location, index) {
  return {
    id: index,
    count: location[0],
    loc: {
      start: {column: location[1], line: location[2]},
      end: {column: location[3], line: location[4]}
    },
    tags: location.slice(5).map(tagId => locationTagMapping[tagId])
  };
}

/**
 * Encodes a simplified token.
 * @param {Object} token - Simplified token.
 * @return {Array<Number>} Encoded token.
 */
export function encodeToken({type, loc}) {
  return [
    loc.start.column, loc.start.line,
    loc.end.column, loc.end.line,
    tokenTypeMapping.indexOf(type)
  ];
}

/**
 * Decodes an encoded simplified token.
 * @param {Array<Number>} token - Encoded token.
 * @return {Object} Decoded token.
 */
export function decodeToken([startColumn, startLine, endColumn, endLine, typeId]) {
  return {
    type: tokenTypeMapping[typeId],
    loc: {
      start: {column: startColumn, line: startLine},
      end: {column: endColumn, line: endLine}
    }
  };
}

/**
 * Decodes a list of encoded coverage locations.
 * @param {Array<Array>} coverage - Encoded coverage.
 * @return {Object} Decoded coverage.
 */
export function decode([locations = [], tokens = [], stack = []]) {
  locations = locations.map(decodeLocation);
  tokens = tokens.map(decodeToken);
  return {locations, tokens, stack};
}
