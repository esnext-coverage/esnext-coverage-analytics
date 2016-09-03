import path from 'path';
import fs from 'fs';
import {expect} from 'chai';

import {lines} from '../../src';

const fixtureFileName = path.resolve(__dirname, '../fixture/no-lines-locations.fixture.json');
const locations = JSON.parse(fs.readFileSync(fixtureFileName, 'utf8'));

it('should report zero lines for locations where no lines are found', () => {
  expect(lines(locations))
    .to.have.property('length', 0);
});
