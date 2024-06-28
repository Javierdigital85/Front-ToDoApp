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
import GoogleCallback from "./components/GoogleCallBack";

function App() {
  // const [stateAuth, setStateAuth] = useState();
  // const response = (res) => {
  //   setStateAuth(res);
  // };

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
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/authRoutes/google/callback/me", {
  //       withCredentials: true,
  //     })
  //     .then((res) => res.data)
  //     .then((user) => {
  //       dispatch(setUser(user));
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener usuario:", error);
  //     });
  // }, []);

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar response={response} /> */}
        <Navbar />
        <Toaster position="top-center" duration={5000} closeButton richColors />
        <Routes>
          {/*  <Route path="/" element={<Login response={response} />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasklist" element={<Tasklist />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
          <Route path="/tasklist" element={<GoogleCallback />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
