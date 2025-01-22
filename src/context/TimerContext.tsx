import React, { createContext, useReducer, useContext } from 'react';

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  status: 'Running' | 'Paused' | 'Completed';
  category: string;
}

export interface TimerState {
  timers: Timer[];
  history: { id: string; name: string; completionTime: string }[];
}

type Action =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: Timer }
  | { type: 'ADD_TO_HISTORY'; payload: { id: string; name: string; completionTime: string } }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'RESET_TIMERS'; payload: string };

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
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.id === action.payload.id ? action.payload : timer
        ),
      };
    case 'ADD_TO_HISTORY':
      return { ...state, history: [...state.history, action.payload] };
    case 'DELETE_TIMER':
      return { ...state, timers: state.timers.filter((timer) => timer.id !== action.payload) };
    case 'RESET_TIMERS':
      return {
        ...state,
        timers: state.timers.map((timer) =>
          timer.category === action.payload
            ? { ...timer, status: 'Paused', remainingTime: timer.duration }
            : timer
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

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => useContext(TimerContext);