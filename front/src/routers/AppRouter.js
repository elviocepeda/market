import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, NotFound } from "../pages";
import { routes } from "./routes";
import { Layout } from "../components";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path={routes.home}
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </Router>
  );
}
