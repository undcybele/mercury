import {IMessage} from "./IMessage";

export interface IChatRoom {
  uid: string;
  name: string;
  userIds: string[];
  messages: Array<IMessage>;
}
