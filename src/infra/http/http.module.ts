import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SendNotification } from '@application/use-cases/send-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notification';
import { NotificationsController } from './controllers/notifications.controller';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
