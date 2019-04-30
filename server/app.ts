import config from 'config';
import express, { Request, Response } from 'express';

const app = express();

app.set('port', config.get('wdve-td.port'));

export default app;
