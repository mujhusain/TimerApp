import { Action, TimerState } from "./types";

export const timerReducer = (state: TimerState, action: Action): TimerState => {
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