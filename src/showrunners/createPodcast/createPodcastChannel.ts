import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import config from '../../config';
import { EPNSChannel } from '../../helpers/epnschannel';

@Service()
export default class createPodcastChannel extends EPNSChannel {
  constructor(@Inject('logger') public logger: Logger) {
    super(logger, {
      networkToMonitor: config.web3MainnetNetwork,
      dirname: __dirname,
      name: 'Create Podcast',
      url: 'https://epns.io/',
      useOffChain: true,
    });
  }
  // Checks for profile Expiration and Sends notification to users
  // Whose Profile is about to be expired
  async createPodcast(e) {
    try {
      this.logInfo('Sending notification to evidence provider');

      // Notification Type: 1 for Broadcast, 3 for Subset, 4 for targeted
      // Read More: https://docs.epns.io/developers/developer-guides/sending-notifications/notification-payload-types/notification-standard-basics
      const notificationType = 1;

      //  Omit for broadcast, single address for targeted and channel address or array of addresses for subset
      const recipients = this.channelAddress;

      await this.sendNotification({
        recipient: recipients,
        title: e.title,
        message: e.msg,
        payloadTitle: e.title,
        payloadMsg: e.msg,
        notificationType: notificationType,
        cta: e.cta,
        image: null,
        simulate: null,
      });

      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }

  /**
   * The method responsible for handling webhook payload
   * @param payload
   */
  public async webhookPayloadHandler(payload: any, simulate: any) {
    const { Message } = payload;

    // do something with the payload
  }
}
