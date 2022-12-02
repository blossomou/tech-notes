import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';

import { corsOptions } from './config/cors-options';
import { errorHandler } from './middleware/error-handler';
import { logger } from './middleware/logger';
import routes from './routes/root';

const app = express();
const port = process.env.port || 3500;

app.use(logger);
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', routes);

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

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on('error', console.error);
