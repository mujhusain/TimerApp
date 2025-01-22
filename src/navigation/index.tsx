import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { TimerProvider, useTimerContext } from "../context/TimerContext";
import { Colors } from "../utills/Constants";
import { navigationRef } from "../utills/NavigationUtil";
import BottomTab from "./BottomTab";
import CustomModal from "../components/globale/CustomModal";

const MainNavigation = () => {
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
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
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
