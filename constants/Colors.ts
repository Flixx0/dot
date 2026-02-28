/**
 * Palette de couleurs (noms lisibles).
 * Utilisée par le thème, useThemeColor et la tab bar.
 */
export const orange = "#d9563a";
export const offWhite = "#F8F8F8";
export const white = "#FFFFFF";
export const darkGray = "#333333";
export const lightGray = "#D3D3D3";
export const gray = "#999999";
export const black = "#0C0C0C";

export default {
  light: {
    text: darkGray,
    background: offWhite,
    tint: orange,
    tabIconDefault: gray,
    tabIconSelected: orange,
    black,
  },
  dark: {
    text: white,
    background: black,
    tint: orange,
    tabIconDefault: gray,
    tabIconSelected: orange,
    black,
  },
};
