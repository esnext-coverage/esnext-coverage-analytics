import path from 'path';
import {readFileSync} from 'fs';
import {expect} from 'chai';

import lines from '../../src/lines';

const fixtureFileName = path.resolve(__dirname, '../fixture/no-lines-locations.fixture.json');
const locations = JSON.parse(readFileSync(fixtureFileName, 'utf8'));

it('should report zero lines for locations where no lines are found', () => {
  expect(lines(locations))
    .to.have.property('length', 0);
});
