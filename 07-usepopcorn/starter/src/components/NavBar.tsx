import { ReactNode } from "react";

export function NavBar(props: { children: ReactNode | ReactNode[] }) {
  return <nav className="nav-bar">{props.children}</nav>;
}
export function Results(props: { results: number | null }) {
  return (
    <p className="num-results">
      {props.results ? (
        <>
          Found <strong>{props.results}</strong> results
        </>
      ) : (
        <>
          <strong>Search for a movie!</strong>
        </>
      )}
    </p>
  );
}
export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
