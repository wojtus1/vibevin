"use client";

import type { DecodeVinData } from "@/app/actions/decodeVin";
import { VehicleResults } from "@/components/vehicle-results";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isCompleteVin, sanitizeVin } from "@/lib/vin";
import { Loader2, Search } from "lucide-react";
import type { FormEventHandler } from "react";

type VinSearchProps = {
  vin: string;
  loading: boolean;
  error: string;
  vehicleData: DecodeVinData | null;
  onVinChange: (vin: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function VinSearch({
  vin,
  loading,
  error,
  vehicleData,
  onVinChange,
  onSubmit,
}: VinSearchProps) {
  const progress = (vin.length / 17) * 100;
  const complete = isCompleteVin(vin);

  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex w-full max-w-3xl flex-col gap-4"
      >
        <div className="relative">
          <label htmlFor="vin" className="sr-only">
            Numer VIN
          </label>
          <Input
            id="vin"
            name="vin"
            value={vin}
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
            maxLength={17}
            placeholder="WPISZ 17-ZNAKOWY VIN"
            aria-invalid={error ? true : undefined}
            aria-describedby="vin-hint"
            onChange={(event) => {
              onVinChange(sanitizeVin(event.target.value));
            }}
            className="h-16 rounded-2xl border-foreground/12 bg-card/70 px-4 font-mono text-base tracking-[0.16em] text-foreground uppercase shadow-[inset_0_1px_0_oklch(1_0_0_/_0.06)] placeholder:tracking-[0.08em] placeholder:normal-case placeholder:text-muted-foreground/70 sm:px-5 sm:text-lg sm:tracking-[0.22em] md:h-[4.5rem] md:text-2xl md:tracking-[0.28em]"
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-2 h-[2px] overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full bg-primary transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p id="vin-hint" className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {vin.length.toString().padStart(2, "0")} / 17 znaków
            {complete ? " · gotowe" : ""}
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-12 rounded-full px-7 font-medium tracking-wide"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            {loading ? "Dekodowanie…" : "Sprawdź"}
          </Button>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}
      </form>

      {loading ? <ResultsSkeleton /> : null}
      {vehicleData ? <VehicleResults data={vehicleData} /> : null}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div
      className="mx-auto mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-2"
      aria-hidden
    >
      {[0, 1].map((key) => (
        <div
          key={key}
          className="h-72 animate-pulse rounded-xl bg-card/70 ring-1 ring-foreground/10"
        />
      ))}
    </div>
  );
}
