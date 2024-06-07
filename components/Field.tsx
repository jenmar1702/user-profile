// Field.tsx
import React, { ReactNode } from "react";

interface FieldProps {
  id: string;
  name: string;
  children: ReactNode;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
}

export default function Field({
  id,
  name,
  children,
  type = "text",
  value,
  onChange,
  error,
}: FieldProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-400 text-xs font-bold uppercase"
        htmlFor={id}
      >
        {children}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`border focus:border-green ${
          error ? "border-red-500" : "border-gray-500"
        } rounded-lg w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
