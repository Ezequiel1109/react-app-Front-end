import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addLogin } from "../../features/authSlice";
import { selectAuthLoading } from "../../features/selectors";


export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  //selector memoizado
  const isLoading = useSelector(selectAuthLoading);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (event) => {
    /* event.preventDefault(); */
    setMessage(null);
    setServerErrors({});
    try {
      await dispatch(addLogin(event)).unwrap();
      setMessage({
        type: "success",
        text: "Inicio de sesión exitoso.",
      });
      reset();
      setTimeout(() => navigate("/api/products"), 1000); // Redirige a la página principal después de 1 segundo
    } catch (error) {
      // Captura el error lanzado por unwrap y Axios
      let backField = error?.response?.data?.field || error?.field;
      let backMessage = error?.response?.data?.message || error?.message;
      // Solo toma los campos username y password
      if (backField && backMessage) {
        setServerErrors({ [backField]: backMessage });
        setMessage(null);      
      }else{
        setMessage({
          type: "danger",
          text: backMessage || "Error al iniciar sesión.",
        });
      }
    }
  };
  return (
    <div className="card mx-auto my-4" style={{ maxWidth: 400 }}>
      <div className="card-body">
        <h4 className="card-title mb-4">Iniciar Sesión</h4>
         {message && !serverErrors.username && !serverErrors.password && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${
                errors.username || serverErrors.username ? "is-invalid" : ""
              }`}
              placeholder="Username"
              {...register("username", {
                required: "El nombre de usuario es obligatorio.",
                minLength: {
                  message:
                    "El nombre de usuario debe tener al menos 3 caracteres.",
                },
              })}
            />
            {(errors.username || serverErrors.username) && (
              <div className="invalid-feedback d-block">
                {errors.username?.message || serverErrors.username}
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${
                errors.password || serverErrors.password ? "is-invalid" : ""
              }`}
              placeholder="Password"
              {...register("password", {
                required: "La contraseña es obligatoria.",
                minLength: {
                  message: "La contraseña debe tener al menos 6 caracteres.",
                },
              })}
            />
            {(errors.password || serverErrors.password) && (
              <div className="invalid-feedback d-block">
                {errors.password?.message || serverErrors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting || isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="form-footer">
          <p>
            ¿No tienes cuenta?
            <Link to="/register" className="link"> Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
