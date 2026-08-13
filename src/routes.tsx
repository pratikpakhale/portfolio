import type { RouteObject } from "react-router-dom";
import Home from "./App";
import { WorkPage } from "./pages/WorkPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ResearchPage } from "./pages/ResearchPage";
import { HardwarePage } from "./pages/HardwarePage";
import { SideQuestsPage } from "./pages/SideQuestsPage";
import { OssPage } from "./pages/OssPage";
import { NotFoundPage } from "./pages/NotFoundPage";

/**
 * Every path here except the catch-all is prerendered to its own HTML file at
 * build time, so there is no SPA catch-all rewrite on the host — an unknown
 * URL genuinely 404s instead of returning 200 with an empty shell.
 *
 * `/fun` and `/vibecoded` were folded into the projects archive; they 301 in
 * `vercel.json` rather than redirecting in the client, so the old links pass
 * their weight along.
 */
export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/work", element: <WorkPage /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/oss", element: <OssPage /> },
  { path: "/research", element: <ResearchPage /> },
  { path: "/hardware", element: <HardwarePage /> },
  { path: "/sidequests", element: <SideQuestsPage /> },
  // Prerendered to 404.html, which Vercel serves for anything unmatched.
  { path: "/404.html", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },
];

