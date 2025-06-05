import { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;

  type: ButtonType;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  className = "",
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button onClick={onClick} type={type} className={className} {...props}>
      {children}
    </button>
  );
}
