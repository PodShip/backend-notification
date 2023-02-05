import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import middlewares from '../../api/middlewares';
import TestChannel from './helloWorldChannel';

const route = Router();

export default (app: Router) => {
  app.use('/showrunners/helloWorld', route);

  route.post('/testnotif', middlewares.onlyLocalhost, async (req: Request, res: Response, next: NextFunction) => {
    console.log('hello', req.body);
    const Logger: any = Container.get('logger');

    try {
      const helloWorld = Container.get(TestChannel);
      helloWorld.helloWorld(req.body);
      return res.status(201).json({ success: true });
    } catch (e) {
      Logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
