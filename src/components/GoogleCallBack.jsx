import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setGoogleUser } from "../redux/googleUser";
// chatgpt
const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Verificar la autenticación con Google
    const authenticateWithGoogle = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/authRoutes/auth/google/callback", {
          withCredentials: true,
        });
        dispatch(setGoogleUser(response.data));
        navigate("/tasklist");
      } catch (error) {
        console.error("Error al autenticar con Google:", error);
        // Manejar el error, por ejemplo, redireccionar al usuario a una página de error
        navigate("/error");
      }
    };
    authenticateWithGoogle();
  }, [dispatch, navigate]);

  return <div>Procesando autenticación con Google...</div>;
};

export default GoogleCallback;
