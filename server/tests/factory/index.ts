import _ from 'lodash';

import { BaseBuildOptions, BaseModelStatic, Optionalize, BaseModel, BaseCreateOptions } from '@typings/base';

class ModelFactory {
    protected size: number;

    constructor(
        private model: BaseModelStatic<any>,
        private props: Optionalize<any> = {},
    ) {}

    /**
     * Build models without persisting
     * @param {BuildOptions} [options={}]
     */
    async build<T>(options: BaseBuildOptions = {} as BaseBuildOptions): Promise<BaseModel<T>[]> {
        const modelProp = await import(`./models/${this.model.tableName}`);
        const mergedProps = _.map(Array(this.size), () => modelProp.default(this.props));

        const models = this.model.build(mergedProps, options);
        return models;
    }

    /**
     * Create models
     * @param {BaseCreateOptions} [options={}]
     */
    async create(options: BaseCreateOptions = {} as BaseCreateOptions): Promise<BaseModel<any>[]> {
        const modelProp = await import(`./models/${this.model.tableName}`);
        const mergedProps = _.map(Array(this.size), () => modelProp.default(this.props));

        const models = await this.model.bulkCreate(mergedProps, options);
        return models;
    }

    /**
     * Define size of model factory
     * @param {Number} [number=1]
     */
    no(number: number = 1): this {
        this.size = number;
        return this;
    }
}

export default ModelFactory;
