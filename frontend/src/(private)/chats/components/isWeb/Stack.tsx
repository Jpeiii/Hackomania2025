import React, { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Block, Text, Icon, Button } from "../../../../components";
import { useTheme } from "../../../../hooks";
import { FlatList, TouchableOpacity } from "react-native";
import { dummyData } from "../mockdata/question";
export interface QnA {
  question: string;
  options: string[];
}
export default function Stack({
  data,
  onTripPreferenceDataChange,
}: {
  data: QnA[];
  onTripPreferenceDataChange: (data: any) => void;
}) {
  const { sizes, colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<{ [key: number]: number }>({}); // Keeps track of selected option per question
  let datas: QnA[] = data;
  console.log("Data: ", datas);
  // if (datas.length === 0) {
  //   console.log("No data provided, using dummy data instead");
  //   datas = dummyData;
  // }

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedId((prevSelectedId) => ({
      ...prevSelectedId,
      [questionIndex]: optionIndex, // Update the selected option for the current question
    }));
  };

  const handleSubmit = () => {
    const selectedOptions = datas.map((question, index) => ({
      question: question.question,
      options: question.options,
      selectedOption: question.options[selectedId[index]],
    }));

    onTripPreferenceDataChange(selectedOptions); // Call the provided callback function
  };

  const iconBaseColor = colors.textPrimaryLight as string;
  const iconSelectedColor = colors.textPrimary as string;

  const handleNextPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < datas.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : datas.length - 1
    );
  };

  const Item = ({
    item,
    onPress,
    backgroundColor,
    textColor,
  }: {
    item: string;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
        margin: sizes.s,
        borderRadius: sizes.m,
        padding: sizes.s,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text center marginHorizontal={sizes.s} color={textColor}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderOptionItem = ({
    item,
    index,
    questionIndex,
  }: {
    item: string;
    index: number;
    questionIndex: number;
  }) => {
    const isSelected = selectedId[questionIndex] === index;
    const backgroundColor = isSelected
      ? (colors.textPrimary as string)
      : "#8FD1E1";
    const color = isSelected ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => handleOptionSelect(questionIndex, index)} // Select the option
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const dataRender = ({ item, index }: { item: QnA; index: number }) => {
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
        <Text marginBottom={sizes.xs} marginLeft={sizes.s}>
          {index + 1}.&nbsp;{item.question}
        </Text>
        <Block paddingTop={sizes.sm}>
          <FlatList
            data={item.options}
            renderItem={({ item, index }) =>
              renderOptionItem({ item, index, questionIndex: currentIndex })
            }
            keyExtractor={(option, idx) => idx.toString()} // Use index as keyExtractor
            extraData={selectedId}
          />
        </Block>
      </Block>
    );
  };

  return (
    <Block justify="center" align="center" paddingVertical={sizes.s}>
      {datas.map((item, index) => (
        <Animated.View key={index} entering={FadeIn} exiting={FadeOut}>
          {currentIndex === index && dataRender({ item, index })}
        </Animated.View>
      ))}
      <Block
        paddingHorizontal={sizes.s}
        marginHorizontal={sizes.s}
        style={{ flexDirection: "row" }}
        align="center"
        justify="center"
      >
        <Block row marginRight={sizes.s}>
          <Icon
            onPress={handlePrevPress}
            iconType="Ionicons"
            iconName="chevron-back"
            color={iconBaseColor}
          />
        </Block>
        <Block
          row
          align="center"
          justify="center"
          style={{ alignSelf: "center" }}
        >
          {datas.map((_, index) => (
            <Icon
              style={{ marginLeft: sizes.s }}
              key={index}
              iconType="Octicons"
              iconName="dot"
              selectedIconName="dot-fill"
              isSelected={currentIndex === index}
              selectedColor={iconSelectedColor}
              color={iconBaseColor}
              size={sizes.m - 5}
            />
          ))}
        </Block>
        <Block row marginLeft={sizes.l}>
          <Icon
            onPress={handleNextPress}
            iconType="Ionicons"
            iconName="chevron-forward"
            color={iconBaseColor}
          />
        </Block>
      </Block>
      <Button
          padding={sizes.s}
          margin={sizes.s}
          height={sizes.inputHeight}
          outlined
          borderWidth={1}
          borderColor={colors.borderSecondary}
          onPress={() => handleSubmit()}
        >
          <Text bold textSecondary>
            Submit
          </Text>
        </Button>
    </Block>
  );
}
