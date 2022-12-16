import { PrismaNoticiationMapper } from './../mappers/prisma-notification.mapper';
import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repositories';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    return notification ? PrismaNoticiationMapper.toDomain(notification) : null;
  }

  async findManyByRecipientId(notificationId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId: notificationId,
      },
    });

    return notifications.map((notification) =>
      PrismaNoticiationMapper.toDomain(notification),
    );
  }

  async countManyByRecipientId(notificationId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId: notificationId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNoticiationMapper.toPrisma(notification),
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNoticiationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}
