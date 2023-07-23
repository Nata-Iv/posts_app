import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import FormPostAdd from "./components/FormPostAdd";
import FormAuthIn from "./components/FormAuthIn";
import FormAuthUp from "./components/FormAuthUp";
import FormPostEdit from "./components/FormPostEdit"

function App() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_post/*" element={<FormPostAdd />} />
        <Route path="/:id/*" element={<FormPostEdit />} />
        <Route path="/sign_in/*" element={<FormAuthIn />} />
        <Route path="/sign_up/*" element={<FormAuthUp />} />
      </Routes>
    </QueryParamProvider>
  );
}

export default App;
