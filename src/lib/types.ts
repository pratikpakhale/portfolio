export interface Link {
  label: string;
  url: string;
}

export type BrandIconName =
  | "github"
  | "linkedin"
  | "x"
  | "file"
  | "mail"
  | "globe";

export interface ProfileLink extends Link {
  /** Which mark to show in the hover card. */
  icon: BrandIconName;
  /** Username, address, or filename shown next to the icon. */
  handle: string;
  /** Brand color for the icon and handle. Defaults to the site accent. */
  color?: string;
  /** Substitute used in dark mode, for marks that vanish on a dark ground. */
  colorDark?: string;
  /** Optional one-liner under the handle. */
  note?: string;
  /** Makes the note itself clickable. */
  noteUrl?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  links: ProfileLink[];
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

/**
 * Everything I've built lives in one list — side projects, vibecoded tools and
 * one-off jokes alike. `tag` is the chip on the card, `group` decides which
 * archive tab it lands under, and an item needs at least one of live/repo to
 * be linkable (a few of the older ones are neither, and render as plain text).
 */
export interface Project {
  name: string;
  /** Hosted URL, when the thing is running somewhere. */
  live?: string;
  /** Source repository, when it's public. */
  repo?: string;
  year?: string;
  tag: string;
  group: string;
  featured?: boolean;
  description: string;
  image: string | null;
  story?: string;
}

export interface ProjectGroup {
  key: string;
  title: string;
}

export interface ProjectsData {
  bridge: string;
  groups: ProjectGroup[];
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
}

export interface OssData {
  bridge: string;
  items: OssItem[];
}
