import "dotenv/config";

import express from 'express';
import { routes } from './routes';
import { verifyAuthenticatedUser } from "./middlewares/verifyAuthenticatedUser";

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', verifyAuthenticatedUser, (req, res) => {
  const user = req.user;
  return res.send(`Hello, ${user.firstName} ${user.lastName}`);
});


app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});