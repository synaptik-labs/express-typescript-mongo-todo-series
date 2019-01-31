import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';

import { requestLoggerMiddleware } from './request.logger.middleware';
import './todo.controller';

import { RegisterRoutes } from './routes';
import * as swaggerUi from 'swagger-ui-express';

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(requestLoggerMiddleware);
RegisterRoutes(app);

try {
	const swaggerDocument = require('../swagger.json');
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
	console.error('Unable to read swagger.json', err);
}

export { app };
