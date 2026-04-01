"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-600">
        <AlertTriangle className="size-7" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
        The dashboard hit a snag
      </h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
        {error.message || "Something unexpected happened while loading appointments."}
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
