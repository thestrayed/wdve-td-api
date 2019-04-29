import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import { PlaceService } from '@services';

const placeService = new PlaceService();

export default async (_req: Request, res: Response) => {
    try {
        const places = await placeService.all();
        res.status(HttpStatus.OK).json(places);
    } catch (err) {
        throw err;
    }
};
