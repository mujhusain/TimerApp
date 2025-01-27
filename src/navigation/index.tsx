import React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTimerContext } from "../context/TimerContext";
import { Colors } from "../utills/Constants";
import { navigationRef } from "../utills/NavigationUtil";
import BottomTab from "./BottomTab";
import CustomModal from "../components/globale/CustomModal";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MainNavigation = () => {
  const colorScheme = useColorScheme();

  const {state: { completedTimerName }, dispatch} = useTimerContext();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...Colors,
    },
  };

  const handleCloseModal= () =>{
     dispatch({ type: "HIDE_MODAL", payload: "" })
  }

  return (
    <>
      <NavigationContainer ref={navigationRef} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <BottomTab />
      </NavigationContainer>
      <CustomModal
        visible={!!completedTimerName}
        timerName={completedTimerName as string}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default MainNavigation;
