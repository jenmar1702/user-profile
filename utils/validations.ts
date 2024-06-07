import { User } from "@/types/User";
import { Dispatch, SetStateAction } from "react";

export const validateField = (
  name: string,
  value: string,
  setFieldErrors: Dispatch<SetStateAction<Partial<User>>>
) => {
  if (name === "email") {
    if (!isValidEmail(value)) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Invalid email format",
      }));
    } else {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  }

  if (name === "phone") {
    if (!isValidPhoneNumber(value)) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Invalid phone number format",
      }));
    } else {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  }
};

export function isValidEmail(email: string): boolean {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  // Phone number validation regex to handle different formats
  const phoneRegex =
    /^(\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
}
