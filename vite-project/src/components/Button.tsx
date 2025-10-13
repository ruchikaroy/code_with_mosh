interface Props {
  children: string;
  color?: "primary" | "secondary" | "danger";
}

const Button = ({ children, color }: Props) => {
  return (
    <>
      <button
        type="button"
        className={"btn btn-" + color}
        onClick={() => console.log("clicked")}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
