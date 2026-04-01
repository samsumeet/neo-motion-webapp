import Link from "next/link";
import { SignalZero } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg">
        <SignalZero className="size-7" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950">
        You&apos;re offline right now
      </h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
        Previously visited dashboard assets are still cached. Reconnect to refresh appointment
        data from MongoDB.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Try dashboard again</Link>
      </Button>
    </main>
  );
}
