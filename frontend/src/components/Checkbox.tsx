import React, { useCallback, useState } from "react";
import { Platform, Pressable } from "react-native";

import * as Haptics from "expo-haptics";

import { useTheme } from "../hooks/";
import Block from "../components/Block";
import Icon from "../components/Icon";
import { ICheckboxProps } from "../constants/types";

const Checkbox = ({
  onPress,
  haptic = true,
  id = "Checkbox",
  ...props
}: ICheckboxProps) => {
  const { colors, sizes } = useTheme();
  const [checked, setChecked] = useState(false);

  const handlePress = useCallback(() => {
    onPress?.(!checked);
    setChecked(!checked);

    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [checked, haptic, setChecked, onPress]);

  // generate component testID or accessibilityLabel based on Platform.OS
  const checkboxID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <Pressable {...checkboxID} hitSlop={sizes.s}>
      <Icon
        iconType="MaterialIcons"
        iconName="check-box-outline-blank"
        selectedIconName="check-box"
        selectedColor={colors.secondary as string}
        isSelected={checked}
        color={colors.borderSecondary as string}
        {...props}
        size={sizes.m}
        onPress={handlePress}
      />
    </Pressable>
  );
};

export default React.memo(Checkbox);
