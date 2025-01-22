import React from "react";
import { navigationRef } from "./src/utills/NavigationUtil";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Colors } from "./src/utills/Constants";
import BottomTab from "./src/navigation/BottomTab";
import { TimerProvider } from "./src/context/TimerContext";

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...Colors,
    },
  };
  return (
    <TimerProvider>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <BottomTab />
        
      </NavigationContainer>
    </TimerProvider>
  );
};

export default App;
