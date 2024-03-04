import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import {
  eNsReducer,
  AppAction,
  AppState,
  ReducerSignature,
} from "../reducer/ensReducer";
import { initialState } from "../Components/App/App";

export const AppStateContext = createContext<AppState>(initialState);
export const AppDispatchContext = createContext<Dispatch<AppAction>>(
  () => null
);

export function useAppStateContext() {
  return useContext(AppStateContext);
}

export function useAppDispatchContext() {
  return useContext(AppDispatchContext);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer<ReducerSignature>(
    eNsReducer,
    initialState
  );

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
