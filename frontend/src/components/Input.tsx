import React, { useCallback, useState } from "react";
import {
  Image,
  TextInput,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Platform,
} from "react-native";

import Block from "./Block";
import Text from "./Text";

import useTheme from "../hooks/useTheme";
import { IInputProps } from "../constants/types";

const Input = ({
  id = "Input",
  style,
  color,
  primary,
  secondary,
  search,
  disabled,
  label,
  labelColor,
  icon,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  onFocus,
  onBlur,
  focusColor,
  ...props
}: IInputProps) => {
  const { colors, sizes } = useTheme();
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event, focus) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [setFocused, onFocus, onBlur]
  );

  const colorIndex = primary ? "primary" : secondary ? "secondary" : null;
  const inputColor = color ? color : colorIndex ? colors?.[colorIndex] : null;

  const inputBoxStyles = StyleSheet.flatten([
    style,
    {
      minHeight: sizes.inputHeight,
      ...(marginBottom && { marginBottom: marginBottom }),
      ...(marginTop && { marginTop: marginTop }),
      ...(marginHorizontal && { marginHorizontal: marginHorizontal }),
      ...(marginVertical && { marginVertical: marginVertical }),
      ...(marginRight && { marginRight: marginRight }),
      ...(marginLeft && { marginLeft: marginLeft }),
    },
  ]) as ViewStyle;

  const inputContainerStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      borderRadius: sizes.inputRadius,
      borderWidth: isFocused ? 2 : sizes.inputBorder,
      borderColor: isFocused ? focusColor : inputColor,
    },
  ]) as ViewStyle;

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: "100%",
      fontSize: sizes.p,
      color: inputColor,
      paddingHorizontal: sizes.inputPadding,
    },
  ]) as TextStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const inputID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <Block flex={0} style={inputBoxStyles}>
      {label && (
        <Text
          color={labelColor || colors.textPrimary}
          bold
          marginBottom={sizes.s}
        >
          {label}
        </Text>
      )}
      <Block row align="center" justify="flex-end" style={inputContainerStyles}>
        {search && (
          <Image
            style={{ marginLeft: sizes.inputPadding, tintColor: colors.icon }}
          />
        )}
        {icon && (
          <Image
            style={{ marginLeft: sizes.inputPadding, tintColor: colors.icon }}
          />
        )}
        <TextInput
          {...inputID}
          {...props}
          style={inputStyles}
          editable={!disabled}
          placeholderTextColor={inputColor}
          onFocus={(event) => handleFocus(event, true)}
          onBlur={(event) => handleFocus(event, false)}
        />
      </Block>
    </Block>
  );
};

export default React.memo(Input);
