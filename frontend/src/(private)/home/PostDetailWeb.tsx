import React, { useState, useCallback } from "react";
import { Block, Text, Icon, Image } from "../../components";
import { useTheme } from "../../hooks";
import { IPost, IUser } from "../../constants/types";
import { usePostActions } from "../posts/PostUtils";

const PostDetailWeb = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { item: IPost; user: IUser } };
}) => {
  const { item, user } = route.params;
  const { colors, sizes, gradients } = useTheme();
  const baseIconColorPrimary = colors.primary as string;
  const baseIconColorSecondary = colors.secondary as string;
  const { getLike, getBookmark } = usePostActions();

  const [localLikeStatus, setLocalLikeStatus] = useState<{
    [key: number]: boolean;
  }>({});
  const [localBookmarkStatus, setLocalBookmarkStatus] = useState<{
    [key: number]: boolean;
  }>({});

  const handleBookmark = useCallback(
    (postId: number, userId: number, isBookmarked: boolean) => {
      const isPostBookmarked = localBookmarkStatus[postId] ?? isBookmarked;
      setLocalBookmarkStatus((prevState) => ({
        ...prevState,
        [postId]: !isPostBookmarked,
      }));

      getBookmark({ post_id: postId, user_id: userId });
    },
    [localBookmarkStatus, getBookmark]
  );

  const handleLike = useCallback(
    (postId: number, userId: number, isLiked: boolean) => {
      const isPostLiked = localLikeStatus[postId] ?? isLiked;
      setLocalLikeStatus((prevState) => ({
        ...prevState,
        [postId]: !isPostLiked,
      }));

      getLike({ post_id: postId, user_id: userId });
    },
    [localLikeStatus, getLike]
  );

  return (
    <Block safe margin={sizes.m} padding={sizes.s} isWeb>
      <Block scroll keyboard>
        <Icon
          iconType="Ionicons"
          iconName="arrow-back"
          onPress={() => navigation.goBack()}
          color={colors.primary as string}
          style={{ alignSelf: "flex-start", margin: sizes.s }}
        />
        <Block center width={"80%"} style={{ alignSelf: "center" }}>
          <Image
            source={{ uri: `${item.post_url}` }}
            style={{
              height: sizes.height * 0.35,
              alignSelf: "stretch",
              borderRadius: 8,
              margin: sizes.s,
            }}
            resizeMode="contain"
          />
          <Block
            row
            flex={0}
            align="center"
            justify="space-between"
            marginVertical={sizes.s}
            paddingVertical={sizes.s}
          >
            <Block flex={0} row>
              <Icon
                iconType="Octicons"
                iconName="heart"
                selectedIconName="heart-fill"
                isSelected={localLikeStatus[item.id] ?? item.isLiked}
                onPress={() =>
                  handleLike(
                    item.id,
                    item.user_id,
                    localLikeStatus[item.id] ?? item.isLiked
                  )
                }
                color={baseIconColorSecondary}
                selectedColor={baseIconColorSecondary}
                size={sizes.m}
                style={{ marginRight: sizes.sm }}
              />
              <Icon
                iconType="Octicons"
                iconName="comment"
                selectedIconName="comment"
                // isSelected={isAddedComment}
                // onPress={handleAddComment}
                color={baseIconColorPrimary}
                selectedColor={baseIconColorSecondary}
                size={sizes.m}
              />
            </Block>
            <Block row flex={0}>
              <Icon
                iconType="Ionicons"
                iconName="bookmark-outline"
                selectedIconName="bookmark"
                isSelected={localBookmarkStatus[item.id] ?? item.isBookmarked}
                onPress={() =>
                  handleBookmark(
                    item.id,
                    item.user_id,
                    localBookmarkStatus[item.id] ?? item.isBookmarked
                  )
                }
                color={baseIconColorPrimary}
                selectedColor={baseIconColorPrimary}
                size={sizes.m}
              />
            </Block>
          </Block>
          <Block flex={0.5} align="flex-start" justify="space-between">
            <Block row>
              <Text textSecondary size={12}>
                12345 likes
              </Text>
            </Block>
            <Block row>
              <Text textPrimary bold>
                {String(item.user_name)}
              </Text>
            </Block>
            <Block row>
              <Text textPrimary>{item.caption}</Text>
            </Block>
            {/* <Block paddingVertical={sizes.s} width="100%">
          {!expandComments ? (
            <Text color={textColorSecondary} onPress={handleExpandComments}>
              View all comments ({postInfo.comments.length})
            </Text>
          ) : (
            <Text color={textColorSecondary} onPress={handleExpandComments}>
              Hide comments
            </Text>
          )}
          {expandComments &&
            postInfo.comments.map((comment: IComment, i) => (
              <Block key={i} row align="center" marginTop={sizes.xs}>
                <Icon
                  iconType="Ionicons"
                  iconName="person-circle-outline"
                  color={colors.black as string}
                  size={sizes.m}
                  style={{ marginRight: sizes.s }}
                />
                <Block>
                  <Text semibold>{comment.userId}</Text>
                  <Text>{comment.content}</Text>
                </Block>
              </Block>
            ))}
        </Block> */}
          </Block>
          <Block>
            <Block row justify="flex-start" align="center">
              <Icon
                iconType="Octicons"
                iconName="location"
                color={colors.secondary as string}
                size={sizes.m}
              />

              <Text textPrimary bold marginHorizontal={sizes.s}>
                {item.location}
              </Text>
            </Block>
            <Block row>
              <Text textPrimary paddingVertical={sizes.s}>
                Here should be the unbiased description generated by AI and
                provide user more generic information about the location.
              </Text>
            </Block>
            <Block row marginTop={sizes.l}>
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  iconType="AntDesign"
                  iconName="star"
                  color={colors.secondary as string}
                  size={sizes.m}
                  style={{ marginHorizontal: 1 }}
                />
              ))}
            </Block>
            <Block row marginTop={sizes.s}>
              <Text textSecondary>
                Nomad AI: I know you love this place. You should visit this
              </Text>
            </Block>
            <Block align="flex-end">
              <Text>See more</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default PostDetailWeb;
