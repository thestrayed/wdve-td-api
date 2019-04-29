import faker from 'faker';
import _ from 'lodash';

export default (props: object): object => {
    const defaultProps = {
        id: faker.random.number(),
        name: faker.name.title(),
        latitude: faker.address.latitude(),
        longtitude: faker.address.longitude(),
    };

    return _.merge({}, defaultProps, props);
};
