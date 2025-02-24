import Button from "./Button";

interface QuantitySelectotProps {
  decrease: () => void;
  increase: () => void;
  quantity: number;
}

export default function QantitySelector({
  decrease,
  increase,
  quantity,
}: QuantitySelectotProps) {
  return (
    <div className="flex items-center">
      <Button type="small" action={decrease}>
        -
      </Button>
      <p>{quantity}</p>
      <Button type="small" action={increase}>
        +
      </Button>
    </div>
  );
}
