import config from 'config';
import express from 'express';
import HttpStatus from 'http-status';

import { errorHandler } from '@middlewares';
import router from '@routes';

const app = express();

app.set('port', config.get('wdve-td.port'));

app.use(express.json({ limit: config.get('wdve-td.limit') }));

app.get('/api/health', (_req, res) => {
    res.status(HttpStatus.OK).send();
});

app.use(router);

app.use(errorHandler);

export default app;
