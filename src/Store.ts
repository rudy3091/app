export type Reducer<S, A> = (state: S, action: A) => S;
export type Listener<S> = (state: S) => void;

export interface IStore<S, A> {
  state: S;
  dispatch(action: A): void;
  subscribe(listener: Listener<S>): void;
}

export class Store<S, A> implements IStore<S, A> {
  private listeners: ((state: S) => void)[] = [];

  constructor(public state: S, public reducer: Reducer<S, A>) {}

  public dispatch(action: A): void {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: Listener<S>): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: Listener<S>): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}
