import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Block,
  Icon,
  Text,
  Button,
  Image,
  Input,
  Modal,
  Video,
} from "../../components";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/core";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Platform } from "react-native";
import { debounce, truncate } from "../../utils";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { usePostActions } from "./PostUtils";
import { useSelector, useDispatch } from "react-redux";
import { selectToken,selectUser } from "../../reduxsaga/selectors/authSelector";
import { selectPostsStatus } from "../../reduxsaga/selectors/postSelector";
export default function isAppPost() {
  const { sizes, colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [post, setPost] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [showModal, setModal] = useState<boolean>(false);
  const GOOGLE_PLACES_API_KEY = "AIzaSyBtegZoJt6Fe5ECvy2f_xEidTijUzGTJEg";
  const token = useSelector(selectToken);
  const { getPost } = usePostActions();
  const postsStatus = useSelector(selectPostsStatus);

  useEffect(() => {
    if (postsStatus === "post submit success") {
      dispatch({ type: "GET_ALL_POSTS", user: user });
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
    }
  });

  const handleCaptionChange = useCallback(
    (value: string) => {
      setCaption(value);
    },
    [setCaption]
  );
  const debouncedHandleCaptionChange = useCallback(
    debounce(handleCaptionChange, 500),
    [handleCaptionChange]
  );

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const submitPost = () => {
    getPost({ user_id: token, post_url: post as string, location, caption });
  };

  const handleAddLocation = () => {
    setModal(true);
  };
  const checkPostType = (post: string | null): boolean => {
    if (post) {
      const extension = post.split(".").pop()?.toLowerCase();
      if (extension === "jpg" || extension === "jpeg" || extension === "png") {
        return true; // Image
      } else if (
        extension === "mp4" ||
        extension === "mov" ||
        extension === "avi"
      ) {
        return false; // Video
      }
    }
    return false; // Default to video if post is null or has an unsupported extension
  };

  const pickFromAlbum = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      setPost(result.assets[0].uri);
    }
  };

  const handleTakePicture = async () => {
    const image = await cameraRef.current?.takePictureAsync();
    if (!image) {
      return;
    }
    const photoUri = image.uri.toString();
    setPost(photoUri);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <Block />;
  }

  return (
    <Block
      style={{ flexDirection: "column" }}
      safe
      align="center"
      justify="center"
      center
      paddingTop={sizes.md}
    >
      <Block flex={0} width={sizes.width * 0.9}>
        <Icon
          iconType="Ionicons"
          iconName="arrow-back"
          onPress={() => navigation.goBack()}
          style={{ alignSelf: "flex-start" }}
        />
        <Block row flex={0} align="center" justify="center">
          <Text center bold textPrimary>
            New Post
          </Text>
        </Block>
      </Block>
      <Block align="center" center flex={1} width={sizes.width * 0.9}>
        <Modal
          visible={showModal}
          onRequestClose={() => setModal(false)}
          style={{
            backgroundColor: colors.background,
            borderRadius: sizes.sm,
            borderWidth: 2,
            borderColor: colors.borderPrimary,
            padding: sizes.s,
            marginVertical: sizes.xl,
            marginHorizontal: sizes.sm,
            flex: 1,
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Search..."
            onPress={(data, details = null) => {
              setLocation(data.description);
              setModal(false);
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
            }}
            styles={{
              textInput: {
                backgroundColor: "transparent",
                height: 50,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 15,
                flex: 1,
                borderWidth: 2,
                borderColor: colors.borderPrimary,
              },
            }}
          />
        </Modal>
        {!permission.granted && !post && (
          <Block flex={0}>
            <Text align="center" semibold textSecondary>
              Nomad need your permission to show the camera
            </Text>
            <Button
              outlined
              borderWidth={2}
              borderColor={colors.borderSecondary}
              padding={sizes.sm}
              margin={sizes.m}
              onPress={requestPermission}
            >
              <Text textSecondary>Request Permission</Text>
            </Button>
          </Block>
        )}
        {permission.granted && !post && (
          <Block align="center" justify="center" width={sizes.width * 0.9}>
            <Block
              padding={sizes.s}
              flex={0}
              height={sizes.height * 0.6}
              width={sizes.width * 0.9}
            >
              <CameraView
                style={{ flex: 1, zIndex: 1 }}
                facing={facing}
                ref={cameraRef}
              />
            </Block>
            <Block
              row
              center
              align="center"
              justify="center"
              style={{ width: "100%" }}
            >
              <Block row center align="center" justify="center">
                <Icon
                  onPress={() => handleTakePicture()}
                  iconType="AntDesign"
                  iconName="camerao"
                  size={sizes.l}
                  color={colors.textPrimary as string}
                  style={{
                    borderWidth: 2,
                    borderColor: colors.borderPrimary,
                    borderRadius: sizes.l,
                    margin: sizes.s,
                    padding: sizes.sm,
                    alignSelf: "center",
                  }}
                />
                <Icon
                  onPress={toggleCameraFacing}
                  iconType="Ionicons"
                  iconName="camera-reverse-outline"
                  size={sizes.md}
                  color={colors.textSecondary as string}
                  style={{
                    marginLeft: sizes.sm,
                  }}
                />
              </Block>
            </Block>
            <Block row>
              <Button
                width={"100%"}
                height={sizes.xxl}
                flex={1}
                outlined
                borderWidth={1}
                borderColor={colors.borderSecondary}
                onPress={() => pickFromAlbum()}
              >
                <Text bold textSecondary>
                  Choose from album
                </Text>
              </Button>
            </Block>
          </Block>
        )}
        {post && (
          <Block justify="flex-start" width={sizes.width * 0.9}>
            <KeyboardAwareScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              extraScrollHeight={Platform.OS === "ios" ? 80 : 0}
            >
              {checkPostType(post) ? (
                <Image
                  source={{ uri: post }}
                  style={{
                    width: sizes.width * 0.9,
                    height: sizes.height * 0.5,
                    borderRadius: sizes.sm,
                    marginVertical: sizes.sm,
                  }}
                />
              ) : (
                <Video
                  source={post}
                  style={{
                    width: sizes.width * 0.9,
                    height: sizes.height * 0.5,
                    borderRadius: sizes.sm,
                    marginVertical: sizes.sm,
                  }}
                />
              )}
              <Input
                marginBottom={sizes.s}
                color={colors.borderPrimary}
                focusColor={colors.borderSecondary}
                onChangeText={(value) => debouncedHandleCaptionChange(value)}
                placeholder="Write a caption..."
                multiline
                scrollEnabled
                secondary
                style={{
                  maxHeight: sizes.height * 0.2,
                  height: sizes.height * 0.15,
                }}
              />
              <Block row flex={0} justify="space-between">
                <Button
                  width="100%"
                  justify="space-between"
                  row
                  onPress={handleAddLocation}
                >
                  <Block row margin={sizes.s}>
                    <Icon
                      iconType="Octicons"
                      iconName="location"
                      size={sizes.m}
                      color={colors.primary as string}
                    />
                    <Text
                      paddingLeft={sizes.sm}
                      size={15}
                      bold
                      color={colors.textPrimaryLight}
                    >
                      {location === ""
                        ? "Add Location"
                        : truncate(location, 20)}
                    </Text>
                  </Block>
                  <Icon
                    iconType="MaterialIcons"
                    iconName="navigate-next"
                    size={sizes.md}
                    color={colors.primary as string}
                  />
                </Button>
              </Block>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                paddingVertical={sizes.s}
              >
                <Button
                  onPress={submitPost}
                  flex={1}
                  outlined
                  borderWidth={1}
                  borderColor={colors.textSecondaryLight}
                >
                  <Text color={colors.textSecondary} bold transform="uppercase">
                    Submit
                  </Text>
                </Button>
              </Block>
            </KeyboardAwareScrollView>
          </Block>
        )}
      </Block>
    </Block>
  );
}
