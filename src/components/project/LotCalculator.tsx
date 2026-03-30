import type { LotOption } from "@/hooks/useProjects";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Ruler, Calculator, Info } from "lucide-react";
import { useState, useMemo } from "react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

interface Props {
  lotOptions: LotOption[];
  separation: number;
  projectTitle: string;
  onLotChange?: (lot: LotOption) => void;
}

const LotCalculator = ({ lotOptions, separation, projectTitle, onLotChange }: Props) => {
  const [selectedLot, setSelectedLot] = useState(0);
  const [cuotas, setCuotas] = useState(12);

  const currentLot = lotOptions[selectedLot];

  const paymentCalc = useMemo(() => {
    if (!currentLot) return null;
    const totalPrice = currentLot.price;
    const remaining = totalPrice - separation;
    const monthlyPayment = remaining / cuotas;
    const lastPayment = remaining - monthlyPayment * (cuotas - 1);
    return { totalPrice, separation, remaining, monthlyPayment, lastPayment, cuotas };
  }, [currentLot, separation, cuotas]);

  const handleLotSelect = (i: number) => {
    setSelectedLot(i);
    onLotChange?.(lotOptions[i]);
  };

  if (lotOptions.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
      <div className="rounded-2xl bg-ceiba-dark text-white overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-lg md:text-xl font-display font-semibold mb-1">
            Tipos de lotes
          </h2>
          <p className="text-sm text-white/60 mb-5">
            Los precios mostrados son "desde" y pueden variar según la disponibilidad y la etapa del desarrollo.
          </p>
          <div className="flex flex-wrap gap-3">
            {lotOptions.map((lot, i) => (
              <button
                key={i}
                onClick={() => handleLotSelect(i)}
                className={`px-5 py-3 rounded-xl border transition-all duration-300 text-left ${
                  selectedLot === i
                    ? "bg-ceiba-terra border-ceiba-terra text-white"
                    : "bg-white/5 border-white/15 text-white/80 hover:border-white/30"
                }`}
              >
                <div className="text-lg font-bold">{lot.area}m²</div>
                <div className="text-xs opacity-70">{formatPrice(lot.price)}</div>
              </button>
            ))}
          </div>
        </div>

        {paymentCalc && (
          <div className="p-6 border-t border-white/10">
            <h3 className="text-lg font-display font-semibold mb-1">
              Pagos flexibles, sueños posibles
            </h3>

            <div className="space-y-0 mt-4">
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <span className="text-sm font-medium">Separación</span>
                <span className="text-xl font-bold">{formatPrice(paymentCalc.separation)} <span className="text-xs font-normal text-white/60">COP</span></span>
              </div>

              <div className="py-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">{cuotas} mensualidades</span>
                  <span className="text-xl font-bold">{formatPrice(paymentCalc.monthlyPayment)} <span className="text-xs font-normal text-white/60">COP</span></span>
                </div>
                <Slider
                  value={[cuotas]}
                  onValueChange={(v) => setCuotas(v[0])}
                  min={1}
                  max={36}
                  step={1}
                  className="w-full [&_[data-slot=slider-track]]:bg-white/20 [&_[data-slot=slider-range]]:bg-ceiba-terra [&_[data-slot=slider-thumb]]:bg-ceiba-terra [&_[data-slot=slider-thumb]]:border-ceiba-terra"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>1 mes</span>
                  <span>36 meses</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">Precio total</span>
                  <Info className="w-3.5 h-3.5 text-white/40" />
                </div>
                <span className="text-xl font-bold">{formatPrice(paymentCalc.totalPrice)} <span className="text-xs font-normal text-white/60">COP</span></span>
              </div>
            </div>

            <p className="text-xs text-white/50 mt-4">
              Cierra el mejor trato directamente con el constructor
            </p>
            <a
              href={`https://wa.me/573001234567?text=Hola, me interesa el proyecto ${projectTitle} - Lote de ${currentLot?.area}m²`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3"
            >
              <Button className="w-full bg-transparent border border-white/30 text-white hover:bg-white/10 py-3 text-sm">
                <Calculator className="w-4 h-4 mr-2" />
                Ajustar plan de pagos
              </Button>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LotCalculator;
