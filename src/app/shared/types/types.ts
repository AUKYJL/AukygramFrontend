export interface ILoginDTO {
  tagName?: string;
  phone?: string;
  email?: string;
  password: string;
}
export interface IRegisterDTO {
  name: string;

  tagName: string;

  phone: string;

  email: string;

  password: string;

  repeatedPassword: string;
}
export interface ISetLastReadedMessageDTO {
  chatId: number;
  userId: number;
  messageId: number;
}

export interface IBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IBase {
  name: string;
  tagName: string;
  //
}

export interface IMessage extends IBase {
  sendBy: IUser;
  readedBy: IUser[];
  // chatInfo: ChatInfo;

  text?: string;
  urlToPhotos?: string[];
  urlToFiles?: string[];
  urlToVideos?: string[];
}
export interface ISendMessage {
  message: string;
  chatId: number;
  senderId: number;
}
export interface IReadMessage {
  chatId: number;
  messageId: number;
  readerId: number;
}
export interface IChatInfo {
  chats: IChat[];
  unreadCount: number[];
}
export interface IChat extends IBase {
  tagName: string;
  name: string;
  membersId: number[];
  adminsId: number[];
}
export interface IChatUser extends IBase {
  lastReadedMessageId: number;
  user: { id: number };
  chat: { id: number };
}
