import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/";
import { IBlockProps } from "../constants/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Block = (props: IBlockProps) => {
  const {
    id = "Block",
    isWeb,
    keyboard,
    children,
    style,
    shadow,
    card,
    center,
    outlined,
    overflow,
    row,
    safe,
    scroll,
    color,
    gradient,
    primary,
    secondary,
    radius,
    height,
    width,
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
    justify,
    align,
    flex = 1,
    wrap,
    position,
    right,
    left,
    top,
    bottom,
    end,
    start,
    borderColor,
    borderWidth,
    ...rest
  } = props;
  const { colors, sizes } = useTheme();

  const colorIndex = primary ? "primary" : secondary ? "secondary" : null;

  const blockColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : undefined;

  const blockStyles = StyleSheet.flatten([
    style,
    {
      ...(isWeb && {
        width: sizes.screenWidth > 1024 ? sizes.width * 0.5 : sizes.width,
        alignSelf: "center",
      }),
    },
    {
      ...(shadow && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
      ...(card && {
        backgroundColor: colors.card,
        borderRadius: sizes.cardRadius,
        padding: sizes.cardPadding,
        hadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
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
      ...(radius && { borderRadius: radius }),
      ...(height && { height }),
      ...(width && { width }),
      ...(overflow && { overflow }),
      ...(flex !== undefined && { flex }),
      ...(row && { flexDirection: "row" }),
      ...(align && { alignItems: align }),
      ...(center && { justifyContent: "center" }),
      ...(justify && { justifyContent: justify }),
      ...(wrap && { flexWrap: wrap }),
      ...(blockColor && { backgroundColor: blockColor }),
      ...(outlined && {
        borderWidth: borderWidth || 1,
        borderColor: borderColor || colors.primary,
        backgroundColor: "transparent",
      }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
  ]) as ViewStyle;
  const blockID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (safe) {
    return (
      <SafeAreaView {...blockID} {...rest} style={blockStyles}>
        {children}
      </SafeAreaView>
    );
  }

  if (scroll) {
    return (
      <ScrollView {...blockID} {...rest} style={blockStyles}>
        {children}
      </ScrollView>
    );
  }

  if (gradient) {
    return (
      <LinearGradient
        {...blockID}
        colors={gradient}
        style={blockStyles}
        end={end || [1, 0]}
        start={start || [0, 0]}
        {...rest}
      >
        {children}
      </LinearGradient>
    );
  }

  if (keyboard) {
    return (
      <KeyboardAwareScrollView {...blockID} {...rest} style={blockStyles}>
        {children}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <View {...blockID} {...rest} style={blockStyles}>
      {children}
    </View>
  );
};

export default React.memo(Block);
