"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { t } from "@/i18n";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="section">
      <div className="container-site max-w-xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gold-50 text-gold-700">
          <TriangleAlert className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-bold">{t.common.error}</h1>
        <p className="mt-3 text-muted">{t.common.errorText}</p>
        <Button className="mt-8" onClick={reset} icon={<RotateCcw className="size-5" aria-hidden="true" />}>
          {t.common.retry}
        </Button>
      </div>
    </section>
  );
}
