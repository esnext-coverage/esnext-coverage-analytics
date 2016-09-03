import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import {tags} from '../../src';

const fixture = path.join(__dirname, '/../fixture/coverage-no-branch.json');
const data = JSON.parse(fs.readFileSync(fixture, 'utf8'));
const coverage = data['src/no-branch.js'];

it('should use tags as keys from the coverage data', () => {
  const result = tags(coverage.locations);
  expect(result).to.have.property('statement');
  expect(result).to.have.property('function');
});

it('should use locations as values from the coverage data', () => {
  const result = tags(coverage.locations);
  expect(result.statement).to.be.an.instanceof(Array);
  expect(result.statement).to.have.property('length', 1);
});

it('should select non-existant tags as empty arrays', () => {
  const result = tags(coverage.locations, ['foo']);
  expect(result.foo).to.be.an.instanceof(Array);
  expect(result.foo).to.have.property('length', 0);
});

it('should not treat inherited properties as tags', () => {
  const locationsWithNameCollisions = [{tags: ['constructor']}];
  expect(() => tags(locationsWithNameCollisions, [])).to.not.throw();
});
