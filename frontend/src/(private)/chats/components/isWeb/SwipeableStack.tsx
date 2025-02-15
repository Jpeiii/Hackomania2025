import React, { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Block, Text, Icon, Video } from "../../../../components";
import { useTheme } from "../../../../hooks";
import { View } from "react-native";

export default function Stack() {
  const { sizes, colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const iconBaseColor = colors.textPrimaryLight as string;
  const iconSelectedColor = colors.textPrimary as string;

  const dummyData = [
    {
      name: "Travel Agency 1",
      rating: 4.5,
      url: "https://www.travelagency1.com",
    },
    {
      name: "Travel Agency 2",
      rating: 4.2,
      url: "https://www.travelagency2.com",
    },
  ];

  const handleNextPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < dummyData.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : dummyData.length - 1
    );
  };

  const dataRender = ({ item, index }: { item: any; index: number }) => {
    return (
      <Block
        width={sizes.screenWidth * 0.2}
        align="center"
        justify="center"
        marginVertical={sizes.s}
        padding={sizes.s}
        key={index}
        radius={sizes.s}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Text textPrimary marginBottom={sizes.xs} marginLeft={sizes.s}>
          {item.name}
        </Text>
        <Video
          source={{
            uri: "https://pixabay.com/videos/beach-sea-sand-island-elafonisos-153167/",
          }}
          style={{
            width: sizes.width * 0.9,
            height: sizes.height * 0.5,
            borderRadius: sizes.sm,
            marginVertical: sizes.sm,
          }}
        />
        <View
          style={{
            height: "10%",
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderBottomRightRadius: sizes.s,
            borderBottomLeftRadius: sizes.s,
            padding: sizes.s,
          }}
        >
          <Text>Book for virtual consultation</Text>
        </View>
      </Block>
    );
  };

  return (
    <Block
      justify="center"
      align="center"
      paddingVertical={sizes.s}
      style={{ flexDirection: "row" }}
    >
      <Icon
        onPress={handlePrevPress}
        iconType="Ionicons"
        iconName="chevron-back"
        color={iconBaseColor}
        style={{ marginRight: sizes.s }}
      />
      {dummyData.map((item, index) => (
        <Animated.View key={index} entering={FadeIn} exiting={FadeOut}>
          {currentIndex === index && dataRender({ item, index })}
        </Animated.View>
      ))}
      <Icon
        onPress={handleNextPress}
        iconType="Ionicons"
        iconName="chevron-forward"
        color={iconBaseColor}
        style={{ marginLeft: sizes.s }}
      />
    </Block>
  );
}
