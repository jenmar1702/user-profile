"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserById, selectUserById } from "@/store/userSlice";
import Heading from "./Heading";
import { useEffect } from "react";
import Link from "next/link";
import Loading from "./Loading";

export default function UserInfo({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectUserById(state));

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [dispatch, id, user]);

  return (
    <div>
      {user ? (
        <>
          <Heading>Hello {user?.name}!</Heading>
          <section className="border p-4 bg-white shadow-md rounded-lg max-w-screen-md mx-auto items-center">
            <div>
              <p className="mb-2">
                <strong>Street name:</strong>{" "}
                <span>{user?.address.street}</span>
              </p>
              <p className="mb-2">
                <strong>Postal code:</strong>{" "}
                <span>{user?.address.zipcode}</span>
              </p>
              <p className="mb-2">
                <strong>City:</strong> <span>{user?.address.city}</span>
              </p>
              <p className="mb-2">
                <strong>Email:</strong> <span>{user?.email}</span>
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> <span>{user?.phone}</span>
              </p>
            </div>
            <div className="text-center text-green">
              <Link className="underline" href={`${id}/edit`}>
                Edit profile
              </Link>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
