"use-client";

import { Toaster } from "react-hot-toast";

interface ProviderProps {
  children: React.ReactNode;
}
const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
};

export default Provider;
