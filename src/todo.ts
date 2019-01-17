import * as mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
	description: String
});

const TodoModel = mongoose.model('Todo', TodoSchema);

export { TodoModel }