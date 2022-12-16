import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract findManyByRecipientId(
    notificationId: string,
  ): Promise<Notification[]>;
  abstract countManyByRecipientId(notificationId: string): Promise<number>;
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
}
