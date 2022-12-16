import { NotificationNotFound } from './errors/notification-not-found';
import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipients notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
