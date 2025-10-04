import { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ type = "text", className, ...props }) => {
  return (
    <input
      type={type}
      className={clsx(
        "w-full h-full border-2 border-blue-500 px-2 py-1 rounded focus:outline-none focus:border-red-500 transition-colors",
        className
      )}
      {...props}
    />
  );
};

export default Input;
