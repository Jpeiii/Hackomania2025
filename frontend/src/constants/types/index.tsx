export * from "./components";
export * from "./theme";
import { ITheme } from "./theme";

export interface ISignUp {
  username: string;
  email: string;
  password: string;
  agreed?: boolean;
}

export interface ISignIn {
  email: string;
  password: string;
}
export interface IUseData {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
}

export interface IUser {
  id: number | string;
  username?: string;
  avatar?: string;
  stats?: { posts?: number; followers?: number; following?: number };
  about?: string;
}

export interface IPost {
  id?: number | string;
  user_id: string ;
  user_name?: string;
  post_url: string;
  location: string;
  caption: string;
  createdAt?: Date;
  isLiked?: boolean;
  isBookmarked?: boolean;
  type?: string;
  widthRatio?: number;
  heightRatio?: number;
}
export interface IPosts {
  posts: IPost[];
}

export interface ITripInformation {
  departure: string;
  destination: string;
  season: string;
}
