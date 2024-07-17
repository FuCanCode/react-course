import { createContext, Dispatch, SetStateAction } from "react";

export interface IPost {
  title: string;
  body: string;
}

export interface IPostContext {
  posts: IPost[];
  onAddPost: (post: IPost) => void;
  onClearPosts: () => void;
}

export interface ISearchContext {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const PostContext = createContext<IPostContext>({} as IPostContext);

export const SearchContext = createContext<ISearchContext>(
  {} as ISearchContext
);
