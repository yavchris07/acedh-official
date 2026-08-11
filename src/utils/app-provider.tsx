import { type ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { ToastProvider } from "../components/customer-toast";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <ToastProvider>{children}</ToastProvider>
    </BrowserRouter>
  );
}
