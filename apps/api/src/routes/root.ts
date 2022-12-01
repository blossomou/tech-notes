import * as express from 'express';
import * as path from 'path';

const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'views', 'index.html'));
});

export default router;
