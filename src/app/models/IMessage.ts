import {NbChatMessageFile} from "@nebular/theme";

export enum MessageType {
  Text = 'text', Image = 'file'
}

//TODO: remove optional later
export interface IMessage {
  uid?: string;
  text: string;
  files: NbChatMessageFile[];
  date?: any;
  type?: MessageType;
  senderId?: string;
  chatRoomId: string;
  user: { name: string, avatar: string }
}
