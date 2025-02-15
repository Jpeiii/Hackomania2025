import { IPost, IPosts, IUser } from "../../constants/types";

export const POST_REQUEST = "POST_REQUEST";
export const POST_REQUEST_STATUS = "POST_REQUEST_POST_REQUEST_ STATUSSTATUS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_ALL_POSTS_STATUS = "GET_ALL_POSTS_STATUS";
export const LIKE_REQUEST = "LIKE_REQUEST";
export const BOOKMARK_REQUEST = "BOOKMARK_REQUEST";
export const getPost = (post: IPost) => ({
  type: "POST_REQUEST",
  post,
});

export const postRequestStatus = (status: string) => ({
  type: "POST_REQUEST_STATUS",
  status,
});

export const getAllPosts = (user:IUser) => ({
  type: "GET_ALL_POSTS",
  user,
})

export const getAllPostsStatus = (status: string, posts:IPosts) => ({
  type: "GET_ALL_POSTS_STATUS",
  status,
  posts,
})

export const getLikeRequest = (post_id:string|number, user_id:string|number) => ({
  type: "LIKE_REQUEST",
  post_id,
  user_id,
})

export const getBookmarkRequest = (post_id:string|number, user_id:string|number) => ({
  type: "BOOKMARK_REQUEST",
  post_id,
  user_id,
})

