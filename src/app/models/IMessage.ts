enum MessageType {
  Text, Image
}

//TODO: remove optional later
export interface IMessage {
  uid?: string;
  text: string;
  date?: Date;
  type?: MessageType;
  senderId?: string;
}
