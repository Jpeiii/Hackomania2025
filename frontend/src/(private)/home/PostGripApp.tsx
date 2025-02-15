import React, { useState, useCallback, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import MasonryList from "reanimated-masonry-list";
import { Text, Block, Image, Icon, Video } from "../../components";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/native";
import { IUser, IPosts, IPost } from "../../constants/types";
import { usePostActions } from "../posts/PostUtils";
import { truncate } from "../../utils";

export default function PostGridApp({
  user,
  posts,
}: {
  user: IUser;
  posts: IPosts | null;
}) {
  const { sizes, colors } = useTheme();
  const navigation = useNavigation();
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

  const renderItem = useCallback(
    ({ item }: { item: IPost }) => (
      <Block marginTop={12} flex={1} marginHorizontal={sizes.s}>
        <Block
          radius={sizes.xl}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: sizes.s,
            margin: sizes.s,
          }}
        >
          <Icon
            iconType="Ionicons"
            iconName="heart-outline"
            selectedIconName="heart"
            isSelected={localLikeStatus[item.id] ?? item.isLiked}
            color={baseIconColorSecondary}
            selectedColor={baseIconColorSecondary}
            onPress={() =>
              handleLike(
                item.id,
                item.user_id,
                localLikeStatus[item.id] ?? item.isLiked
              )
            }
            size={sizes.m}
          />
        </Block>
        {item.type === "video" ? (
          <Block height={sizes.height * 0.1 + 200} primary>
            <Video source={item.post_url} height={"100%"} />
          </Block>
        ) : (
          //
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("PostDetailApp", { item, user })}
          >
            <Image
              source={{ uri: item.post_url }}
              style={{
                width: "100%",
                height: sizes.height * 0.1 + 70,
                justifyContent: "center",
                alignItems: "center",
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <Block flex={0} height={sizes.height * 0.1}>
          <Block
            row
            flex={1}
            width={"100%"}
            align="flex-start"
            justify="space-between"
            padding={sizes.s}
          >
            <Block flex={1} width={"90%"}>
              <Text paddingRight={sizes.s} bold textPrimary>
                {String(item.user_name)}
              </Text>
              <Text size={13}>{truncate(item.caption, 30)}</Text>
            </Block>
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
              style={{ marginHorizontal: sizes.s }}
              color={baseIconColorPrimary}
              selectedColor={baseIconColorPrimary}
              size={sizes.m}
            />
          </Block>
        </Block>
      </Block>
    ),
    [
      localLikeStatus,
      localBookmarkStatus,
      navigation,
      sizes,
      baseIconColorSecondary,
      baseIconColorPrimary,
    ]
  );

  return (
    <Block
      marginVertical={sizes.xl}
      marginHorizontal={sizes.s}
      safe
      width={sizes.width}
      scroll
    >
      <MasonryList
        keyExtractor={(item: IPost) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: sizes.s,
          paddingBottom: sizes.l,
          alignSelf: "stretch",
        }}
        numColumns={2}
        data={posts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
}
