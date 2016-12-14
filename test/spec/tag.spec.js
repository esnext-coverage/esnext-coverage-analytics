import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import {tags} from '../../src';

const fixture = path.join(__dirname, '/../fixture/no-branch.json');
const projectCoverage = JSON.parse(fs.readFileSync(fixture, 'utf8'));
const fileCoverage = projectCoverage.files['src/no-branch.js'].coverage;

it('should use tags as keys from the coverage data', () => {
  const result = tags(fileCoverage);
  expect(result).to.have.property('statement');
  expect(result).to.have.property('function');
});

it('should use locations as values from the coverage data', () => {
  const result = tags(fileCoverage);
  expect(result.statement).to.be.an.instanceof(Array);
  expect(result.statement).to.have.property('length', 1);
});

it('should select non-existant tags as empty arrays', () => {
  const result = tags(fileCoverage, ['foo']);
  expect(result.foo).to.be.an.instanceof(Array);
  expect(result.foo).to.have.property('length', 0);
});

it('should not treat inherited properties as tags', () => {
  const locationsWithNameCollisions = [[0, 0, 0, 0, 0, 8]];
  expect(() => tags(locationsWithNameCollisions, [])).to.not.throw();
});
