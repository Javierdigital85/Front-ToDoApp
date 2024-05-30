import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    name: "",
    age: "",
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
      .post("http://localhost:8000/api/usuarios/register", {
        name: users.name,
        age: users.age,
        email: users.email,
        password: users.password,
        profesion: users.profesion,
        country: users.country,
      })
      .then((res) => {
        console.log("Respuesta del servidor:", res); // Aquí puedes ver la respuesta completa del servidor
        res.data;
      })
      .then(() => navigate("/"))
      // .then(() => {
      //   setUsers({ name: "", age: "", email: "", password: "" });
      // })

      .catch((error) => {
        console.log(error, "error al crear un usuario");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <form
          onSubmit={handleSubmit}
          className="space-y-2 border-gray-300 border p-5 rounded-md"
        >
          <h2 className="mb-4 flex justify-center text-4xl text-slate-200 font-mono">
            Register
          </h2>
          <input
            value={users.name}
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-1"
            required
          />
          <br />
          <input
            value={users.age}
            type="number"
            name="age"
            placeholder="age"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-1"
            required
          />
          <br />
          <input
            value={users.email}
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-1"
            required
          />
          <br />
          <input
            type="text"
            value={users.password}
            name="password"
            placeholder="password"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-1"
            required
          />
          <br />
          <input
            type="text"
            value={users.profesion}
            name="profesion"
            placeholder="profesion"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-1"
            required
          />
          <br />
          <input
            type="text"
            value={users.country}
            name="country"
            placeholder="country"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-1"
            required
          />
          <br />
          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
