import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Hardware } from "@/components/Hardware";
import { Vibecoded } from "@/components/Vibecoded";
import { Fun } from "@/components/Fun";
import { SideQuests } from "@/components/SideQuests";
import { Oss } from "@/components/Oss";
import { Footer } from "@/components/Footer";
import { PixelBuddy } from "@/components/PixelBuddy";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav />
      <ThemeToggle theme={theme} onToggle={toggle} />
      <PixelBuddy theme={theme} />
      <Hero />
      <Work />
      <Projects />
      <Research />
      <Hardware />
      <Vibecoded />
      <Fun />
      <SideQuests />
      <Oss />
      <Footer />
    </>
  );
}
