import React, { createContext, useReducer, useContext, useEffect, useRef } from "react";

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  status: "Running" | "Paused" | "Completed";
  category: string;
}

export interface TimerState {
  timers: Timer[];
  history: { id: string; name: string; completionTime: string }[];
}

type Action =
  | { type: "ADD_TIMER"; payload: Timer }
  | { type: "UPDATE_TIMER"; payload: Timer }
  | { type: "ADD_TO_HISTORY"; payload: { id: string; name: string; completionTime: string } }
  | { type: "DELETE_TIMER"; payload: string }
  | { type: "RESET_TIMER"; payload: string }
  | { type: "START_TIMER"; payload: string }
  | { type: "PAUSE_TIMER"; payload: string };

const initialState: TimerState = {
  timers: [],
  history: [],
};

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const timerReducer = (state: TimerState, action: Action): TimerState => {
  switch (action.type) {
    case "ADD_TIMER":
      return { ...state, timers: [...state.timers, action.payload] };
    case "UPDATE_TIMER":
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? action.payload : timer
        ),
      };
    case "ADD_TO_HISTORY":
      return { ...state, history: [...state.history, action.payload] };
    case "DELETE_TIMER":
      return { ...state, timers: state.timers.filter((timer) => timer.id !== action.payload) };
    case "RESET_TIMER":
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload
            ? { ...timer, status: "Paused", remainingTime: timer.duration }
            : timer
        ),
      };
    case "START_TIMER":
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload ? { ...timer, status: "Running" } : timer
        ),
      };
    case "PAUSE_TIMER":
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload ? { ...timer, status: "Paused" } : timer
        ),
      };
    default:
      return state;
  }
};

interface TimerProviderProps {
  children: React.ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const intervals = useRef<{ [id: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    state.timers.forEach((timer) => {
      if (timer.status === "Running" && timer.remainingTime > 0 && !intervals.current[timer.id]) {
        intervals.current[timer.id] = setInterval(() => {
          dispatch({
            type: "UPDATE_TIMER",
            payload: {
              ...timer,
              remainingTime: Math.max(timer.remainingTime - 1, 0),
              status: timer.remainingTime - 1 <= 0 ? "Completed" : "Running",
            },
          });

          if (timer.remainingTime - 1 <= 0) {
            clearInterval(intervals.current[timer.id]);
            delete intervals.current[timer.id];
            dispatch({
              type: "ADD_TO_HISTORY",
              payload: { id: timer.id, name: timer.name, completionTime: new Date().toISOString() },
            });
          }
        }, 1000);
      } else if (timer.status !== "Running" && intervals.current[timer.id]) {
        clearInterval(intervals.current[timer.id]);
        delete intervals.current[timer.id];
      }
    });

    return () => {
      Object.values(intervals.current).forEach(clearInterval);
      intervals.current = {};
    };
  }, [state.timers]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);