import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorMiddleware';
import carRouter from './routes/car';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);
app.use(errorHandler);

export default app;
