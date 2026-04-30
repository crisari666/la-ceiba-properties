import { useCurrency } from "@/i18n/CurrencyContext";
import { DollarSign } from "lucide-react";

interface Props {
  variant?: "navbar" | "footer";
  className?: string;
}

const CurrencyToggle = ({ variant = "navbar", className = "" }: Props) => {
  const { currency, toggleCurrency } = useCurrency();

  const base =
    variant === "footer"
      ? "flex items-center gap-1.5 text-sm text-white/50 hover:text-ceiba-warm transition-colors px-3 py-1.5 rounded-md border border-white/10 hover:border-ceiba-warm/30"
      : "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted";

  return (
    <button
      onClick={toggleCurrency}
      className={`${base} ${className}`}
      aria-label="Toggle currency"
      title={`Cambiar a ${currency === "COP" ? "USD" : "COP"}`}
    >
      <DollarSign className="w-4 h-4" />
      {currency === "COP" ? "USD" : "COP"}
    </button>
  );
};

export default CurrencyToggle;