export default function Heading() {
  const style: React.CSSProperties = {
    textAlign: "center",
    fontSize: "3rem",
    margin: "3rem",
    padding: "1.5rem",
    backgroundColor: "rgb(59, 59, 59)",
    borderRadius: "50px",
  };
  return <h1 style={style}>Flashcards</h1>;
}
