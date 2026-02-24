import { Platform } from "react-native";

import TabLayoutAndroid from "./_layout.android";
import TabLayoutIOS from "./_layout.ios";

const TabLayout = () =>
  Platform.OS === "ios" ? <TabLayoutIOS /> : <TabLayoutAndroid />;

export default TabLayout;
