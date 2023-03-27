import 'dotenv/config';
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
import express from "express";
import UserController from './app/controllers/UserController';
import Queue from './app/lib/Queue';


const app = express();
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: Queue.queues.map(queue => new BullAdapter(queue.bull)),
  serverAdapter: serverAdapter,
});







app.use(express.json());
app.post('/users', UserController.store);

app.use('/admin/queues', serverAdapter.getRouter());

app.listen(3333, () => {
    console.log("Server running on localhost:3333")
});
