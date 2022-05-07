import {IMessage} from "./IMessage";

export interface IChatRoom {
  uid: string;
  userIds: string[];
  messages: Array<IMessage>;
}
