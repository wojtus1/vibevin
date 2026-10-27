"use server";

import { isCompleteVin, sanitizeVin } from "@/lib/vin";

export type VehicleBasics = {
  make: string;
  model: string;
  year: string;
  vehicleType: string;
  plantCountry: string;
  bodyClass: string;
};

export type EngineSpec = {
  displacementL: string;
  cylinders: string;
  fuel: string;
  horsepower: string;
};

export type DecodeVinResult =
  | {
      ok: true;
      vin: string;
      basics: VehicleBasics;
      engine: EngineSpec;
    }
  | {
      ok: false;
      error: string;
    };

type NhtsaResponse = {
  Results?: Array<Record<string, string | null>>;
};

function pick(result: Record<string, string | null>, key: string) {
  const value = result[key];
  if (!value || value === "Not Applicable" || value === "0") {
    return "—";
  }
  return value;
}

export async function decodeVin(rawVin: string): Promise<DecodeVinResult> {
  const vin = sanitizeVin(rawVin);

  if (!isCompleteVin(vin)) {
    return { ok: false, error: "Niepoprawny numer VIN" };
  }

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return { ok: false, error: "Błąd połączenia z serwerem" };
    }

    const data = (await response.json()) as NhtsaResponse;
    const result = data.Results?.[0];

    if (!result) {
      return { ok: false, error: "Brak danych dla tego pojazdu" };
    }

    const errorCode = result.ErrorCode ?? "";
    const make = pick(result, "Make");

    if (errorCode.startsWith("1") && (make === "—" || !result.Make)) {
      return { ok: false, error: "Brak danych dla tego pojazdu" };
    }

    return {
      ok: true,
      vin,
      basics: {
        make,
        model: pick(result, "Model"),
        year: pick(result, "ModelYear"),
        vehicleType: pick(result, "VehicleType"),
        plantCountry: pick(result, "PlantCountry"),
        bodyClass: pick(result, "BodyClass"),
      },
      engine: {
        displacementL: pick(result, "DisplacementL"),
        cylinders: pick(result, "EngineCylinders"),
        fuel: pick(result, "FuelTypePrimary"),
        horsepower: pick(result, "EngineHP"),
      },
    };
  } catch {
    return { ok: false, error: "Błąd połączenia z serwerem" };
  }
}
