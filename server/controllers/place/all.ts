import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import { PlaceService } from '@services';

const placeService = new PlaceService();

export async function all(_req: Request, res: Response) {
    const places = await placeService.get();
    res.status(HttpStatus.OK).json(places);
}
