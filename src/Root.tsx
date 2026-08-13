import { useRoutes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { routes } from "./routes";

/** The routed tree, shared by the browser entry and the prerenderer. */
export function Root() {
  const page = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {page}
    </>
  );
}
