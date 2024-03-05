export interface iPeople {
  id: number;
  name: string;
  image: string;
  balance: number;
}

export interface AppState {
  selectedFriend: number | null;
  friends: iPeople[];
  error: null | string;
}

export type AddedFriend = {
  type: "added_friend";
  newFriend: iPeople;
};

export type SelectedFriend = {
  type: "selected_friend";
  selectedFriendId: number | null;
};

export type SplitBill = {
  type: "split_bill";
  bill: number;
};

export type AppAction = AddedFriend | SelectedFriend | SplitBill;

export type ReducerSignature = (state: AppState, action: AppAction) => AppState;

export function eNsReducer(state: AppState, action: AppAction): AppState {
  const selectedFriendName = state.friends.find(
    (f) => f.id === state.selectedFriend
  )?.name;

  switch (action.type) {
    case "added_friend": {
      console.log(`${action.newFriend.name} added to your friend list...`);
      return { ...state, friends: [...state.friends, action.newFriend] };
    }

    case "selected_friend": {
      return { ...state, selectedFriend: action.selectedFriendId };
    }

    case "split_bill": {
      console.log(
        `Splitted bill with ${selectedFriendName} for ${action.bill}€...`
      );

      return {
        ...state,
        friends: state.friends.map((f) =>
          f.id === state.selectedFriend
            ? { ...f, balance: f.balance + action.bill }
            : f
        ),
        selectedFriend: null,
      };
    }

    default:
      return {
        ...state,
        error: `Invalid action type! ;(. Check your action types`,
      };
  }
}
