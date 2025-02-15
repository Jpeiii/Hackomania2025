import React, { useState, useCallback, useEffect } from "react";
import {
  Block,
  Button,
  Icon,
  Image,
  Input,
  Modal,
  Text,
} from "../../components";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/core";
import { debounce, truncate } from "../../utils";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { usePostActions } from "./PostUtils";
import { useSelector, useDispatch } from "react-redux";
import { selectToken,selectUser } from "../../reduxsaga/selectors/authSelector";
import { selectPostsStatus } from "../../reduxsaga/selectors/postSelector";
export default function isHomePost() {
  const { sizes, colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [post, setPost] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("Penang, Malaysia");
  const [showModal, setModal] = useState<boolean>(false);
  const GOOGLE_PLACES_API_KEY = "AIzaSyBtegZoJt6Fe5ECvy2f_xEidTijUzGTJEg";
  const token = useSelector(selectToken);
  const navigation = useNavigation();
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

  const submitPost = () => {
    console.log("submitting post");
    getPost({ user_id: token, post_url: post as string, location, caption });
  };
  const handleAddLocation = () => {
    setModal(true);
  };
  const pickFromAlbum = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,video/*";
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const photoUri = e.target.result.toString();
            setPost(photoUri);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } catch (error) {
      console.error("Error selecting file: ", error);
    }
  };
  return (
    <Block isWeb safe center padding={sizes.s} margin={sizes.s}>
      <Icon
        iconType="Ionicons"
        iconName="arrow-back"
        onPress={() => navigation.goBack()}
        style={{ marginHorizontal: sizes.s, alignSelf: "flex-start" }}
      />
      <Block flex={0.05} row align="center" justify="center">
        <Text center bold textPrimary>
          New Post
        </Text>
      </Block>
      <Block margin={sizes.s}>
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
            height: sizes.height * 0.5,
            alignSelf: "center",
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Search..."
            onPress={(data, details = null) => {
              setLocation(data.description);
              setModal(false);
            }}
            onFail={(error) => console.log("Error:", error)} // Add this line to catch any errors
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
            }}
            requestUrl={{
              useOnPlatform: "web", // or "all"
              url: "https://maps.googleapis.com/maps/api", // or any proxy server that hits https://maps.googleapis.com/maps/api
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
                width: "100%",
              },
            }}
          />
        </Modal>
        {!post && (
          <Block
            row
            justify="center"
            align="center"
            style={{ alignSelf: "center" }}
          >
            <Button
              padding={sizes.m}
              margin={sizes.m}
              height={sizes.xxl}
              outlined
              borderWidth={1}
              borderColor={colors.borderSecondary}
              onPress={() => pickFromAlbum()}
            >
              <Text bold textSecondary>
                Select from computer
              </Text>
            </Button>
          </Block>
        )}
        {post && (
          <Block flex={1} align="center">
            <Image
              source={{ uri: post }}
              style={{
                width: "120%",
                height: "60%",
                borderRadius: sizes.sm,
                marginVertical: sizes.sm,
              }}
              resizeMode="contain" // or "cover" based on your requirement
            />
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
                height: "20%",
                width: "90%",
              }}
            />
            <Block width={"90%"} row justify="space-between">
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
                    {location === "" ? "Add Location" : truncate(location, 20)}
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
              width={"90%"}
              row
              align="center"
              justify="center"
              paddingVertical={sizes.s}
            >
              <Button
                onPress={submitPost}
                width={"90%"}
                outlined
                borderWidth={1}
                borderColor={colors.textSecondaryLight}
              >
                <Text color={colors.textSecondary} bold transform="uppercase">
                  Submit
                </Text>
              </Button>
            </Block>
          </Block>
        )}
      </Block>
    </Block>
  );
}
