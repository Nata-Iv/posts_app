import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import PostAdd from "./components/PostAdd";
import FormAuthIn from "./components/FormAuthIn";
import FormAuthUp from "./components/FormAuthUp";
import PostEdit from "./components/PostEdit"
import ViewPost from "./components/ViewPost"
import GuardedRoute from "./components/guardedRout";
import useLocalStorage from "use-local-storage";
import CommentPost from "./components/CommentPost";

function App() {
  const [user] = useLocalStorage("user", "")
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/" element={ <Home /> } />
        {/* <Route path="/" element={ <GuardedRoute isAuth={user.length != 0} redirectPath='sign_in' ><Home /></GuardedRoute>  }  /> */}
        <Route path="/view/:id/*" element={<ViewPost />} />
        <Route path="/comment_post/:id/*" element={<GuardedRoute isAuth={user.length != 0} redirectPath='../sign_up'><CommentPost /></GuardedRoute> } />
        <Route path="/add_post/*" element={ <GuardedRoute isAuth={user.length != 0} redirectPath='../sign_up'><PostAdd /></GuardedRoute> } />
        <Route path="/edit/:id/*" element={ <GuardedRoute isAuth={user.length != 0} redirectPath='../sign_up'><PostEdit /></GuardedRoute>} />
        <Route path="/sign_in/*" element={<FormAuthIn />} />
        <Route path="/sign_up/*" element={<FormAuthUp />} />
      </Routes>
    </QueryParamProvider>
  );
}

export default App;
