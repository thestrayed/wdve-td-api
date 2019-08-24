import Joi from '@hapi/joi';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import { PlaceService } from '@services';

const placeService = new PlaceService();

export async function create(req: Request, res: Response) {
    const place = await placeService.create(req.body);
    res.status(HttpStatus.CREATED).json({
        data: { place },
    });
}

export const createRequestSchema = {
    body: {
        name: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    },
};
