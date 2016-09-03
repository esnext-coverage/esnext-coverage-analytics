import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import {filter} from '../../src';

const fixture = path.join(__dirname, '/../fixture/coverage-no-branch.json');
const data = JSON.parse(fs.readFileSync(fixture, 'utf8'));
const coverage = data['src/no-branch.js'];

it('should filter', () => {
  const result = filter(coverage.locations, [
    {rule: 'include', tag: 'statement'},
    {rule: 'exclude', tag: 'function'}
  ]);
  result.forEach(({tags}) => {
    expect(tags).to.not.contain('function');
    expect(tags).to.contain('statement');
  });
});
