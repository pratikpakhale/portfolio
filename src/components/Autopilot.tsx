import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { ProjectEntry } from "./Projects";
import { projects } from "@/lib/data";

export function Autopilot() {
  const items = projects.items.filter((p) => p.autopilot);
  if (items.length === 0) return null;

  return (
    <>
      <Bridge html={projects.autopilotBridge} />
      <section id="autopilot" className="py-6 pb-18">
        <SectionHeader num="04" title="Autopilot" />
        <div>
          {items.map((proj) => (
            <ProjectEntry key={proj.name} proj={proj} />
          ))}
        </div>
        <SectionFooter route="/projects" className="mt-4" />
      </section>
    </>
  );
}
