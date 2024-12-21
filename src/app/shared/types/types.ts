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
