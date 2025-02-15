import { IUser ,IPost, IPosts } from "../constants/types";
export interface AuthState {
  isLoading: boolean;
  token: string | null;
  status: string | null;
  user: IUser;
}

export interface PostState{
    post: IPost;
    status: string | null;
    allPosts: IPosts | null; 
    allPostsStatus: string | null;
    likeRequestStatus: string | null;
}

// Action types
export const SIGN_UP = "SIGN_UP";
export const AUTH_STATUS = "AUTH_STATUS";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAIL = "SIGN_UP_FAIL";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS"
export const SIGN_IN_FAIL = "SIGN_IN_FAIL"
export const POST_REQUEST = "POST_REQUEST"
export const POST_REQUEST_STATUS = "POST_REQUEST_STATUS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_ALL_POSTS_STATUS = "GET_ALL_POSTS_STATUS";
export const LIKE_REQUEST = "LIKE_REQUEST";
export const LIKE_REQUEST_STATUS = "LIKE_REQUEST_STATUS";
export const BOOKMARK_REQUEST = "BOOKMARK_REQUEST";
interface SignUpAction {
  type: typeof SIGN_UP;
}

interface AuthStatusAction {
  type: typeof AUTH_STATUS;
  isLoading: boolean;
}

interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
  status: string | null;
  token: string | null;
}

interface SignUpFailAction {
  type: typeof SIGN_UP_FAIL;
  status: string | null;
  token: string | null;
}

interface RestoreTokenAction {
  type: typeof RESTORE_TOKEN;
  token: string | null;
  status: string | null;
  user: IUser;
}

interface SignInAction {
  type: typeof SIGN_IN;
}

interface SignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  status: string | null;
  token: string | null;
  user: IUser;
}

interface SignInFailAction {
  type: typeof SIGN_IN_FAIL;
  status: string | null;
  token: string | null;
}

interface PostRequestAction {
    type: typeof POST_REQUEST;
    post: IPost;
}

interface PostRequestStatusAction {
    type: typeof POST_REQUEST_STATUS;
    status: string | null;
}

interface GetAllPostsAction {
    type: typeof GET_ALL_POSTS;
}

interface GetAllPostsStatusAction {
    type: typeof GET_ALL_POSTS_STATUS;
    status: string | null;
    posts: IPosts | null;
}

interface LikeRequestAction {
    type: typeof LIKE_REQUEST;
    post_id: string | number;
    user_id: string | number;
}

interface LikeRequestStatusAction {
    type: typeof LIKE_REQUEST_STATUS;
    status: string | null;
    post_id: string | number;
}

interface BookmarkRequestAction {
    type: typeof BOOKMARK_REQUEST;
    post_id: string | number;
    user_id: string | number;
}

export type AuthActionTypes = SignUpAction | AuthStatusAction | SignUpSuccessAction | SignUpFailAction | RestoreTokenAction | SignInAction |SignInSuccessAction | SignInFailAction;
export type PostActionTypes = PostRequestAction | PostRequestStatusAction | GetAllPostsAction | GetAllPostsStatusAction | LikeRequestAction | LikeRequestStatusAction | BookmarkRequestAction;