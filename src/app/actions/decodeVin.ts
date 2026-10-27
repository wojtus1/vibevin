"use server";

export type DecodeVinData = {
  Make: string | null;
  Model: string | null;
  ModelYear: string | null;
  VehicleType: string | null;
  BodyClass: string | null;
  DisplacementL: string | null;
  EngineCylinders: string | null;
  FuelTypePrimary: string | null;
  EngineHP: string | null;
  history: VehicleHistoryStatus;
};

export type VehicleHistoryStatus = {
  isReportedStolen: boolean;
  odometerReadings: number;
  hasOpenServiceActions: boolean;
  isDemo: true;
};

type DecodeVinResult = DecodeVinData | { error: string };

type RapidApiResponse = {
  code?: number;
  make?: string;
  model?: string;
  model_year?: string;
  body_style?: string;
  engine_type?: string;
  fuel_type?: string;
  vehicle_type?: string;
  displacement_nominal?: string;
  engine_horsepower?: string;
};

export async function decodeVin(vin: string): Promise<DecodeVinResult> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return { error: "Brak klucza API. Ustaw RAPIDAPI_KEY w konfiguracji serwera." };
  }

  try {
    const response = await fetch(
      `https://vin-decoder-europe2.p.rapidapi.com/vin_decoder?vin=${encodeURIComponent(vin)}`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "vin-decoder-europe2.p.rapidapi.com",
        },
        cache: "no-store",
      },
    );

    if (response.status === 401 || response.status === 403) {
      return { error: "Klucz RapidAPI jest nieprawidłowy lub nie ma dostępu do tego API." };
    }

    if (response.status === 429) {
      return { error: "Wykorzystano limit zapytań RapidAPI. Spróbuj ponownie później." };
    }

    if (!response.ok) {
      return { error: "Błąd połączenia z serwerem" };
    }

    const vehicle = (await response.json()) as RapidApiResponse;

    if (vehicle.code !== 200 || !vehicle.make) {
      return { error: "Brak danych dla tego pojazdu" };
    }

    return {
      Make: vehicle.make ?? null,
      Model: vehicle.model ?? null,
      ModelYear: vehicle.model_year ?? null,
      VehicleType: vehicle.vehicle_type ?? null,
      BodyClass: vehicle.body_style ?? null,
      DisplacementL: vehicle.displacement_nominal ?? null,
      EngineCylinders: null,
      FuelTypePrimary: vehicle.fuel_type ?? null,
      EngineHP: vehicle.engine_horsepower ?? null,
      history: {
        isReportedStolen: false,
        odometerReadings: 3,
        hasOpenServiceActions: false,
        isDemo: true,
      },
    };
  } catch {
    return { error: "Błąd pobierania danych pojazdu" };
  }
}
