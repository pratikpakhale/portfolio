import { Seo } from "@/components/Seo";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Hardware } from "@/components/Hardware";
import { SideQuests } from "@/components/SideQuests";
import { Oss } from "@/components/Oss";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Seo path="/" />
      <Nav />
      <ThemeToggle theme={theme} onToggle={toggle} />
      <Hero />
      <Work />
      <Oss />
      <Projects />
      <Hardware />
      <Research />
      <SideQuests />
      <Footer />
    </>
  );
}
