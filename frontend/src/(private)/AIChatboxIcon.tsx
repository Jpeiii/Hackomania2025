import React from "react";
import { Block, Icon } from "../components";
import { useTheme } from "../hooks";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function AIChatboxIcon() {
  const { sizes, colors } = useTheme();
  const selectedIconColor = colors.primary as string;
  const isWeb = Platform.OS === "web";
  const navigation = useNavigation();
  return (
    <Block
      style={{ position: "absolute", bottom: sizes.height * 0.12, right: 10 }}
    >
      <Icon
        onPress={() =>
          isWeb
            ? navigation.navigate("ChatBoxWeb")
            : navigation.navigate("ChatBoxApp")
        }
        iconType="Ionicons"
        iconName="chatbubbles-outline"
        size={sizes.xxl}
        color={selectedIconColor}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: sizes.xl,
          margin: sizes.s,
          padding: sizes.sm,
        }}
      />
    </Block>
  );
}
