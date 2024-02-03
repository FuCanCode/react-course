import Button from "../Button/Button";
import "./billForm.css";

export default function BillForm() {
  return (
    <div className="bill">
      <h1>Split a Bill with xxx</h1>
      <form>
        <label htmlFor="bill">💰 Bill value</label>
        <input type="text" name="bill" />
        <label htmlFor="own">🫰 Your expense</label>
        <input type="text" name="own" />
        <label htmlFor="other">🫵 xxx's expense</label>
        <input type="text" name="other" />
        <label htmlFor="decide">❓ Who is paying the bill?</label>
        <select name="decide">
          <option value="">You</option>
          <option value="">XXX</option>
        </select>
        <Button>Split Bill</Button>
      </form>
    </div>
  );
}
