import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import closeEye from "../assets/Eye.svg";
import openEye from "../assets/OpenEye.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const userName = user ? user.name : "You are not logged in!";
  const [usuarios, setUsuarios] = useState({
    email: "",
    password: "",
  });

  // const handleInputChange = () => {
  //   setUsuarios((prevData) => ({ ...prevData }));
  // };

  const handleChange = (e) => {
    setUsuarios({
      ...usuarios,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,
        {
          email: usuarios.email,
          password: usuarios.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setUser(res.data));
        console.log(res, "esto es el res");
        console.log(res.data, "esto es el res.dataaaa");
      })
      .then(() => {
        navigate("/tasklist");
        toast.success(`You have logged in successfully!`);
      })
      .catch((error) => {
        console.log(error, "esto es el error");
        if (error.response) {
          // El servidor respondió con un código de error
          const errorMessage = error.response.data;
          console.log(errorMessage);
          toast.warning(errorMessage);
        } else {
          // Error de red u otro tipo de error
          console.error("Error de red:", error.message);
        }
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="mb-6 text-3xl text-gray-800 text-center font-mono">
            Login
          </h2>
          <label htmlFor="email" className="ml-1">
            E-mail
          </label>
          <input
            value={usuarios.email}
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <br />
          <label htmlFor="password" className="ml-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={usuarios.password}
              id="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              required
            />
            <div
              className="absolute inset-y-1 right-0 pr-3 mb-3 flex items-center cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <img src={openEye} /> : <img src={closeEye} />}
            </div>
          </div>
          <button
            id="form-login-button"
            type="submit"
            className="w-full bg-blue-500 text-white px-4 rounded-md py-2 hover:bg-blue-600 mb-4"
          >
            Login
          </button>
          <button
            className="mt-3 w-full bg-gray-700 hover:bg-gray-800 py-2 text-white rounded-md"
            onClick={() => navigate("/register")}
          >
            Register now
          </button>
          <Link
            to={"forgot-password"}
            className="mt-4 text-gray-600 text-center cursor-pointer hover:text-blue-600"
          >
            Forgot password?
          </Link>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default Login;
