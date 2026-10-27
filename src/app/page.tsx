"use client";

import { decodeVin, type DecodeVinData } from "@/app/actions/decodeVin";
import { SiteHeader } from "@/components/site-header";
import { VinSearch } from "@/components/vin-search";
import { isCompleteVin, vinValidationMessage } from "@/lib/vin";
import { useState, type FormEvent } from "react";

export default function Home() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vehicleData, setVehicleData] = useState<DecodeVinData | null>(null);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = vinValidationMessage(vin);
    if (validationError || !isCompleteVin(vin)) {
      setError(validationError ?? "Niepoprawny numer VIN.");
      setVehicleData(null);
      return;
    }

    setError("");
    setLoading(true);
    setVehicleData(null);

    try {
      const result = await decodeVin(vin);
      if ("error" in result) {
        setError(result.error);
        return;
      }

      setVehicleData(result);
    } catch {
      setError("Błąd pobierania danych pojazdu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative isolate flex min-h-full flex-1 flex-col overflow-hidden">
      <div className="workshop-glow pointer-events-none absolute inset-0" />
      <div className="chassis-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="workshop-grain pointer-events-none absolute inset-0 opacity-[0.11] mix-blend-overlay" />

      <SiteHeader />

      <main className="relative z-10 flex flex-1 flex-col items-center px-5 pb-16 pt-8 sm:pt-16">
        <p
          className="animate-rise font-mono text-[11px] tracking-[0.32em] text-primary uppercase"
          style={{ animationDelay: "40ms" }}
        >
          Numer ramy · 17 znaków
        </p>
        <h1
          className="animate-rise mt-4 max-w-2xl text-center font-heading text-[2.6rem] leading-[1.05] text-balance sm:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          Sprawdź co kryje Twój samochód
        </h1>
        <p
          className="animate-rise mt-5 max-w-lg text-center text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Wpisz VIN. Bez konta, bez klucza API — natychmiastowe dekodowanie
          marki, modelu i specyfikacji.
        </p>

        <div
          className="animate-rise mt-10 w-full"
          style={{ animationDelay: "240ms" }}
        >
          <VinSearch
            vin={vin}
            loading={loading}
            error={error}
            vehicleData={vehicleData}
            onVinChange={(value) => {
              setVin(value);
              setError("");
            }}
            onSubmit={handleSearch}
          />
        </div>
      </main>
    </div>
  );
}
