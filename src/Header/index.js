import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

function App() {

  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <ul>
      {user && <>
      <li> hello {user.displayName}</li>
        <li> <Link to={`/`}>Home</Link></li>
        <li> <Link to={`/about`}>About</Link></li>
        <li> <Link to={`/games`}>Games</Link></li>
        <li> <Link to={`/people`}>People</Link></li>
        <li> <p onClick={logout}> Logout </p></li>
      </>}

      {!user && <>
        <li> <Link to={`/login`}>Login</Link></li>
        <li> <Link to={`/signup`}>SignUp</Link></li>
      </>}

    </ul>

  );
}

export default App;
