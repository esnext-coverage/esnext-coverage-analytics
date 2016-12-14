import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import tags from '../../src/tags';
import {metrics} from '../../src';

it('should calculate correct metrics', () => {
  const fixture = path.resolve(__dirname, '../fixture/no-branch.json');
  const projectCoverage = JSON.parse(fs.readFileSync(fixture, 'utf8'));
  const fileCoverage = projectCoverage.files['src/no-branch.js'].coverage;
  const result = tags(fileCoverage);
  expect(metrics(result.function)).to.have.property('total', 1);
  expect(metrics(result.statement)).to.have.property('total', 1);
});

it('should evaluate metrics value to one when tag is missing', () => {
  const fixture = path.resolve(__dirname, '../fixture/no-branch.json');
  const projectCoverage = JSON.parse(fs.readFileSync(fixture, 'utf8'));
  const fileCoverage = projectCoverage.files['src/no-branch.js'].coverage;
  const result = tags(fileCoverage, ['branch']);
  expect(metrics(result.branch)).to.have.property('total', 0);
  expect(metrics(result.branch)).to.have.property('covered', 0);
});
