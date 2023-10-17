import jsonServer from 'json-server';
import express from 'express';
import path from 'path';
import cors from 'cors';

const server = jsonServer.create();
const dbRouter = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors());

server.use(middlewares);

server.use(dbRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
