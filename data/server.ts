import jsonServer from 'json-server';
import express from 'express';
import path from 'path';
import cors from 'cors';

const server = jsonServer.create();
const organizationsRouter = jsonServer.router(path.join(__dirname, 'organizations.json'));
const usersRouter = jsonServer.router(path.join(__dirname, 'users.json'));
const ticketsRouter = jsonServer.router(path.join(__dirname, 'tickets.json'));
const middlewares = jsonServer.defaults();

server.use(cors());

server.use(middlewares);

server.use(organizationsRouter);
// server.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
