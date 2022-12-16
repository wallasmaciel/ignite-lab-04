import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repositories';

export class InNotificationsRepository extends NotificationsRepository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    return notification ? notification : null;
  }

  async findManyByRecipientId(notificationId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === notificationId,
    );
  }

  async countManyByRecipientId(notificationId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === notificationId,
    ).length;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
