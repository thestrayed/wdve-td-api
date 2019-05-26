import faker from 'faker';
import _ from 'lodash';

import { PartialPlace } from '@typings/models/place';

export default (props: PartialPlace): PartialPlace => {
    const defaultProps: PartialPlace = {
        id: faker.random.number(100),
        name: faker.name.title(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
    };

    return _.merge({}, defaultProps, props);
};
