import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import {filter} from '../../src';

const fixture = path.resolve(__dirname, '../fixture/no-branch.json');
const projectCoverage = JSON.parse(fs.readFileSync(fixture, 'utf8'));
const fileCoverage = projectCoverage['src/no-branch.js'];

it('should filter', () => {
  const result = filter(fileCoverage, [
    {rule: 'include', tag: 'statement'},
    {rule: 'exclude', tag: 'function'}
  ]);
  result.forEach(({tags}) => {
    expect(tags).to.not.contain('function');
    expect(tags).to.contain('statement');
  });
});
