import { HIDE_TAB_BAR } from "@/constants/Dev";
import { Platform } from "react-native";

import TabLayoutAndroid from "./_layout.android";
import TabLayoutIOS from "./_layout.ios";

export const unstable_settings = {
  initialRouteName: "home",
};

const TabLayout = () => {
  if (HIDE_TAB_BAR) return <TabLayoutAndroid />;
  return Platform.OS === "ios" ? <TabLayoutIOS /> : <TabLayoutAndroid />;
};

export default TabLayout;
