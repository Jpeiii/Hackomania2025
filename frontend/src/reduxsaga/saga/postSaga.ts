import { call, put, takeLatest } from "redux-saga/effects";
import {
  POST_REQUEST,
  GET_ALL_POSTS,
  GET_ALL_POSTS_STATUS,
  LIKE_REQUEST,
  BOOKMARK_REQUEST
} from "../actions/postAction";
import uploadToStorage from "../../firebase/storageAPI";
import { addData, getAllPostsData } from "../../firebase/databaseAPI";
import { IPost, IUser } from "../../constants/types";

function* getAllPostsAsync({
  type,
  user,
}: {
  type: string;
  user: IUser;
}): Generator<any, void, any> {
  console.log("GET_ALL_POSTS IN POST SAGA");
  const user_id = user.id;
  try {
    const posts = yield call(getAllPostsData, undefined, undefined, user_id);
    if (posts) {
      yield put({
        type: GET_ALL_POSTS_STATUS,
        status: "get all posts success",
        posts: posts,
      });
    }
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: GET_ALL_POSTS_STATUS,
      status: "get all posts fail",
      posts: null,
    });
  }
}

function* postRequestAsync(action: {
  type: string;
  post: IPost;
}): Generator<any, void, any> {
  try {
    console.log("GET_POST IN POST SAGA");
    const data = action.post;
    const caption = data.caption;
    const post_url = data.post_url;
    const location = data.location;
    const user = data.user_id;
    const response = yield call(fetch, post_url);
    const contentName = post_url.split("/").pop();
    const contentPost = yield call(() => response.blob());
    const extension = contentName?.split(".").pop() ?? "";
    const type = ["mp4", "avi", "mov"].includes(extension) ? "video" : "image";
    const url = yield call(uploadToStorage, {
      contentPost,
      contentName,
    });
    if (url) {
      const data = {
        user_id: user,
        post_url: url,
        location: location,
        caption: caption,
        date: new Date().toISOString(),
        type: type,
      };
      yield call(addData, "posts", data);
      yield put({ type: "POST_REQUEST_STATUS", status: "post submit success" });
    }
  } catch (e) {
    console.log(e, "error");
    yield put({ type: "POST_REQUEST_STATUS", status: "post submit fail" });
  }
}

function* likeRequestAsync(action: {
  type: string;
  post_id: string | number;
  user_id: string | number;
}): Generator<any, void, any> {
  try {
    console.log("LIKE_REQUEST IN POST SAGA");
    const post_id = action.post_id;
    const user_id = action.user_id;
    yield call(addData, "likes", {
      post_id: post_id,
      user_id: user_id,
      date: new Date().toISOString(),
    });
    yield put({ type: "LIKE_REQUEST_STATUS", status: "like success", post_id });
  } catch (e) {
    console.log(e, "error");
    yield put({ type: "LIKE_REQUEST_STATUS", status: "like fail" });
  }
}

function* bookmarkRequestAsync(action: {
  type: string;
  post_id: string | number;
  user_id: string | number;
}): Generator<any, void, any> {
  try {
    console.log("BOOKMARK_REQUEST IN POST SAGA");
    const post_id = action.post_id;
    const user_id = action.user_id;
    yield call(addData, "bookmarks", {
      post_id: post_id,
      user_id: user_id,
      date: new Date().toISOString(),
    });
    // yield put({ type: "BOOKMARK_REQUEST_STATUS", status: "bookmark success" });
  } catch (e) {
    console.log(e, "error");
    // yield put({ type: "BOOKMARK_REQUEST_STATUS", status: "bookmark fail" });
  }
}

function* postSaga() {
  yield takeLatest(POST_REQUEST, postRequestAsync);
  yield takeLatest(GET_ALL_POSTS, getAllPostsAsync);
  yield takeLatest(LIKE_REQUEST, likeRequestAsync);
  yield takeLatest(BOOKMARK_REQUEST, bookmarkRequestAsync);

}

export default postSaga;
