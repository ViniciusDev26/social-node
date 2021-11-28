import "dotenv/config";

import express from 'express';
import cors from 'cors';

import { routes } from './routes';
import { verifyAuthenticatedUser } from "./middlewares/verifyAuthenticatedUser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', verifyAuthenticatedUser, (req, res) => {
  const user = req.user;
  return res.send(`Hello, ${user.firstName} ${user.lastName}`);
});

export { app };