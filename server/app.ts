import config from 'config';
import express, { Request, Response } from 'express';

import db from './models';
import { PlaceModelStatic } from './typings';

const app = express();

app.set('port', config.get('wdve-td.port'));

app.get('/', async (_req: Request, res: Response) => {
    try {
        const places = await (db.Place as PlaceModelStatic).findAll();
        res.status(200).json(places);
    } catch (err) {
        console.error(err);
    }
});

export default app;
