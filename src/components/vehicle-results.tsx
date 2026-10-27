import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DecodeVinData } from "@/app/actions/decodeVin";
import { AlertTriangle, Car, Gauge, ShieldCheck, Wrench } from "lucide-react";

function formatDisplacement(value: string | null) {
  if (!value || value === "—") {
    return "—";
  }

  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return `${value} L`;
  }

  return `${numeric.toFixed(1)} L`;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3 last:border-b-0">
      <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function VehicleResults({ data }: { data: DecodeVinData }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-3xl">
      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="animate-rise bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <Car className="size-4 text-primary" />
            <CardTitle className="font-heading text-xl">
              Podstawowe informacje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl>
              <SpecRow label="Marka" value={data.Make ?? "—"} />
              <SpecRow label="Model" value={data.Model ?? "—"} />
              <SpecRow label="Rok" value={data.ModelYear ?? "—"} />
              <SpecRow label="Typ" value={data.VehicleType ?? "—"} />
              <SpecRow label="Nadwozie" value={data.BodyClass ?? "—"} />
            </dl>
          </CardContent>
        </Card>

        <Card className="animate-rise bg-card/80 backdrop-blur-sm [animation-delay:80ms]">
          <CardHeader className="flex flex-row items-center gap-2">
            <Wrench className="size-4 text-primary" />
            <CardTitle className="font-heading text-xl">
              Specyfikacja silnika
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl>
              <SpecRow
                label="Pojemność"
                value={formatDisplacement(data.DisplacementL)}
              />
              <SpecRow label="Cylindry" value={data.EngineCylinders ?? "—"} />
              <SpecRow label="Paliwo" value={data.FuelTypePrimary ?? "—"} />
              <SpecRow
                label="Moc"
                value={
                  !data.EngineHP || data.EngineHP === "—"
                    ? "—"
                    : `${data.EngineHP} KM`
                }
              />
            </dl>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <Gauge className="size-3.5" />
              <span className="font-mono text-[11px] tracking-wider uppercase">
                Źródło: RapidAPI · VIN Decoder Europe
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6" aria-labelledby="history-title">
        <Card className="animate-rise border-primary/15 bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <CardTitle id="history-title" className="font-heading text-xl">
              Oś czasu i status historii
            </CardTitle>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-amber-200 uppercase">
              Dane demonstracyjne
            </span>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              <HistoryStatus
                icon={<ShieldCheck className="size-4" />}
                label="Baza skradzionych"
                value={
                  data.history.isReportedStolen
                    ? "Zgłoszony"
                    : "Czysty · demo"
                }
                positive={!data.history.isReportedStolen}
              />
              <HistoryStatus
                icon={<Gauge className="size-4" />}
                label="Odczyty licznika"
                value={`${data.history.odometerReadings}`}
              />
              <HistoryStatus
                icon={<AlertTriangle className="size-4" />}
                label="Akcje serwisowe"
                value={
                  data.history.hasOpenServiceActions
                    ? "Wymaga sprawdzenia"
                    : "Brak · demo"
                }
                positive={!data.history.hasOpenServiceActions}
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Dane demonstracyjne — użyte API dekoduje VIN, ale nie potwierdza
              wpisów w bazach skradzionych pojazdów, odczytów licznika ani
              akcji serwisowych.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function HistoryStatus({
  icon,
  label,
  value,
  positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs tracking-wide uppercase">{label}</span>
      </div>
      <p
        className={`mt-3 font-medium ${
          positive ? "text-emerald-300" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
