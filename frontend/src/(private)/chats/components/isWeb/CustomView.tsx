import React, { useState, useEffect } from "react";
import * as Linking from "expo-linking";
import { TextInput } from "react-native";
import { useTheme } from "../../../../hooks";
import { Block, Text, Icon, Input } from "../../../../components";
import Stack from "./Stack";
import SwipeableStack from "./SwipeableStack";
import TripInformation from "./TripInformation";
import { ITripInformation } from "../../../../constants/types";
interface Props {
  currentMessage: any;
  onTripDataChange: (data: ITripInformation) => void;
  onTripPreferenceDataChange: (data: any) => void;
}

const CustomView = ({ currentMessage, onTripDataChange,onTripPreferenceDataChange }: Props) => {
  const { colors, sizes } = useTheme();
  const handleTripData = (data: ITripInformation) => {
    onTripDataChange(data);
  };

  const handleTripPreferenceData = (data: any) => {
    onTripPreferenceDataChange(data);
  }

  if (currentMessage.initial) {
    return <TripInformation onTripDataChange={handleTripData} />;
  }

  if (currentMessage.question) {
    return (
      <Block flex={1} padding={sizes.s} margin={sizes.s}>
        <Stack data={currentMessage.selection} onTripPreferenceDataChange={handleTripPreferenceData}/>
      </Block>
    );
  }

  if (currentMessage.recommendation || currentMessage.travelAgency) {
    console.log("Current recommendation: ", currentMessage.recommendation)
    return (
      <Block flex={1} padding={sizes.s} margin={sizes.s}>
        <SwipeableStack />
      </Block>
    );
  }

  if (currentMessage.userAnalysis || currentMessage.analysis) {
    console.log("Current userAnalysis: ", currentMessage.userAnalysis)
    console.log("Current analysis: ", currentMessage.analysis)
    return (
      <Block flex={1} padding={sizes.s} margin={sizes.s}>
        {Object.entries(currentMessage.analysis).map(([key, value], index) => (
        <Block key={index} marginVertical={sizes.m} padding={sizes.s}>
          {/* Render the key */}
          <Text style={{ fontSize: sizes.h5, fontWeight: 'bold', color: colors.text }}>
            {key.replace(/_/g, ' ')} {/* Replace underscores with spaces for readability */}
          </Text>

          {/* Render the value */}
          <Text style={{ marginTop: sizes.xs, fontSize: sizes.s, color: colors.text }}>
            {value as string}
          </Text>
        </Block>
      ))}
      </Block>
    );
  }
  return null;
};

export default CustomView;
