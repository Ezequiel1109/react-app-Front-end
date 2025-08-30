import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/UserService";
import { selectIsAuth, selectUsername } from "../features/selectors";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //selectores memoizados
  const isAuth = useSelector(selectIsAuth);
  const userMemoized = useSelector(selectUsername);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mi App Productos
        </Link>
        <div className="navbar-nav ms-auto">
          {isAuth ? (
            <div className="user-menu">
              <span className="navbar-text me-3">
                Bienvenido, {userMemoized}
              </span>
              <Link
                to="/products"
                className="nav-link">Productos</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Cerrar Sesión
              </button>
            </div>
          ) :  (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
