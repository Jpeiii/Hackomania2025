import React, { useState } from "react";
import * as Linking from "expo-linking";
import { TextInput } from "react-native";
import { useTheme } from "../../../../hooks";
import { Block, Text, Icon, Input } from "../../../../components";
import { Picker } from "@react-native-picker/picker";
import Stack from "./Stack";
import SwipeableStack from "./SwipeableStack";
import TripInformation from "./TripInformation";
interface Props {
  currentMessage: any;
}

const CustomView = ({ currentMessage }: Props) => {
  const { colors, sizes } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState();

  if (currentMessage.initial) {
    return (
      <Block flex={1} padding={sizes.s} margin={sizes.s}>
        <Block safe center keyboard marginVertical={sizes.s}>
          <Block
            flex={1}
            justify="center"
            borderColor={colors.borderSecondary}
            borderWidth={1}
            style={{ backgroundColor: "#ffff" }}
            padding={sizes.s}
            radius={sizes.s}
            marginVertical={sizes.s}
          >
            <Text semibold textSecondary>
              Depature
            </Text>
            <Block
              flex={0}
              row
              align="center"
              radius={sizes.sm}
              // style={{ borderWidth: 2, borderColor: colors.skyBlue500 }}
            >
              <Icon
                iconType="Ionicons"
                iconName="location-sharp"
                color={colors.secondary as string}
                style={{
                  borderRadius: sizes.s,
                  marginRight: sizes.m,
                  padding: sizes.s,
                }}
              />
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="Singapore" value="Singapore" />
                <Picker.Item label="XinJiang" value="xinjiang" />
                <Picker.Item label="Malaysia" value="Malaysia" />
              </Picker>
            </Block>
          </Block>
          <Block
            flex={1}
            justify="center"
            borderColor={colors.borderSecondary}
            borderWidth={1}
            style={{ backgroundColor: "#ffff" }}
            padding={sizes.s}
            radius={sizes.s}
            marginVertical={sizes.s}
          >
            <Text semibold textSecondary>
              Destination
            </Text>
            <Block
              flex={0}
              row
              align="center"
              radius={sizes.sm}
              // style={{ borderWidth: 2, borderColor: colors.skyBlue500 }}
            >
              <Icon
                iconType="MaterialIcons"
                iconName="flight-land"
                color={colors.secondary as string}
                style={{
                  borderRadius: sizes.s,
                  marginRight: sizes.m,
                  padding: sizes.s,
                }}
              />
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label="XinJiang" value="xinjiang" />
                <Picker.Item label="Malaysia" value="Malaysia" />
                <Picker.Item label="Singapore" value="Singapore" />
              </Picker>
            </Block>
          </Block>
          <Block
            flex={1}
            justify="center"
            borderColor={colors.borderSecondary}
            borderWidth={1}
            style={{ backgroundColor: "#ffff" }}
            padding={sizes.s}
            radius={sizes.s}
            marginVertical={sizes.s}
          >
            <Text semibold textSecondary>
              Start Date
            </Text>
            <Block
              flex={0}
              row
              align="center"
              radius={sizes.sm}
              // style={{ borderWidth: 2, borderColor: colors.skyBlue500 }}
            >
              <Icon
                iconType="MaterialIcons"
                iconName="timer"
                color={colors.secondary as string}
                style={{
                  borderRadius: sizes.s,
                  marginRight: sizes.m,
                  padding: sizes.s,
                }}
              />
            </Block>
          </Block>
          <Block
            flex={1}
            justify="center"
            borderColor={colors.borderSecondary}
            borderWidth={1}
            style={{ backgroundColor: "#ffff" }}
            padding={sizes.s}
            radius={sizes.s}
            marginVertical={sizes.s}
          >
            <Text semibold textSecondary>
              End Date
            </Text>
            <Block
              flex={0}
              row
              align="center"
              radius={sizes.sm}
              // style={{ borderWidth: 2, borderColor: colors.skyBlue500 }}
            >
              <Icon
                iconType="MaterialIcons"
                iconName="timer"
                color={colors.secondary as string}
                style={{
                  borderRadius: sizes.s,
                  marginRight: sizes.m,
                  padding: sizes.s,
                }}
              />
            </Block>
          </Block>
          <Block
            flex={1}
            justify="center"
            borderColor={colors.borderSecondary}
            borderWidth={1}
            style={{ backgroundColor: "#ffff" }}
            padding={sizes.s}
            radius={sizes.s}
            marginVertical={sizes.s}
          >
            <Text semibold textSecondary>
              No. of Travelers
            </Text>
            <Block
              flex={0}
              row
              align="center"
              radius={sizes.sm}
              // style={{ borderWidth: 2, borderColor: colors.skyBlue500 }}
            >
              <Icon
                iconType="MaterialIcons"
                iconName="people"
                color={colors.secondary as string}
                style={{
                  borderRadius: sizes.s,
                  marginRight: sizes.m,
                  padding: sizes.s,
                }}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }

  if (currentMessage.preferences) {
    return (
      <Block flex={1} padding={sizes.s} margin={sizes.s}>
        <Stack />
      </Block>
    );
  }

  if (currentMessage.shopnow) {
    return (
      <Block flex={1} padding={sizes.s} margin={sizes.s}>
        <SwipeableStack />
      </Block>
    );
  }
  return null;
};

export default CustomView;
