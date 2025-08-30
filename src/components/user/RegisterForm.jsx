import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRegister } from "../../features/authSlice";
import { selectAuthLoading } from "../../features/selectors";

export const RegisterForm = () => {
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

  const onSubmit = async (data) => {
    setMessage(null);
    setServerErrors({});
    try {
      await dispatch(addRegister(data)).unwrap();
      setMessage({
        type: "success",
        text: "Usuario registrado correctamente.",
      });
      reset();
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      // Captura el error lanzado por unwrap y Axios
      let backField = error?.response?.data?.field || error?.field;
      let backMessage = error?.response?.data?.message || error?.message;
      if (backField && backMessage) {
        setServerErrors({ [backField]: backMessage });
        setMessage(null);
      } else {
        setMessage({
          type: "danger",
          text: backMessage || "Error al registrar el usuario.",
        });
      }
    }
  };
  console.log(serverErrors); 
  return (
    <div className="card mx-auto my-4" style={{ maxWidth: 400 }}>
      <div className="card-body">
        <h4 className="card-title mb-4">Registro</h4>
        {message && !serverErrors.username && !serverErrors.email && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nombre de usuario"
              className={`form-control ${
                errors.username || serverErrors.username ? "is-invalid" : ""
              }`}
              {...register("username", {
                required: "El nombre de usuario es obligatorio.",
                minLength: {
                  value: 3,
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
              placeholder="Contraseña"
              className={`form-control ${
                errors.password || serverErrors.password ? "is-invalid" : ""
              }`}
              {...register("password", {
                required: "la contraseña es obligatoria.",
                minLength: {
                  value: 6,
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
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className={`form-control ${
                errors.email || serverErrors.email ? "is-invalid" : ""
              }`}
              {...register("email", {
                required: "El email es obligatorio.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El email no es válido.",
                },
              })}
            />
            {(errors.email || serverErrors.email) && (
              <div className="invalid-feedback d-block">
                {errors.email?.message || serverErrors.email}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isSubmitting || isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
          <div className="form-footer">
            <p>
              ¿Ya tienes cuenta?
              <Link to="/login" className="link"> Inicia sesión aquí</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
