import { parse } from "yaml";
import type {
  Profile,
  WorkData,
  ProjectsData,
  ResearchData,
  HardwareData,
  SideQuestsData,
  OssData,
} from "./types";

import profileRaw from "@/data/profile.yaml?raw";
import workRaw from "@/data/work.yaml?raw";
import projectsRaw from "@/data/projects.yaml?raw";
import researchRaw from "@/data/research.yaml?raw";
import hardwareRaw from "@/data/hardware.yaml?raw";
import sidequestsRaw from "@/data/sidequests.yaml?raw";
import ossRaw from "@/data/oss.yaml?raw";

export const profile: Profile = parse(profileRaw);
export const work: WorkData = parse(workRaw);
export const projects: ProjectsData = parse(projectsRaw);
export const research: ResearchData = parse(researchRaw);
export const hardware: HardwareData = parse(hardwareRaw);
export const sidequests: SideQuestsData = parse(sidequestsRaw);
export const oss: OssData = parse(ossRaw);
