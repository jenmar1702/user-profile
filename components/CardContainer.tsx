import { ReactNode } from "react";

export default function CardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="border p-4 bg-white shadow-md rounded-lg max-w-screen-md mx-auto items-center">
      {children}
    </div>
  );
}
