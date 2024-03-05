import { useSelector } from 'react-redux';
import {
  selectIsRefreshing,
  selectUser,
  selectIsLoggedIn,
} from '../redux/auth/selectors';

const useAuth = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return { isRefreshing, user, isLoggedIn };
};

export default useAuth;
