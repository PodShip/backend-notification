import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import middlewares from '../../api/middlewares';
import TestChannel from './createPodcastChannel';

const route = Router();

export default (app: Router) => {
  app.use('/showrunners/createPodcast', route);

  route.post('/notify', middlewares.onlyLocalhost, async (req: Request, res: Response, next: NextFunction) => {
    console.log('hello', req.body);
    const Logger: any = Container.get('logger');

    try {
      const createPodcast = Container.get(TestChannel);
      createPodcast.createPodcast(req.body);
      return res.status(201).json({ success: true });
    } catch (e) {
      Logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
