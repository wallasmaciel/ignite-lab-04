import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { Notification } from './../entities/notification';
import { Content } from './../entities/content';
import { NotificationsRepository } from '../repositories/notifications-repositories';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.unread();
    await this.notificationRepository.save(notification);
  }
}
