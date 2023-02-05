import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import createPodcastChannel from './createPodcastChannel';
import axios from 'axios';
import { Logger } from 'winston';
import { enableAWSWebhook } from '../../helpers/webhookHelper';

const route = Router();

export default (app: Router) => {
  const channel = Container.get(createPodcastChannel);
  app.use('/showrunners/createPodcast', route);

  // enable webhooks
  enableAWSWebhook(route, channel.webhookPayloadHandler.bind(channel)); // add the extra bind method to enable the use of 'this' inside the callback
  // enable webhooks
};
