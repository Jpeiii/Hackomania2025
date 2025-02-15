import React from "react";
import {
  StyleSheet,
  Modal as RNModal,
  ViewStyle,
  Platform,
} from "react-native";

import { useTheme } from "../hooks/";
import { IModalProps } from "../constants/types";

import Block from "./Block";
import Icon from "./Icon";

const Modal = ({
  id = "Modal",
  children,
  style,
  onRequestClose,
  ...props
}: IModalProps) => {
  const { assets, colors, sizes } = useTheme();
  const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <RNModal
      {...modalID}
      {...props}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <Block safe style={modalStyles}>
        <Icon
          onPress={() => onRequestClose?.()}
          iconType="Ionicons"
          iconName="close"
          size={sizes.l}
          color={colors.secondary as string}
          style={{
            margin: sizes.s,
            top: 0,
            right: 0,
            position: "absolute",
          }}
        />
        <Block  marginTop={sizes.xl} paddingHorizontal={sizes.padding}>
          {children}
        </Block>
      </Block>
    </RNModal>
  );
};

export default React.memo(Modal);
