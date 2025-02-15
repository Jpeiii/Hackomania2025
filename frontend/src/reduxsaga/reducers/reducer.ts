import {
  SIGN_UP,
  AUTH_STATUS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  POST_REQUEST,
  POST_REQUEST_STATUS,
  GET_ALL_POSTS,
  GET_ALL_POSTS_STATUS,
  LIKE_REQUEST_STATUS
} from "../types";

const initialState: any = {
  isLoading: false,
  token: null,
  status: null,
  user: {
    id: "",
  },
  post: {
    caption: "",
    content: "",
    location: "",
    user_id: "",
  },
  allPosts: null,
  allPostsStatus: null,
  likeRequestStatus: null,
};

export default function authReducer(state = initialState, action: any): any {
  switch (action.type) {
    case SIGN_UP: {
      return {
        ...state,
      };
    }
    case AUTH_STATUS: {
      console.log("AUTH_STATUS IN AUTH REDUCER");
      return {
        ...state,
        isLoading: action?.isLoading,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        status: action?.status,
        isLoading: false,
      };
    }
    case SIGN_UP_FAIL: {
      return {
        ...state,
        status: action?.status,
        token: null,
        isLoading: false,
      };
    }
    case RESTORE_TOKEN: {
      console.log("RESTORE_TOKEN IN AUTH REDUCER");
      return {
        ...state,
        token: action?.token,
        status: "token restored",
      };
    }
    case SIGN_IN: {
      console.log("SIGN_IN IN AUTH REDUCER");
      return {
        ...state,
      };
    }
    case SIGN_IN_SUCCESS: {
      console.log("SIGN_IN_SUCCESS IN AUTH REDUCER");
      return {
        ...state,
        status: action?.status,
        token: action?.token,
        isLoading: false,
        user: action?.user,
      };
    }
    case SIGN_IN_FAIL: {
      console.log("SIGN_IN_FAIL IN AUTH REDUCER");
      return {
        ...state,
        status: action?.status,
        token: null,
        isLoading: false,
      };
    }
    case POST_REQUEST: {
      console.log("GET_POST IN POST REDUCER");
      return {
        ...state,
        post: action.post,
        status: "submitting post",
      };
    }
    case POST_REQUEST_STATUS: {
      console.log("POST_REQUEST_STATUS IN POST REDUCER");
      return {
        ...state,
        status: action.status,
      };
    }
    case GET_ALL_POSTS: {
      console.log("GET_ALL_POSTS IN POST REDUCER");
      return {
        ...state,
        allPostsStatus: "getting all posts",
      };
    }
    case GET_ALL_POSTS_STATUS: {
      console.log("GET_ALL_POSTS_STATUS IN POST REDUCER");
      return {
        ...state,
        allPostsStatus: action.status,
        allPosts: action.posts,
      };
    }
    case LIKE_REQUEST_STATUS: {
      console.log("LIKE_REQUEST_STATUS IN POST REDUCER");
      return {
        ...state,
        likeRequestStatus: { status: action.status, post_id: action.post_id },
      };
    }
    default:
      return state;
  }
}
