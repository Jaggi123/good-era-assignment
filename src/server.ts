import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import _ from 'lodash';
import connectDB from './config/database';
import morganMiddleware from './config/morgan';
import Logger from './config/winston';

const app = express();
// Connect to MongoDB
connectDB();
app.use(cors());
app.set('port', process.env.PORT || 3005);
// Middlewares configuration
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded());
app.use(morganMiddleware);
// @route   GET /
// @desc    Liveliness base API
// @access  Public
app.get('/', async (_req, res) => {
  res.send('ok');
});

const port = app.get('port');

const server = app.listen(port, () =>
  Logger.debug(`Server started on port ${port}`)
);

export default server;
