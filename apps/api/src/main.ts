import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import mongoose from 'mongoose';
import * as path from 'path';

import { corsOptions } from './config/cors-options';
import { connectDB } from './database/db';
import { errorHandler } from './middleware/error-handler';
import { logEvents, logger } from './middleware/logger';
import routes from './routes/root';
import userRoutes from './routes/user-routes';

dotenv.config();
const app = express();
const port = process.env.port || 3500;

console.log(process.env.NODE_ENV);
connectDB();
app.use(logger);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/api/users', userRoutes);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'assets', 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
