import config from 'config';
import express from 'express';

const app = express();

app.set('port', config.get('wdve-td.port'));

export default app;
