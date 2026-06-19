import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import NotFound from "./components/common/NotFound";
import WorkforceSourceing from "./pages/workforce-sourceing/WorkforceSourceing";
import Overseas from "./pages/overseas/Overseas";
import ExecutiveSearch from "./pages/executivesearch/ExecutiveSearch";
import SmoothScroll from "./components/common/SmoothScroll";
import BulkHiring from "./pages/bulkhiring/BulkHiring";

function App() {
  return (
    <>
      {/* <SmoothScroll /> */}
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/solutions/workforce-sourcing"
              element={<WorkforceSourceing />}
            />
            <Route
              path="/solutions/overseas-recruitment"
              element={<Overseas />}
            />
            <Route
              path="/solutions/executive-search"
              element={<ExecutiveSearch />}
            />
            <Route
              path="/solutions/bulk-hiring"
              element={<BulkHiring />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
