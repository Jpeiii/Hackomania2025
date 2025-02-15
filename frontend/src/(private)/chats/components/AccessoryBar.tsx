import React from "react";
import { Block, Icon } from "../../../components";
import { useTheme } from "../../../hooks";
import {
  getLocationAsync,
  pickImageAsync,
  takePictureAsync,
  getFeedbackAsync,
} from "./mediaUtils";

export default function AccessoryBar(props: any) {
  const { colors, sizes } = useTheme();
  const baseIconColor = colors.primary as string;
  const { onSend, isTyping } = props;
  return (
    <Block
      width={"100%"}
      row
      justify="space-around"
      align="center"
      style={{ backgroundColor: colors.background,borderTopColor: colors.primary, borderTopWidth: 1 }}
    >
      <Icon
        iconType="MaterialIcons"
        iconName="photo-library"
        onPress={() => pickImageAsync(onSend)}
        size={sizes.m}
        color={baseIconColor}
      />
      <Icon
        iconType="MaterialIcons"
        iconName="photo-camera"
        onPress={() => pickImageAsync(onSend)}
        size={sizes.m}
        color={baseIconColor}
      />

      <Icon
        iconType="MaterialIcons"
        iconName="location-on"
        onPress={() => getLocationAsync(onSend)}
        size={sizes.m}
        color={baseIconColor}
      />
      <Icon
        iconType="MaterialIcons"
        iconName="feedback"
        onPress={() => getFeedbackAsync()}
        size={sizes.m}
        color={baseIconColor}
      />
    </Block>
  );
}
