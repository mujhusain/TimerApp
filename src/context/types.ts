export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  status: "Running" | "Paused" | "Completed";
  category: string;
  hasShownHalfwayAlert?: boolean;
}

export interface TimerState {
  timers: Timer[];
  history: { id: string; name: string; completionTime: string }[];
  completedTimerName?: string | null;
}

export type Action =
  | { type: "ADD_TIMER"; payload: Timer }
  | { type: "UPDATE_TIMER"; payload: Timer }
  | { type: "ADD_TO_HISTORY"; payload: { id: string; name: string; completionTime: string } }
  | { type: "DELETE_TIMER"; payload: string }
  | { type: "RESET_TIMER"; payload: string }
  | { type: "START_TIMER"; payload: string }
  | { type: "PAUSE_TIMER"; payload: string }
  | { type: "HIDE_MODAL"; payload: string }
  | { type: "SET_STATE"; payload: TimerState }; 