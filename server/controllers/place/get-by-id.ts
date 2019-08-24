import Joi from '@hapi/joi';
import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import { PlaceService } from '@services';

const placeService = new PlaceService();

export async function getById(req: Request, res: Response): Promise<Response> {
    const placeId = parseInt(req.params.id, 10);
    const place = await placeService.getById(placeId);
    if (!place) {
        return res.status(HttpStatus.NOT_FOUND).send();
    }

    return res.status(HttpStatus.OK).json({ data: place });
}

export const getByIdRequestSchema = {
    params: {
        id: Joi.number().required(),
    },
};
