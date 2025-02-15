import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Platform,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { IVideoProps } from "../constants/types"; // Assuming you have a similar interface for video props
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../hooks/useTheme";

const VideoComponent = ({
  id = "Video",
  style,
  children,
  shadow,
  rounded,
  radius,
  height,
  width,
  transform,
  padding,
  paddingVertical,
  paddingHorizontal,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  margin,
  marginVertical,
  marginHorizontal,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  source,
  ...props
}: IVideoProps) => {
  const { colors, sizes } = useTheme();
  const ref = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoStyles = StyleSheet.flatten([
    style,
    {
      ...(height && { height }),
      ...(width && { width }),
      ...(margin && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(rounded && { borderRadius: sizes.radius, overflow: "hidden" }),
      ...(radius !== undefined && { borderRadius: radius, overflow: "hidden" }),
      ...(transform && { transform }),
      ...(shadow && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
      }),
    },
  ]) as ViewStyle;

  const togglePlayback = () => {
    if (isPlaying) {
      ref.current?.pauseAsync();
    } else {
      ref.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  // Generate component testID or accessibilityLabel based on Platform.OS
  const videoID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <>
      <Video
        {...videoID}
        ref={ref}
        source={
          typeof source === "string" ? { uri: source } : source ?? { uri: "" }
        }
        isLooping
        style={videoStyles}
        resizeMode={ResizeMode.COVER} // Ensures the video fits within the parent
      />
      {/* Play/Pause Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: -25 }, { translateY: -25 }],
          zIndex: 1,
        }}
        onPress={togglePlayback}
      >
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={50}
          color="white"
        />
      </TouchableOpacity>
    </>
  );
};

export default VideoComponent;
