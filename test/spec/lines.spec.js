import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import {lines} from '../../src';

it('should report zero lines for locations where no lines are found', () => {
  const fixtureFileName = path.resolve(__dirname, '../fixture/no-lines.fixture.json');
  const projectCoverage = JSON.parse(fs.readFileSync(fixtureFileName, 'utf8'));
  const fileCoverage = projectCoverage['src/no-lines.js'];

  expect(lines(fileCoverage))
    .to.have.property('length', 0);
});

it('should aggregate multiple expressions on single line to one line', () => {
  const fixtureFileName = path.resolve(__dirname, '../fixture/single-line.fixture.json');
  const projectCoverage = JSON.parse(fs.readFileSync(fixtureFileName, 'utf8'));
  const fileCoverage = projectCoverage['src/single-line.js'];

  expect(lines(fileCoverage))
    .to.have.property('length', 1);
});
