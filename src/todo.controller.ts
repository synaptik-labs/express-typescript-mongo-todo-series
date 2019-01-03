import * as express from 'express';
import * as mongodb from 'mongodb';

import { MongoHelper } from './mongo.helper';

const todoRoutes = express.Router();

const getCollection = () => {
	return MongoHelper.client.db('todo').collection('todos');
}

todoRoutes.get('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const collection = getCollection();
	collection.find({}).toArray((err, items) => {
		if (err) {
			resp.status(500);
			resp.end();
			console.error('Caught error', err);
		} else {
			items = items.map((item) => { return {id: item._id, description: item.description}});
			resp.json(items);
		}
	})
});

todoRoutes.post('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const collection = getCollection();
	collection.insert({description: description});
	resp.end();
});

todoRoutes.put('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const id = req.params['id'];
	const collection = getCollection();

	collection.findOneAndUpdate({"_id": new mongodb.ObjectId(id)}, {$set: {description: description}});

	resp.end();
});

todoRoutes.delete('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];
	const collection = getCollection();

	collection.remove({"_id": new mongodb.ObjectId(id)});
	resp.end();
});

export { todoRoutes }