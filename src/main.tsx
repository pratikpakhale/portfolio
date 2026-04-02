if (import.meta.env.DEV) {
  import("react-grab");
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { WorkPage } from './pages/WorkPage.tsx'
import { ProjectsPage } from './pages/ProjectsPage.tsx'
import { ResearchPage } from './pages/ResearchPage.tsx'
import { HardwarePage } from './pages/HardwarePage.tsx'
import { VibecodedPage } from './pages/VibecodedPage.tsx'
import { FunPage } from './pages/FunPage.tsx'
import { SideQuestsPage } from './pages/SideQuestsPage.tsx'
import { OssPage } from './pages/OssPage.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/vibecoded" element={<VibecodedPage />} />
        <Route path="/fun" element={<FunPage />} />
        <Route path="/sidequests" element={<SideQuestsPage />} />
        <Route path="/oss" element={<OssPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
