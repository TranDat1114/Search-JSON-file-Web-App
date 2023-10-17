import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const dbRouter = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());

server.use(middlewares);

server.use(dbRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
