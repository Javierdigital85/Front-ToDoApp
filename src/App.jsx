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
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import RepeatPassword from "./components/RepeatPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/me`, {
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
        <Toaster position="top-center" duration={5000} closeButton richColors />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasklist" element={<Tasklist />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/repeat-password/:token" element={<RepeatPassword />} />
          <Route
            path="/change-password/:user_id"
            element={<ChangePassword />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
