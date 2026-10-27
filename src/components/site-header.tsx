export function SiteHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 py-6 sm:px-8">
      <div className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-[11px] tracking-[0.18em] text-primary">
          VV
        </span>
        <span className="font-heading text-2xl tracking-tight text-foreground">
          VibeVin
        </span>
      </div>
      <p className="hidden font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase sm:block">
        Dekoder VIN · MVP
      </p>
    </header>
  );
}
