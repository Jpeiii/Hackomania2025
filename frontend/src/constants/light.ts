import {
  ITheme,
  ThemeColors,
  ThemeGradients,
  ThemeSizes,
  ThemeSpacing,
} from "./types/theme";

import { THEME as commonTheme } from "./theme";

export const COLORS: ThemeColors = {
  // base colors
  /** UI color for #primary skyblue500 */

  primary: "#39A6BE",
  /** UI color for #secondary mustard500*/
  secondary: "#F8A408",

  /** UI color for shadowColor */
  shadow: '#000000',
  background: '#E9ECEF',

  /** UI color for text */
  text: '#252F40',
  textPrimary:"#1F4D5B",
  textSecondary:"#79370E",
  textPrimaryLight:"#205B6C",
  textSecondaryLight:"#93430D",

  /** UI color for border*/
  borderPrimary:"#5EBDD2",
  borderSecondary:'#FDC522',

  /** UI color for focus*/
  focusPrimary:"#8FD1E1",
  focusSecondary:"#FEDC5E",

  /** UI color for inpur*/
  inputPrimary:"#5EBDD2",
  inputSecondary:"#F8A408",

  chatBackgroundHeader: "#F5F5F5",
  chatBackground: "#FFFFFF",
};

export const GRADIENTS: ThemeGradients = {
  primary: ["#8FD1E1", "#39A6BE"],
  secondary: ["#FEDC5E", "#F8A408"],
};

export const SIZES: ThemeSizes = {
  // global sizes
  base: 8,
  text: 14,
  radius: 4,
  padding: 20,

  // font sizes
  h1: 44,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 18,
  h6: 16,
  p: 16,

  // button sizes
  buttonBorder: 1,
  buttonRadius: 8,
  socialSize: 64,
  socialRadius: 16,
  socialIconSize: 26,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: 54,
  inputBorder: 1,
  inputRadius: 12,
  inputPadding: 12,

  // card sizes
  cardRadius: 16,
  cardPadding: 10,

  // image sizes
  imageRadius: 14,
  avatarSize: 32,
  avatarRadius: 8,

  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  // product link size
  linkSize: 12,

  /** font size multiplier: for maxFontSizeMultiplier prop */
  multiplier: 2,
};

export const SPACING: ThemeSpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7,
};

export const THEME: ITheme = {
  ...commonTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: { ...SIZES, ...commonTheme.sizes, ...SPACING },
};
