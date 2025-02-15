import { PostState } from "../types";

export const selectPosts = (state: PostState) => state.post;
export const selectPostsStatus = (state: PostState) => state.status;
export const selectAllPosts = (state: PostState) => state.allPosts;
export const selectAllPostsStatus = (state: PostState) => state.allPostsStatus;
export const selectLikeRequestStatus = (state: PostState) => state.likeRequestStatus;