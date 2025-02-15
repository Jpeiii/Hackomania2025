import React, { useState } from "react";
import { Block, Text, Button, Image } from "../../components";
import NavBar from "../Navbar";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/core";
import { selectUser } from "../../reduxsaga/selectors/authSelector";
import { useSelector } from "react-redux";
import type { FC } from "react";

const IsWebProfile: FC = () => {
  const { colors, sizes } = useTheme();
  const [post, setPost] = useState<string | null>(null);
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const pickFromAlbum = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,video/*";
      input.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e: any) => {
            const photoUri = e.target.result.toString();
            setPost(photoUri);
            const payload = {
              image: photoUri,
            };

            try {
              const response = await fetch("http://127.0.0.1:8081/face", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
              const data = await response.json();
              if (data.status === "success") {
                setPost(data.data);
              } else {
                console.error("Error: Unexpected response status");
              }
            } catch (error) {
              console.log(error);
              // alert("Error: " + (error as Error).message);
            }
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
    <Block
      style={{
        backgroundColor: colors.background,
        justifyContent: "center",
        alignSelf: "center",
      }}
      flex={1}
      center
      isWeb
    >
      {post ? (
        <Block flex={1} align="center">
          <Image
            source={{ uri: post }}
            style={{
              width: "120%",
              height: "60%",
              borderRadius: sizes.sm,
              marginVertical: sizes.sm,
            }}
            resizeMode="contain"
          />
        </Block>
      ) : (
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
      <NavBar currentScreen="Profile" />
    </Block>
  );
};

export default IsWebProfile;
