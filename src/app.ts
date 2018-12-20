import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import { requestLoggerMiddleware } from './request.logger.middleware';

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);

app.get('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	resp.json([{id: 1, description: 'Buy Bread'}]);
});

app.post('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(req.body);
	resp.end();
});

app.put('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(req.body);
	console.info(req.params.id);
	resp.end();
});

app.delete('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(req.params.id);
	resp.end();
});

export { app };
