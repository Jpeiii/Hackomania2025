import * as React from "react";
import {
  ColorValue,
  FlexStyle,
  ScaledSize,
  TextStyle,
} from "react-native";

export interface ISpacing
  extends Pick<
    FlexStyle,
    | "margin"
    | "marginVertical"
    | "marginHorizontal"
    | "marginLeft"
    | "marginRight"
    | "marginTop"
    | "marginBottom"
    | "padding"
    | "paddingVertical"
    | "paddingHorizontal"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingBottom"
  > {}

export type TWeight =
  /** fontWeight: 400 */
  | "normal"
  /** fontWeight: 100 */
  | "thin"
  /** fontWeight: 200 */
  | "extralight"
  /** fontWeight: 300 */
  | "light"
  /** fontWeight: 500 */
  | "medium"
  /** fontWeight: 600 */
  | "semibold"
  /** fontWeight: 700 */
  | "bold"
  /** fontWeight: 800 */
  | "extrabold"
  /** fontWeight: 900 */
  | "black";

export interface ITheme {
  colors: ThemeColors;
  gradients: ThemeGradients;
  sizes: ThemeSizes & ThemeSpacing & ICommonTheme["sizes"];
  assets: ThemeAssets 
  // icons: ThemeIcons;
  fonts: ThemeFonts;
  weights: ThemeWeights;
  lines: ThemeLineHeights;
}
export interface ICommonTheme {
  assets: ThemeAssets 
  // icons: ThemeIcons;
  fonts: ThemeFonts;
  weights: ThemeWeights;
  lines: ThemeLineHeights;
  sizes: {
    width: ScaledSize["width"];
    height: ScaledSize["height"];
    screenWidth: ScaledSize["width"];
    screenHeight: ScaledSize["height"];
  };
}

export interface IThemeProvider {
  children?: React.ReactNode;
  theme?: ITheme;
  setTheme?: (theme?: ITheme) => void;
}

export interface ThemeColors {
  primary: ColorValue;
  secondary: ColorValue;
  background: ColorValue;
  shadow: ColorValue;
  text: ColorValue;
  textPrimary: ColorValue;
  textSecondary: ColorValue;
  textPrimaryLight: ColorValue;
  textSecondaryLight: ColorValue;
  borderPrimary: ColorValue;
  borderSecondary: ColorValue;
  focusPrimary: ColorValue;
  focusSecondary: ColorValue;
  inputPrimary: ColorValue;
  inputSecondary: ColorValue;
  chatBackgroundHeader: ColorValue;
  chatBackground: ColorValue;
}

export interface ThemeGradients {
  primary?: string[];
  secondary?: string[];
}

export interface ThemeSizes {
  base: number;
  text: number;
  radius: number;
  padding: number;

  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  p: number;

  buttonBorder: number;
  buttonRadius: number;
  socialSize: number;
  socialRadius: number;
  socialIconSize: number;

  inputHeight: number;
  inputBorder: number;
  inputRadius: number;
  inputPadding: number;

  shadowOffsetWidth: number;
  shadowOffsetHeight: number;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;

  cardRadius: number;
  cardPadding: number;

  imageRadius: number;
  avatarSize: number;
  avatarRadius: number;

  switchWidth: number;
  switchHeight: number;
  switchThumb: number;

  checkboxWidth: number;
  checkboxHeight: number;
  checkboxRadius: number;
  checkboxIconWidth: number;
  checkboxIconHeight: number;

  linkSize: number;

  multiplier: number;
}

export interface ThemeSpacing {
  xs: number;
  s: number;
  sm: number;
  m: number;
  md: number;
  l: number;
  xl: number;
  xxl: number;
}

export interface ThemeWeights {
  text: TextStyle["fontWeight"];
  h1?: TextStyle["fontWeight"];
  h2?: TextStyle["fontWeight"];
  h3?: TextStyle["fontWeight"];
  h4?: TextStyle["fontWeight"];
  h5?: TextStyle["fontWeight"];
  h6?: TextStyle["fontWeight"];
  p?: TextStyle["fontWeight"];

  thin: TextStyle["fontWeight"];
  extralight: TextStyle["fontWeight"];
  light: TextStyle["fontWeight"];
  normal: TextStyle["fontWeight"];
  medium: TextStyle["fontWeight"];
  semibold?: TextStyle["fontWeight"];
  bold?: TextStyle["fontWeight"];
  extrabold?: TextStyle["fontWeight"];
  black?: TextStyle["fontWeight"];
}

export interface ThemeFonts {
  text: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  p: string;
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  bold: string;
  semibold: string;
  extrabold: string;
  black: string;
}

export interface ThemeLineHeights {
  text: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  p: number;
}

export interface ThemeAssets {
  OpenSansLight?: any;
  OpenSansRegular?: any;
  OpenSansSemiBold?: any;
  OpenSansExtraBold?: any;
  OpenSansBold?: any;
}