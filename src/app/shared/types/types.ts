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
export interface IOwnChat {
  chats: IChat[];
  unreadCount: number[];
}
export interface ILastMessagesInChat {
  chatId: number;
  message: IMessage;
}
export interface IUnreadCount {
  chatId: number;
  count: number;
}

export interface IChatInfo extends IBase {
  links: string[];
  messages: IMessage[];
  urlToFiles: string[];
  urlToPhotos: string[];
  urlToVideos: string[];
  urlToVoiceMessages: string[];
}
export interface IChat extends IBase {
  tagName: string;
  name: string;
  membersId: number[];
  adminsId: number[];
  chatInfo: IChatInfo;
  chatUsers: IChatUser[];
}
export interface IChatUser extends IBase {
  lastReadedMessageId: number;
  user: { id: number };
  chat: { id: number };
}
