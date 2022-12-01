import * as express from 'express';
import * as path from 'path';

import routes from './routes/root';

const port = process.env.port || 3333;

const app = express();

app.use(express.json());
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

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on('error', console.error);
