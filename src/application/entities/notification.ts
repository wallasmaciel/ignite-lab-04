import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set recipientId(value: string) {
    this.props.recipientId = value;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(value: Content) {
    this.props.content = value;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get category(): string {
    return this.props.category;
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public unread(): void {
    this.props.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public cancel(): void {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public set createAt(value: Date) {
    this.props.createAt = value;
  }

  public get createAt(): Date {
    return this.props.createAt;
  }
}
