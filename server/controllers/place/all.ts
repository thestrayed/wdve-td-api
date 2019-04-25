import { Request, Response } from 'express';
import HttpStatus from 'http-status';

import db from '@models';
import { PlaceModelStatic } from '@typings';

export default async (_req: Request, res: Response) => {
    try {
        const places = await (db.Place as PlaceModelStatic).findAll();
        res.status(HttpStatus.OK).json(places);
    } catch (err) {
        throw err;
    }
}
