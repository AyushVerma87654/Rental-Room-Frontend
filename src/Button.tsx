import { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  className,
  type = "button",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "bg-rose-500 rounded-md text-white font-semibold cursor-pointer px-6 py-2 shadow",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
