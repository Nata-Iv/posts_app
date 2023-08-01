import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import PostAdd from "./components/PostAdd";
import FormAuthIn from "./components/FormAuthIn";
import FormAuthUp from "./components/FormAuthUp";
import PostEdit from "./components/PostEdit"
import ViewPost from "./components/ViewPost"

function App() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id/*" element={<ViewPost />} />
        <Route path="/add_post/*" element={<PostAdd />} />
        <Route path="/edit/:id/*" element={<PostEdit />} />
        <Route path="/sign_in/*" element={<FormAuthIn />} />
        <Route path="/sign_up/*" element={<FormAuthUp />} />
      </Routes>
    </QueryParamProvider>
  );
}

export default App;
