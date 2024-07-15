import styles from "./Button.module.css";
function Button({
  children,
  action,
  type,
}: {
  children: string;
  action?: () => void;
  type?: string;
}) {
  return (
    <button
      className={`${styles.btn} ${type ? styles[type] : ""}`}
      onClick={action}
    >
      {children}
    </button>
  );
}

export default Button;
