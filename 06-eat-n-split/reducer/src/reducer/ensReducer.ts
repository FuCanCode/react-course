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

export type SplittedBill = {
  type: "splitted_bill";
  bill: number;
};

export type AppAction = AddedFriend | SelectedFriend | SplittedBill;

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
      const newFriendSelected = state.friends.find(
        (f) => f.id === action.selectedFriendId
      );
      console.log(
        newFriendSelected
          ? `You selected ${newFriendSelected.name}...`
          : `You've cancelled the selection of ${selectedFriendName}...`
      );
      return { ...state, selectedFriend: action.selectedFriendId };
    }

    case "splitted_bill": {
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
