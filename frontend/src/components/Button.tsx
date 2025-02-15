import React, { useCallback } from "react";
import {
  ViewStyle,
  Vibration,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import useTheme from "../hooks/useTheme";
import { IButtonProps } from "../constants/types";
import Icon from "./Icon";

const Button = ({
  id = "Button",
  children,
  style,
  color,
  gradient,
  primary,
  secondary,
  flex,
  radius,
  round,
  rounded,
  disabled,
  margin,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  padding,
  paddingBottom,
  paddingTop,
  paddingHorizontal,
  paddingVertical,
  paddingRight,
  paddingLeft,
  align,
  justify,
  height,
  width,
  row,
  outlined,
  social,
  socialIcon,
  socialLibrary,
  activeOpacity = 0.7,
  shadow = true,
  position,
  right,
  left,
  top,
  bottom,
  vibrate,
  vibrateRepeat,
  borderColor,
  borderWidth,
  onPress,
  ...props
}: IButtonProps) => {
  const { colors, sizes } = useTheme();
  const colorIndex = primary ? "primary" : secondary ? "secondary" : null;

  const buttonColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : "transparent";

  const buttonStyles = StyleSheet.flatten([
    style,
    {
      minHeight: sizes.xl,
      minWidth: sizes.xl,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: buttonColor,
      borderRadius: rounded ? sizes.s : sizes.buttonRadius,
      ...(shadow &&
        buttonColor !== "transparent" && {
          shadowColor: colors.shadow,
          shadowOffset: {
            width: sizes.shadowOffsetWidth,
            height: sizes.shadowOffsetHeight,
          },
          shadowOpacity: sizes.shadowOpacity,
          shadowRadius: sizes.shadowRadius,
          elevation: sizes.elevation,
        }),
      ...(row && { flexDirection: "row" }),
      ...(radius && { borderRadius: radius }),
      ...(flex !== undefined && { flex }),
      ...(margin !== undefined && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding !== undefined && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(align && { alignItems: align }),
      ...(justify && { justifyContent: justify }),
      ...(height && { height }),
      ...(width && { width }),
      ...(typeof outlined === "boolean" && {
        borderWidth: borderWidth || sizes.buttonBorder,
        borderColor: borderColor,
      }),
      ...(social && {
        backgroundColor: color || "transparent",
        width: sizes.socialSize,
        height: sizes.socialSize,
        borderRadius: sizes.socialRadius,
      }),
      ...(disabled && { opacity: 0.5 }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
  ]) as ViewStyle;

  /* handle onPress event */
  const handlePress = useCallback(
    (event: any) => {
      onPress?.(event);

      /* vibrate onPress */
      Vibration.vibrate(vibrate, vibrateRepeat);
    },
    [vibrate, vibrateRepeat, onPress]
  );

  if (round) {
    const maxSize = Math.max(
      Number(buttonStyles.width || 0),
      Number(buttonStyles.minWidth || 0),
      Number(buttonStyles.maxWidth || 0),
      Number(buttonStyles.height || 0),
      Number(buttonStyles.minHeight || 0),
      Number(buttonStyles.maxHeight || 0)
    );
    buttonStyles.maxWidth = maxSize;
    buttonStyles.maxHeight = maxSize;
    buttonStyles.borderRadius = maxSize / 2;
  }

  const gradientStyles = StyleSheet.flatten([
    buttonStyles,
    {
      flex: 1,
      width: "100%",
      ...(round && { maxWidth: buttonStyles.maxWidth }),
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const buttonID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (gradient) {
    return (
      <TouchableOpacity
        {...buttonID}
        activeOpacity={activeOpacity}
        onPress={handlePress}
        {...props}
        style={buttonStyles}
      >
        <LinearGradient
          style={gradientStyles}
          colors={gradient}
          start={[0, 1]}
          end={[1, 0]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (social) {
    return <Icon iconType={socialLibrary} iconName={socialIcon} />;
  }

  return (
    <TouchableOpacity
      {...buttonID}
      activeOpacity={activeOpacity}
      onPress={handlePress}
      {...props}
      style={buttonStyles}
    >
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(Button);
