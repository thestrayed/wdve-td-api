import config from 'config';
import express from 'express';

import { errorHandler } from '@middlewares';

const app = express();

app.set('port', config.get('wdve-td.port'));

app.use(errorHandler);

export default app;
