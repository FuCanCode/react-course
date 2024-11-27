import {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Action, reducer, State } from "./reducer";
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

const initState: State = {
  posts: Array.from({ length: 30 }, () => createRandomPost()),
  searchQuery: "",
};

export function MyContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initState
  );

  const { posts, searchQuery } = state;
  // Derived state. These are the posts that will actually be displayed
  const searchedPosts = useMemo(()=>
    searchQuery?.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts, [posts, searchQuery])

  function handleAddPost(post: IPost) {
    dispatch({ type: "addPost", newPost: post });
  }

  function handleClearPosts() {
    dispatch({ type: "clearPosts" });
  }

  function handleSearchTyping(query: string) {
    dispatch({ type: "typeQuery", newQuery: query });
  }

  const postContextValue = useMemo(()=>{
    return {
      posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
    }
  },[searchedPosts])

  const searchContextValue = useMemo(()=>{
    return {
      searchQuery, setSearchQuery: handleSearchTyping
    }
  },[searchQuery])

  return (
    <PostContext.Provider
      value={postContextValue}
    >
      <SearchContext.Provider
        value={ searchContextValue }
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
