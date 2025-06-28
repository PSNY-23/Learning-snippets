import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import testRoutes from './routes/test.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//api routes
app.get("/", (req, res) => {
    res.json({message: "working..."})
})
app.use('/api/test', testRoutes);

//universal error hanlder
app.use(errorHandler);

export default app;
