import * as express from 'express';

import { TodoModel } from './todo';

const todoRoutes = express.Router();
todoRoutes.get('/todo', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	try {
		let items: any = await TodoModel.find({});
		items = items.map((item) => { return {id: item._id, description: item.description}});
		resp.json(items);
	} catch (err) {
		resp.status(500);
		resp.end();
		console.error('Caught error', err);
	}
});

todoRoutes.post('/todo', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const item = new TodoModel({description: description});
	await item.save();
	resp.end();
});

todoRoutes.put('/todo/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const id = req.params['id'];
	await TodoModel.findOneAndUpdate({id: id}, {description: description});
	resp.end();
});

todoRoutes.delete('/todo/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];

	await TodoModel.findByIdAndRemove(id);
	resp.end();
});

export { todoRoutes }