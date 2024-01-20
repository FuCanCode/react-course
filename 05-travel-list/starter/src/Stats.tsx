export default function Stats({
  numItems,
  numPacked,
}: {
  numItems: number;
  numPacked: number;
}) {
  if (numItems === 0)
    return (
      <div className="stats">
        <em>Start by adding some Items to your packing list!</em>
      </div>
    );

  return (
    <div className="stats">
      {numPacked / numItems === 1
        ? `Everything packed, ready to go! 🛫`
        : `You have ${numItems} items on your list, and already packed ${numPacked} (
      ${Math.round((numPacked / numItems) * 100)}%)`}
    </div>
  );
}
