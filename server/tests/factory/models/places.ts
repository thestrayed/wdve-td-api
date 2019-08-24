import faker from 'faker';

import { PartialPlace } from '@typings/models/place';

export default (props: PartialPlace): PartialPlace => {
    const defaultProps: PartialPlace = {
        id: faker.random.number(100),
        name: faker.name.title(),
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
    };

    return {
        ...defaultProps,
        ...props,
    };
};
