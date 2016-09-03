import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import tags from '../../src/tags';
import metrics from '../../src/metrics';

it('should calculate correct metrics', () => {
  const fixture = path.join(__dirname, '/../fixture/coverage-no-branch.json');
  const data = JSON.parse(fs.readFileSync(fixture, 'utf8'));
  const coverage = data['src/no-branch.js'];
  const result = tags(coverage.locations);
  expect(metrics(result.function)).to.have.property('total', 1);
  expect(metrics(result.statement)).to.have.property('total', 1);
});

it('should evaluate metrics value to one when tag is missing', () => {
  const fixture = path.join(__dirname, '/../fixture/coverage-no-branch.json');
  const data = JSON.parse(fs.readFileSync(fixture, 'utf8'));
  const coverage = data['src/no-branch.js'];
  const result = tags(coverage.locations, ['branch']);
  expect(metrics(result.branch)).to.have.property('total', 0);
  expect(metrics(result.branch)).to.have.property('covered', 0);
});
