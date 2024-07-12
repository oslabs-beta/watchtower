import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ServerError } from './types';

import apiRouter from './routes/apiRouter.ts';

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('/api', apiRouter);

app.use((req: Request, res: Response) =>
  res.status(404).send("This is not the page you're looking for")
);

app.use(
  (err: ServerError, req: Request, res: Response, _next: NextFunction) => {
    const defaultErr: ServerError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
