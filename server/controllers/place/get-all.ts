import Joi from '@hapi/joi';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import { PlaceService } from '@services';

const placeService = new PlaceService();

export async function getAll(req: Request, res: Response): Promise<Response> {
    const places = await placeService.get(req.query.page, req.query.pageSize);

    return res.status(HttpStatus.OK).json({ data: places });
}

export const getAllRequestSchema = {
    query: {
        page: Joi.number().optional(),
        pageSize: Joi.number().optional(),
    },
};
