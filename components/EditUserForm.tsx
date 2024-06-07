"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserById, selectUserById, updateUser } from "@/store/userSlice";
import { useEffect, useState } from "react";
import Button from "./Button";
import Error from "./Error";
import { User } from "@/types/User";
import Field from "./Field";
import {
  isValidEmail,
  isValidPhoneNumber,
  validateField,
} from "@/utils/validations";
import Loading from "./Loading";

interface Address {
  street: string;
  zipcode: string;
  city: string;
}

interface FormData {
  address: Address;
  email: string;
  phone: string;
}

export default function EditUserForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUserById(state));
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);

  const [fieldErrors, setFieldErrors] = useState<Partial<User>>({});
  const [formData, setFormData] = useState<FormData>({
    address: {
      street: "",
      zipcode: "",
      city: "",
    },
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(Number(id)));
    } else {
      setFormData({
        address: {
          street: user.address.street,
          zipcode: user.address.zipcode,
          city: user.address.city,
        },
        email: user.email,
        phone: user.phone,
      });
    }
  }, [dispatch, id, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    validateField(name, value, setFieldErrors);

    if (name === "street" || name === "zipcode" || name === "city") {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = { ...user, ...formData } as User;
    dispatch(updateUser({ id: Number(id), formData: data }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg"
    >
      <Field
        id="street"
        name="street"
        value={formData.address.street}
        onChange={handleChange}
      >
        Street name
      </Field>
      <Field
        id="zipcode"
        name="zipcode"
        value={formData.address.zipcode}
        onChange={handleChange}
      >
        Postal code
      </Field>
      <Field
        id="city"
        name="city"
        value={formData.address.city}
        onChange={handleChange}
      >
        City
      </Field>
      <Field
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={fieldErrors.email}
      >
        Email
      </Field>
      <Field
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={fieldErrors.phone}
      >
        Phone
      </Field>

      <Button
        type="submit"
        isDisabled={!!(fieldErrors.phone || fieldErrors.email)}
      >
        {status === "loading" ? "Loading..." : "Save changes"}
      </Button>
      {status === "failed" && <Error error={error} />}
      {status === "saved" && (
        <p className="text-green mt-2 mx-auto font-semibold text-center">
          Changes changed successfully
        </p>
      )}
    </form>
  );
}
