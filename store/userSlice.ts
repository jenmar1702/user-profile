import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { User } from "@/types/User";
import {
  fetchUserData,
  fetchUsersData,
  updateUserData,
} from "@/services/userService";

export interface UsersState {
  users: User[] | [];
  selectedUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed" | "saved";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await fetchUsersData();
  return response;
});

export const fetchUserById = createAsyncThunk(
  "selectedUser/fetch",
  async (id: number) => {
    const response = await fetchUserData(id);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "selectedUser/update",
  async (props: { id: number; formData: User }) => {
    const { id, formData } = props;
    const response = await updateUserData(id, formData);

    return response;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH USERS
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload ?? [];
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      // FETCH USER
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.status = "failed";
      })
      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "saved";
        state.selectedUser = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState) => state.users.selectedUser;

export default userSlice.reducer;
