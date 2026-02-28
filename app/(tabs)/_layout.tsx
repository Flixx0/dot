import { Platform } from "react-native";

import TabLayoutAndroid from "./_layout.android";
import TabLayoutIOS from "./_layout.ios";

export const unstable_settings = {
  initialRouteName: "home",
};

const TabLayout = () =>
  Platform.OS === "ios" ? <TabLayoutIOS /> : <TabLayoutAndroid />;

export default TabLayout;
