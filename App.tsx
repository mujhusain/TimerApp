import React, { FC } from "react";
import MainNavigation from "./src/navigation";
import { TimerProvider} from "./src/context/TimerContext";

const App: FC = () => {
  return (
    <TimerProvider>
      <MainNavigation />
    </TimerProvider>
  );
};

export default App;
