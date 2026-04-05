export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  links: Link[];
}

export interface DiffLine {
  type: "plus" | "minus";
  text: string;
}

export interface Position {
  hash: string;
  date: string;
  title: string;
  company: string;
  diff: DiffLine[];
  story?: string;
}

export interface WorkData {
  bridge: string;
  positions: Position[];
}

export interface Project {
  name: string;
  url: string;
  year: string;
  tag: string;
  description: string;
  image: string | null;
  story?: string;
  era?: string;
}

export interface ProjectsData {
  bridge: string;
  items: Project[];
}

export interface Paper {
  authors: string;
  title: string;
  venue: string;
  links: Link[];
}

export interface ResearchData {
  bridge: string;
  papers: Paper[];
}

export interface Build {
  name: string;
  description: string;
  image: string | null;
  video?: string | null;
  thumbnail?: string | null;
}

export interface HardwareData {
  bridge: string;
  builds: Build[];
}

export interface Demo {
  name: string;
  url: string;
  note: string;
  image: string | null;
}

export interface VibecodedData {
  bridge: string;
  subtitle: string;
  demos: Demo[];
}

export interface FunItem {
  name: string;
  description: string;
  image: string | null;
}

export interface FunData {
  bridge: string;
  items: FunItem[];
}

export interface SideQuestItem {
  name: string;
  description: string;
  tag: string;
}

export interface SideQuestsData {
  bridge: string;
  items: SideQuestItem[];
}

export interface OssItem {
  name: string;
  url: string | null;
  role: string;
  period: string;
}

export interface OssData {
  bridge: string;
  items: OssItem[];
}
