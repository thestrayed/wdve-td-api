import faker from 'faker';
import _ from 'lodash';

import { PartialPlace } from '@typings/models/place';

export default {
    Place: {
        create: (createObj: PartialPlace) => Promise.resolve(_.merge({ id: faker.random.number(10) }, createObj)),
        findAll: jest.fn(),
        update: jest.fn(),
    },
};
