import type { ScaledSize } from "react-native";
import { Dimensions, Platform } from "react-native";

const isWeb = Platform.OS === "web";
export const HEADER_HEIGHT = 100;

export const ElementsText = {
  AUTOPLAY: "AutoPlay",
};

export const window: ScaledSize = isWeb
  ? {
    ...Dimensions.get("window"),
    width: 700,
  }
  : Dimensions.get("window");