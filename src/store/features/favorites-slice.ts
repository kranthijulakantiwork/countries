import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from ".."

interface FavoritesState {
  countryIds: string[]
}

const initialState: FavoritesState = {
  countryIds: [],
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.countryIds.includes(action.payload)) {
        state.countryIds.push(action.payload)
        // Save to localStorage
        localStorage.setItem("favorites", JSON.stringify(state.countryIds))
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.countryIds = state.countryIds.filter((id) => id !== action.payload)
      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(state.countryIds))
    },
    loadFavorites: (state) => {
      // Load from localStorage
      if (typeof window !== "undefined") {
        const savedFavorites = localStorage.getItem("favorites")
        if (savedFavorites) {
          state.countryIds = JSON.parse(savedFavorites)
        }
      }
    },
  },
})

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions

export const selectFavorites = (state: RootState) => state.favorites.countryIds

export default favoritesSlice.reducer
