import { createContext, ReactNode, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { createRandomPost } from "./utils";

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
  setSearchQuery: (query: string) => void;
}

export const PostContext = createContext<IPostContext | null>(null);
export const SearchContext = createContext<ISearchContext | null>(null);

/* export function MyContext({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<IPost[]>(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post: IPost) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
      }}
    >
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        {children}
      </SearchContext.Provider>
    </PostContext.Provider>
  );
} */

export function MyContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    posts: Array.from({ length: 30 }, () => createRandomPost()),
    searchQuery: "",
  });

  const { posts, searchQuery } = state;
  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post: IPost) {
    dispatch({ type: "addPost", newPost: post });
  }

  function handleClearPosts() {
    dispatch({ type: "clearPosts" });
  }

  function handleSearchTyping(query: string) {
    dispatch({ type: "typeQuery", newQuery: query });
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
      }}
    >
      <SearchContext.Provider
        value={{ searchQuery, setSearchQuery: handleSearchTyping }}
      >
        {children}
      </SearchContext.Provider>
    </PostContext.Provider>
  );
}

export function useMyContext() {
  const postContext = useContext(PostContext);
  const searchContext = useContext(SearchContext);

  // if ([postContext, searchContext].some((context) => context === undefined))
  if (!postContext || !searchContext)
    throw new Error("Context was used outside of the provider!");

  return { ...postContext, ...searchContext };
}
