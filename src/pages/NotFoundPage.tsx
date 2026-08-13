import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";

export function NotFoundPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <h1 className="font-sans text-[28px] font-semibold tracking-[-0.02em] mb-3">
          404
        </h1>
        <p className="text-muted text-[16px] leading-relaxed max-w-[520px] mb-6">
          That page doesn't exist — it may have moved, or never did.
        </p>
        <Link
          to="/"
          className="font-mono text-[14px] text-dim border-b border-border hover:text-accent hover:border-accent transition-colors"
        >
          go home
        </Link>
      </section>
    </PageLayout>
  );
}
