import { Navigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

const GuardedRoute = ({ children }) => {
  const [user] = useLocalStorage('user', '');

  if (user.length === 0) {
    return <Navigate to="../sign_up" />;
  } else {
    return children;
  }
};

export default GuardedRoute;
