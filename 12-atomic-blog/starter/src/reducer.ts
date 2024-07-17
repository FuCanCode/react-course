import { IPost } from "./Context";

export interface State {
  posts: IPost[];
  searchQuery: string;
}

export type Action =
  | { type: "addPost"; newPost: IPost }
  | { type: "clearPosts" }
  | { type: "typeQuery"; newQuery: string };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "addPost":
      return { ...state, posts: [action.newPost, ...state.posts] };

    case "clearPosts":
      return { ...state, posts: [] };

    case "typeQuery":
      return { ...state, searchQuery: action.newQuery };

    default:
      throw new Error(
        `No action is defined like this. Check spelling or add action.`
      );
  }
}
