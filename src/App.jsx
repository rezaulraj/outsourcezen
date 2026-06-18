import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import NotFound from "./components/common/NotFound";
import WorkforceSourceing from "./pages/workforce-sourceing/WorkforceSourceing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/solutions/workforce-sourcing"
            element={<WorkforceSourceing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
