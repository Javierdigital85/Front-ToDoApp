import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/user";
import Navbar from "./commons/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Tasklist from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/usuarios/me", {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((error) => (error, "error al loguearse"));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasklist" element={<Tasklist />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
