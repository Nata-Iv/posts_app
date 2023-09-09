import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import PostAdd from './pages/PostAdd';
import FormAuthIn from './pages/FormAuthIn';
import FormAuthUp from './pages/FormAuthUp';
import PostEdit from './pages/PostEdit';
import ViewPost from './pages/ViewPost';
import CommentPost from './pages/CommentPost';
import GuardedRoute from './components/GuardedRoute';

function App() {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id/*" element={<ViewPost />} />
        <Route
          path="/comment_post/:id/*"
          element={
            <GuardedRoute>
              <CommentPost />
            </GuardedRoute>
          }
        />
        <Route
          path="/add_post/*"
          element={
            <GuardedRoute>
              <PostAdd />
            </GuardedRoute>
          }
        />
        <Route
          path="/edit/:id/*"
          element={
            <GuardedRoute>
              <PostEdit />
            </GuardedRoute>
          }
        />
        <Route path="/sign_in/*" element={<FormAuthIn />} />
        <Route path="/sign_up/*" element={<FormAuthUp />} />
      </Routes>
    </QueryParamProvider>
  );
}

export default App;
