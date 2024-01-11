export default function Stats({
  numItems,
  numPacked,
}: {
  numItems: number;
  numPacked: number;
}) {
  return (
    numItems !== 0 && (
      <div className="stats">
        You have {numItems} items on your list, and already packed {numPacked} (
        {Math.ceil((numPacked / numItems) * 100)}%)
      </div>
    )
  );
}
