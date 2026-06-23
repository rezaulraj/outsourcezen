import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import NotFound from "./components/common/NotFound";
import WorkforceSourceing from "./pages/workforce-sourceing/WorkforceSourceing";
import Overseas from "./pages/overseas/Overseas";
import ExecutiveSearch from "./pages/executivesearch/ExecutiveSearch";
import SmoothScroll from "./components/common/SmoothScroll";
import BulkHiring from "./pages/bulkhiring/BulkHiring";
import CandidateScreening from "./pages/candidatescreening/CandidateScreening";
import VisaDocumentation from "./pages/visa-documentation/VisaDocumentation";
import PreDepartureTraining from "./pages/predeparturetraining/PreDepartureTraining";
import RelocationOnboarding from "./pages/relocationonboarding/RelocationOnboarding";
import Construction from "./pages/industry/construction/Construction";
import Manufacturing from "./pages/industry/manufacturing/Manufacturing";
import Hospitality from "./pages/industry/hospitality/Hospitality";
import Healthcare from "./pages/industry/healthcare/Healthcare";
import AgricultureFarming from "./pages/industry/agriculturefarming/AgricultureFarming";
import Contact from "./pages/contact/Contact";
import TransportationLogistics from "./pages/industry/transportationlogistics/TransportationLogistics";

function App() {
  return (
    <>
      {/* <SmoothScroll /> */}
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
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
            <Route path="/solutions/bulk-hiring" element={<BulkHiring />} />
            <Route
              path="/solutions/candidate-screening"
              element={<CandidateScreening />}
            />
            <Route
              path="/solutions/visa-documentation"
              element={<VisaDocumentation />}
            />
            <Route
              path="/solutions/pre-departure-training"
              element={<PreDepartureTraining />}
            />
            <Route
              path="/solutions/relocation-onboarding"
              element={<RelocationOnboarding />}
            />
            <Route path="/industries/construction" element={<Construction />} />
            <Route
              path="/industries/manufacturing"
              element={<Manufacturing />}
            />
            <Route path="/industries/hospitality" element={<Hospitality />} />
            <Route path="/industries/healthcare" element={<Healthcare />} />
            <Route
              path="/industries/agriculture-farming"
              element={<AgricultureFarming />}
            />
            <Route
              path="/industries/transportation-logistics"
              element={<TransportationLogistics />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
