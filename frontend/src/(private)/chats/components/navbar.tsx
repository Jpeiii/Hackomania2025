import React from "react";
import { Block, Icon, Text } from "../../../components";
import { Platform, View } from "react-native";
import { useTheme } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { B } from "@expo/html-elements";
export function NavBar() {
  const isWeb = Platform.OS === "web";
  const { colors, sizes } = useTheme();
  const navigation = useNavigation();
  return isWeb ? (
    <View
      style={{
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        padding: sizes.s,
      }}
    >
      <View style={{ flex: 0.2 }}>
        <Icon
          iconType="Ionicons"
          iconName="arrow-back"
          onPress={() => navigation.goBack()}
          style={{ alignSelf: "flex-start" }}
          color={colors.textSecondary as string}
        />
      </View>
      <View style={{ flex: 0.8 }}>
        <Text center bold textSecondary>
          Nomad AI Chat{"\n"}
        </Text>
      </View>
    </View>
  ) : (
    <Block
      style={{
        flexDirection: "column",
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
      }}
      align="center"
      justify="center"
      center
      flex={0}
    >
      <Block flex={0} width={sizes.width * 0.9}>
        <Icon
          iconType="Ionicons"
          iconName="arrow-back"
          onPress={() => navigation.goBack()}
          style={{ alignSelf: "flex-start" }}
          color={colors.textSecondary as string}
        />
        <Block row flex={0} justify="center">
          <Text center bold textSecondary>
            Nomad AI Chat{"\n"}
          </Text>
        </Block>
      </Block>
    </Block>
  );
}
