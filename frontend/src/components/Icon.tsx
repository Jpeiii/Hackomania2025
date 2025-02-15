import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import {
  AntDesign,
  FontAwesome,
  Feather,
  Ionicons,
  SimpleLineIcons,
  Octicons,
  MaterialIcons,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Text from "./Text";

interface IconProps {
  iconType:
    | "AntDesign"
    | "FontAwesome"
    | "Feather"
    | "Ionicons"
    | "SimpleLineIcons"
    | "Octicons"
    | "MaterialIcons"
    | "EvilIcons"
    | "MaterialCommunityIcons";
  iconName: any;
  onPress?: () => void;
  selectedIconName?: any;
  label?: string;
  isSelected?: boolean;
  color?: string;
  selectedColor?: string;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

const Icon = ({
  iconType,
  iconName,
  selectedIconName,
  label,
  isSelected,
  onPress,
  color = "",
  size = 32,
  selectedColor,
  style,
  disabled,
}: IconProps) => {
  const IconComponent =
  iconType === "AntDesign"
    ? AntDesign
    : iconType === "FontAwesome"
    ? FontAwesome
    : iconType === "Feather"
    ? Feather
    : iconType === "Ionicons"
    ? Ionicons
    : iconType === "SimpleLineIcons"
    ? SimpleLineIcons
    : iconType === "Octicons"
    ? Octicons
    : iconType === "EvilIcons"
    ? EvilIcons
    : iconType === "MaterialIcons"
    ? MaterialIcons
    : MaterialCommunityIcons; // Add fallback here


  return (
    <TouchableOpacity
      style={[{ alignItems: "center" }, style]}
      onPress={disabled ? undefined : onPress}
    >
      <IconComponent
        name={selectedIconName && isSelected ? selectedIconName : iconName}
        size={size}
        color={isSelected ? selectedColor : color}
      />
      {label ? (
        <Text color={isSelected ? selectedColor : color} semibold={isSelected}>
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default Icon;
