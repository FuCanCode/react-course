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
  iPeople,
} from "../reducer/ensReducer";

const initialFriends: iPeople[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const initialState: AppState = {
  selectedFriend: null,
  friends: initialFriends,
  error: null,
};

const AppStateContext = createContext<AppState>(initialState);
const AppDispatchContext = createContext<Dispatch<AppAction>>(() => null);

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
