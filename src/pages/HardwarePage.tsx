import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { BuildCard } from "@/components/Hardware";
import { hardware } from "@/lib/data";

export function HardwarePage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="04" title="Hardware & builds" />
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {hardware.builds.map((build) => (
            <BuildCard key={build.name} build={build} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
