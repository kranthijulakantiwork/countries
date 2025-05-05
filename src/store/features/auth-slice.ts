import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from ".."

interface User {
  username: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
      // Save to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: action.payload,
        }),
      )
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      // Clear from localStorage
      localStorage.removeItem("auth")
    },
    loadAuthState: (state) => {
      // Load from localStorage
      if (typeof window !== "undefined") {
        const savedAuth = localStorage.getItem("auth")
        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth)
          state.isAuthenticated = parsedAuth.isAuthenticated
          state.user = parsedAuth.user
        }
      }
    },
  },
})

export const { login, logout, loadAuthState } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
