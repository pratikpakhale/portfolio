import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectItem } from "@/components/Projects";
import { projects } from "@/lib/data";

export function ProjectsPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="02" title="Projects" />
        <div>
          {projects.items.map((proj, i) => (
            <ProjectItem
              key={proj.name}
              proj={proj}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
