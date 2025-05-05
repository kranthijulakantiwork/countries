import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from ".."

interface FiltersState {
  searchTerm: string
  regionFilter: string
}

const initialState: FiltersState = {
  searchTerm: "",
  regionFilter: "",
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    setRegionFilter: (state, action: PayloadAction<string>) => {
      state.regionFilter = action.payload
    },
    resetFilters: (state) => {
      state.searchTerm = ""
      state.regionFilter = ""
    },
  },
})

export const { setSearchTerm, setRegionFilter, resetFilters } = filtersSlice.actions

export const selectSearchTerm = (state: RootState) => state.filters.searchTerm
export const selectRegionFilter = (state: RootState) => state.filters.regionFilter

export default filtersSlice.reducer
