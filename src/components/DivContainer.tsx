import { ReactNode } from "react";
import clsx from "clsx";

interface DivContainerProps {
  className?: string;
  children: ReactNode;
  width?: number;
}

export default function DivContainer({
  className,
  children,
  width,
}: DivContainerProps) {
  return (
    <div className={clsx(className)} style={{ width: `${width}px` }}>
      {children}
    </div>
  );
}
