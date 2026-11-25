export interface Link {
  label: string;
  url: string;
}

export type BrandIconName = "github" | "globe" | "youtube";

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
  /** Lead line shown above the bullets. */
  summary?: string;
  diff: DiffLine[];
  story?: string;
}

export interface WorkData {
  bridge: string;
  positions: Position[];
}

/**
 * Everything I've built lives in one list: side projects, vibecoded tools and
 * one-off jokes alike. An item needs at least one of live/repo to be linkable
 * (a few of the older ones are neither, and render as plain text).
 */
export interface Stat {
  label: string;
  value: string;
  /** Field of the project's `statsUrl` response that replaces `value` once it loads. */
  key?: string;
}

export interface Project {
  name: string;
  /** Hosted URL, when the thing is running somewhere. */
  live?: string;
  /** Source repository, when it's public. */
  repo?: string;
  /** Demo video. */
  video?: string;
  year?: string;
  /** Shown under highlights, and on the homepage grid unless it's an autopilot app. */
  featured?: boolean;
  /** Runs itself; listed in the homepage's Autopilot section. */
  autopilot?: boolean;
  description: string;
  image: string | null;
  story?: string;
  stats?: Stat[];
  /** Endpoint returning live numbers for `stats`; `value` is the prerendered fallback. */
  statsUrl?: string;
}

export interface ProjectsData {
  bridge: string;
  autopilotBridge: string;
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
  links?: Link[];
}

export interface OssData {
  bridge: string;
  items: OssItem[];
}
