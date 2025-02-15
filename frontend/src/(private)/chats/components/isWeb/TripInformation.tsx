import React, { useState, useEffect } from "react";
import { Block, Text, Icon, Button } from "../../../../components";
import { useTheme } from "../../../../hooks";
import { Picker } from "@react-native-picker/picker";
import { CountryName } from "../types";
import { ITripInformation } from "../../../../constants/types";

interface TripInformationProps {
  onTripDataChange: (data: ITripInformation) => void;
}

export default function TripInformation({
  onTripDataChange,
}: TripInformationProps) {
  const { colors, sizes } = useTheme();
  const [selectedDeparture, setSelectedDeparture] = useState("Singapore");
  const [selectedDestination, setSelectedDestination] = useState("Bhutan");
  const [selectedSeason, setSelectedSeason] = useState("Summer");
  const Season = [
    { name: "Spring", code: "SP" },
    { name: "Summer", code: "SU" },
    { name: "Autumn", code: "AU" },
    { name: "Winter", code: "WI" },
  ];
  const handleSubmit = () => {
    onTripDataChange({
      departure: selectedDeparture,
      destination: selectedDestination,
      season: selectedSeason,
    });
  };

  return (
    <Block flex={1} padding={sizes.s} margin={sizes.s}>
      <Block
        safe
        center
        keyboard
        marginVertical={sizes.s}
        width={sizes.screenWidth * 0.3}
      >
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
          <Block flex={0} row align="center" radius={sizes.sm}>
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
              selectedValue={selectedDeparture}
              onValueChange={(itemValue) => setSelectedDeparture(itemValue)}
              style={{
                padding: sizes.s,
                height: sizes.inputHeight - sizes.s,
                width: "80%",
                color: colors.primary,
                backgroundColor: "#f0f0f0",
              }}
            >
              {CountryName.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.name}
                  value={item.name}
                  style={{
                    padding: sizes.s,
                    fontSize: 20,
                  }}
                />
              ))}
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
          <Block flex={0} row align="center" radius={sizes.sm}>
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
              selectedValue={selectedDestination}
              onValueChange={(itemValue) => setSelectedDestination(itemValue)}
              style={{
                padding: sizes.s,
                height: sizes.inputHeight - sizes.s,
                width: "80%",
                color: colors.primary,
                backgroundColor: "#f0f0f0",
              }}
            >
              {CountryName.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.name}
                  value={item.name}
                  style={{
                    padding: sizes.s,
                    fontSize: 20,
                  }}
                />
              ))}
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
            Season
          </Text>
          <Block flex={0} row align="center" radius={sizes.sm}>
            <Icon
              iconType="MaterialCommunityIcons"
              iconName="weather-snowy-rainy"
              color={colors.secondary as string}
              style={{
                borderRadius: sizes.s,
                marginRight: sizes.m,
                padding: sizes.s,
              }}
            />
            <Picker
              selectedValue={selectedSeason}
              onValueChange={(itemValue) => setSelectedSeason(itemValue)}
              style={{
                padding: sizes.s,
                height: sizes.inputHeight - sizes.s,
                width: "80%",
                color: colors.primary,
                backgroundColor: "#f0f0f0",
              }}
            >
              {Season.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.name}
                  value={item.name}
                  style={{
                    padding: sizes.s,
                    fontSize: 20,
                  }}
                />
              ))}
            </Picker>
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
    </Block>
  );
}
