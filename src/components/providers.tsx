"use client";

import type React from "react";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "src/store";
import { Toaster } from "sonner";
import { loadAuthState } from "src/store/features/auth-slice";
import { loadFavorites } from "src/store/features/favorites-slice";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize store from localStorage
  useEffect(() => {
    store.dispatch(loadFavorites());
    store.dispatch(loadAuthState());
  }, []);

  return (
    <Provider store={store}>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </Provider>
  );
}
