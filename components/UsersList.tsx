"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers, selectAllUsers } from "../store/userSlice";
import { useEffect } from "react";
import Link from "next/link";
import Error from "./Error";
import Loading from "./Loading";
import CardContainer from "./CardContainer";

export default function UsersList() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);
  const isLoading =
    users.length === 0 || status === "loading" || status === "idle";

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  return (
    <>
      {isLoading && <Loading />}
      {status === "succeeded" && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>
                <CardContainer>{user.name}</CardContainer>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {status === "failed" && <Error error={error} />}
    </>
  );
}
