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
