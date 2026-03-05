import type { AppThemeColors, AppThemeFonts } from "@/theme";

declare global {
  namespace ReactNavigation {
    interface Theme {
      colors: AppThemeColors;
      fonts: AppThemeFonts;
    }
  }
}

export {};
