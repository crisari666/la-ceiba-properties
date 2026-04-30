import React, { createContext, useContext, useState, useCallback } from "react";

export type Currency = "COP" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (cop: number, usd?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const formatCOP = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

const formatUSD = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export const LovableCurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>("COP");

  const setCurrency = useCallback((c: Currency) => setCurrencyState(c), []);
  const toggleCurrency = useCallback(
    () => setCurrencyState((prev) => (prev === "COP" ? "USD" : "COP")),
    []
  );

  // If USD value is not provided, fallback to COP formatting (no synthetic conversion)
  const formatPrice = useCallback(
    (cop: number, usd?: number) => {
      if (currency === "USD" && typeof usd === "number" && !Number.isNaN(usd)) {
        return formatUSD(usd);
      }
      return formatCOP(cop);
    },
    [currency]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within LovableCurrencyProvider");
  return ctx;
};