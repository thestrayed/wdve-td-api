import Joi from '@hapi/joi';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import { PlaceService } from '@services';

const placeService = new PlaceService();

export async function update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const place = await placeService.update(req.body, { id });

    return res.status(HttpStatus.OK).json({ data: place });
}

export const updateRequestSchema = {
    params: {
        id: Joi.string().required(),
    },
    body: {
        name: Joi.string().optional(),
        latitude: Joi.number().optional(),
        longitude: Joi.number().optional(),
    },
};
