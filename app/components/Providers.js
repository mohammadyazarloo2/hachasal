"use client";

import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "./ui/toast";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
