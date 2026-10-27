const VIN_ALLOWED = /^[A-HJ-NPR-Z0-9]$/;

export function sanitizeVin(raw: string) {
  return raw
    .toUpperCase()
    .split("")
    .filter((char) => VIN_ALLOWED.test(char))
    .join("")
    .slice(0, 17);
}

export function isCompleteVin(vin: string) {
  return vin.length === 17 && /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
}

export function vinValidationMessage(vin: string) {
  if (vin.length === 0) {
    return "Wpisz 17-znakowy numer VIN.";
  }

  if (vin.length < 17) {
    return `Niepoprawny numer VIN — brakuje ${17 - vin.length} ${
      17 - vin.length === 1 ? "znaku" : "znaków"
    }.`;
  }

  return null;
}
