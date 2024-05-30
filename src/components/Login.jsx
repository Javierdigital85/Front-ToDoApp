import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";
import { useDispatch } from "react-redux";
//Aqui solo usamos el dispatch y el setUser de redux para avisar al Store que hubo cambios
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usuarios, setUsuarios] = useState({
    email: "",
    password: "",
  });

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
        "http://localhost:8000/api/usuarios/login",
        {
          email: usuarios.email,
          password: usuarios.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setUser(res.data));
        console.log(res.data, "esto es el res.dataaaa");
      })
      .then(() => navigate("/tasklist"));
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
            Email
          </label>
          <input
            value={usuarios.email}
            type="email"
            id="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <br />
          <label htmlFor="password" className="ml-1">
            Password
          </label>
          <input
            type="text"
            value={usuarios.password}
            id="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          {/* <div className="flex flex-col"> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 rounded-md py-2 hover:bg-blue-600"
          >
            Login
          </button>
          <button
            className="mt-3 w-full bg-gray-700 hover:bg-gray-800 py-2 text-white rounded-md"
            onClick={() => navigate("/register")}
          >
            Register now
          </button>
          <p className="mt-4 text-gray-600 text-center cursor-pointer hover:text-blue-600">
            Forgot password?
          </p>
          {/* </div> */}
        </form>
      </div>
    </>
  );
};

export default Login;
