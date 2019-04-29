import _ from 'lodash';

import { BuildOptions } from 'sequelize';

import { BaseModelStatic, BaseModel } from '@typings';

export default async (
    model: BaseModelStatic<any>,
    props: any = {},
    options: BuildOptions = {},
    i: number = 1,
): Promise<BaseModel<any>[]> => {
    const modelProp = await import(`./models/${model.tableName}`);

    const mergedProps = _.map(Array(i), () => modelProp.default(props));

    const models = model.build(mergedProps, options);

    return models;
};
