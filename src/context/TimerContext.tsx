import React, { createContext, useReducer, useContext, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { formatCompletionTime } from "../utills/utills";
import { getData, setData } from "../utills/storage";
import { Action, TimerState } from "./types";

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
      return { ...state, history: [...state.history, action.payload],completedTimerName:action.payload.name };
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
    case "HIDE_MODAL":
      return {
        ...state,
        completedTimerName: null,
      };
    case "SET_STATE":
      return { ...action.payload };
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
      const loadData = () => {
        try {
          setData("timers", state.timers);
          setData("history", state.history);
        } catch (error) {
          console.error("Error saving data to AsyncStorage:", error);
        }
      }
      setTimeout(()=>{
        loadData();
      },100)
    }, [state.timers, state.history]);
  
    // Load state
    useEffect(() => {
      const loadState = async () => {
        try {
          const timers = await getData("timers");
          const history = await getData("history");

          dispatch({
            type: "SET_STATE",
            payload: {
              timers: Array.isArray(timers) ? timers : [],
              history: Array.isArray(history) ? history : [],
            },
          });
        } catch (error) {
          console.error("Error loading state from AsyncStorage:", error);
        }
      };
    
      loadState();
    }, []);

  useEffect(() => {
    state.timers.forEach((timer) => {
      if (timer.status === "Running" && timer.remainingTime > 0 && !intervals.current[timer.id]) {
        intervals.current[timer.id] = setInterval(() => {
          // Check if halfway alert needs to be shown
          if (!timer.hasShownHalfwayAlert && timer.remainingTime === Math.ceil(timer.duration / 2)) {
            Alert.alert('50% Time Remaining', `Timer "${timer.name}" is halfway done.`);
            dispatch({
              type: 'UPDATE_TIMER',
              payload: { ...timer, hasShownHalfwayAlert: true },
            });
          }

          // Update timer state
          dispatch({
            type: "UPDATE_TIMER",
            payload: {
              ...timer,
              remainingTime: Math.max(timer.remainingTime - 1, 0),
              status: timer.remainingTime - 1 <= 0 ? "Completed" : "Running",
            },
          });

          // Handle timer completion
          if (timer.remainingTime - 1 <= 0) {
            state.completedTimerName = timer.name;
            clearInterval(intervals.current[timer.id]);
            delete intervals.current[timer.id];
            dispatch({
              type: "ADD_TO_HISTORY",
              payload: { id: timer.id + new Date().toISOString(), name: timer.name, completionTime: formatCompletionTime(new Date().toISOString()) },
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
    <TimerContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);