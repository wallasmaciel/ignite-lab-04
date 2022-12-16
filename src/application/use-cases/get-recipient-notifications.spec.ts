import { NotificationNotFound } from './errors/notification-not-found';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notification';

describe('Get recipients notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
