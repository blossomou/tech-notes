import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

const LOGS_PATH = path.join(__dirname, '..', 'logs');

const logEvents = async (message: string, logFileName: string) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()} \t${message}\n`;

  try {
    if (!fs.existsSync(LOGS_PATH)) {
      await fsPromises.mkdir(LOGS_PATH);
    }

    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
