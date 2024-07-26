import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    profesion: "",
    country: "",
  });

  const handleChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/register`, {
        name: users.name,
        email: users.email,
        password: users.password,
        profesion: users.profesion,
        country: users.country,
      })
      .then((res) => {
        console.log("Respuesta del servidor:", res); // Aquí puedes ver la respuesta completa del servidor
        res.data;
      })
      .then(() => {
        toast.success("You have registered successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data, "inicio error");
        if (error.response) {
          const errorMessage = error.response.data;
          console.log(error.response);
          console.log("error", errorMessage);
          toast.warning(errorMessage);
        }
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-300 shadow-md border p-6 w-full max-w-md rounded-lg"
        >
          <h2 className="mb-6 text-4xl text-center text-gray-800 font-mono">
            Register
          </h2>
          <label htmlFor="name" className="font-mono">
            Name
          </label>
          <input
            value={users.name}
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <label htmlFor="email" className="font-mono">
            Email
          </label>
          <input
            value={users.email}
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <label htmlFor="password" className="font-mono">
            Password
          </label>
          <input
            type="text"
            value={users.password}
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <label htmlFor="profesion" className="font-mono">
            Profesion
          </label>
          <input
            type="text"
            value={users.profesion}
            name="profesion"
            id="profesion"
            placeholder="profesion"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <label htmlFor="country" className="font-mono">
            Country
          </label>
          <input
            type="text"
            value={users.country}
            name="country"
            id="country"
            placeholder="country"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <br />
          <br />

          <button
            type="submit"
            className="font-mono mb-4 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
