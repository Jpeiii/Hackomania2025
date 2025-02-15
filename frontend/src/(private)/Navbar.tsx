import React, { useState } from "react";
import { Block, Icon } from "../components";
import { useTheme } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
type NavBarProps = {
  currentScreen: string;
};

export default function NavBar(props: NavBarProps) {
  const currentScreen = props.currentScreen;
  const { sizes, colors } = useTheme();
  const navigation = useNavigation();
  const baseIconColor = colors.primary as string;
  const selectedIconColor = colors.secondary as string;
  const [selectedScreen, setSelectedScreen] = useState<string>(currentScreen);
  const isWeb = Platform.OS === "web";
  const handlePress = (icon: string) => {
    setSelectedScreen(icon);
    console.log("Selected Screen: ", icon);
    if (icon === "Profile") {
      isWeb ? navigation.navigate("IsWebProfile") : navigation.navigate("Home");
    }
  };
  const iconsLeft = [
    {
      label: "Home",
      iconName: "home",
      iconType: "SimpleLineIcons",
    },
    {
      label: "Meal",
      iconName: "fast-food-outline",
      iconType: "Ionicons",
    },
  ];
  const iconsRight = [
    {
      label: "Cook",
      iconName: "chef-hat",
      iconType: "MaterialCommunityIcons",
    },
    {
      label: "Community",
      iconName: "people",
      iconType: "SimpleLineIcons",
    },
  ];
  return (
    <Block
      width={"100%"}
      position="absolute"
      bottom={0}
      row
      padding={sizes.s}
      style={{
        backgroundColor: colors.background,
      }}
    >
      {iconsLeft.map((icon, index) => (
        <Block justify="center" align="center" key={index}>
          <Icon
            key={index}
            iconType={icon.iconType as string | any}
            iconName={icon.iconName}
            label={icon.label}
            color={baseIconColor}
            selectedColor={selectedIconColor}
            size={sizes.m}
            isSelected={selectedScreen === icon.label}
            onPress={() => handlePress(icon.label)}
          />
        </Block>
      ))}
      <Icon
        iconType="Ionicons"
        iconName="receipt"
        size={sizes.xxl}
        color={selectedIconColor}
        style={{
          bottom: sizes.m,
          backgroundColor: colors.background,
          borderRadius: sizes.l,
          margin: sizes.s,
        }}
      />
      {iconsRight.map((icon, index) => (
        <Block justify="center" align="center" key={index}>
          <Icon
            key={index}
            iconType={icon.iconType as string | any}
            iconName={icon.iconName}
            label={icon.label}
            color={baseIconColor}
            selectedColor={selectedIconColor}
            size={sizes.m}
            isSelected={selectedScreen === icon.label}
            onPress={() => handlePress(icon.label)}
          />
        </Block>
      ))}
    </Block>
  );
}
