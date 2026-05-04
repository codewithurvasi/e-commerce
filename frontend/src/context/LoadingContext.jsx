import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const finishLoading = () => {
    setIsLoaded(true);
  };

  return (
    <LoadingContext.Provider value={{ isLoaded, finishLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
