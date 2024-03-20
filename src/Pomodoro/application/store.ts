import { Store } from '../../Store';
import { Timer } from '../domain/Timer';

export interface TimerState {
  paused: boolean;
  timer: Timer;
}

export type TimerAction =
  | { type: 'start' }
  | { type: 'pause' }
  | { type: 'tick' }
  | { type: 'reset' }
  | { type: 'set'; minute: number; second: number };

export const timerStore = new Store<TimerState, TimerAction>(
  {
    paused: true,
    timer: new Timer(0, 0),
  },
  (state, action) => {
    switch (action.type) {
      case 'start':
        state.timer.paused = false;
        return { ...state, paused: false };
      case 'pause':
        state.timer.paused = true;
        return { ...state, paused: true };
      case 'tick':
        state.timer.tick();
        return state;
      case 'reset':
        return { ...state, paused: true, timer: new Timer(0, 0) };
      case 'set':
        return { ...state, timer: new Timer(action.minute, action.second) };
      default:
        return state;
    }
  }
);

export const useTimer = () => timerStore;
