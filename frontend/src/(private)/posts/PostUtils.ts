import { IPost } from "../../constants/types";
import { useDispatch } from "react-redux";
import { POST_REQUEST, LIKE_REQUEST, BOOKMARK_REQUEST } from "../../reduxsaga/types";

const usePostActions = () => {
  const dispatch = useDispatch();

  const getPost = (data: IPost): void => {
    dispatch({
      type: POST_REQUEST,
      post: {
        user_id: data.user_id,
        post_url: data.post_url,
        location: data.location,
        caption: data.caption,
      },
    });
  };

  const getLike = ({
    post_id,
    user_id,
  }: {
    post_id: string | number;
    user_id: string | number;
  }): void => {
    dispatch({
      type: LIKE_REQUEST,
      post_id,
      user_id,
    });
  };

  const getBookmark = ({
    post_id,
    user_id,
  }: {
    post_id: string | number;
    user_id: string | number;
  }): void => {
    console.log("bookmark request");
    dispatch({
      type: BOOKMARK_REQUEST,
      post_id,
      user_id,
    });
  };

  return { getPost, getLike, getBookmark };
};

export { usePostActions };
