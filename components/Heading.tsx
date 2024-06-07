import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return <h1 className="mt-6 text-xl mb-4 text-center">{children}</h1>;
}
