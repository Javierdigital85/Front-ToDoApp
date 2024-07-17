import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";
import { toast } from "sonner";

const Navbar = () => {
  const user = useSelector((state) => state.user); //con useSelector posicionas el estado global sobre el componente que necesita la data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/usuarios/logout",
        {
          name: user,
        },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .then(() => navigate("/"));
    dispatch(setUser(""));
    toast.success(`You have log out successfully!`);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 border-b border-slate-600 text-lg">
      <div className="container mx-auto flex justify-between items-center">
        {user.id ? (
          <Link to={"/tasklist"} className="hover:text-gray-300">
            Home
          </Link>
        ) : (
          <Link to={"/"} className="hover:text-gray-300">
            Home
          </Link>
        )}
        <ul className="flex space-x-4">
          {/*  */}
          {user.id ? (
            <li>
              <Link to={"tasks/new"} className="hover:text-gray-300">
                New Task
              </Link>
            </li>
          ) : (
            <></>
          )}
          {user.id ? (
            <li>
              <Link
                to={"tasklist"}
                id="task-list"
                className="hover:text-gray-300"
              >
                Task List
              </Link>
            </li>
          ) : (
            <></>
          )}
          {user.id ? (
            <li>
              <Link to={`/change-password/${user.id}`}>New password</Link>
            </li>
          ) : (
            <></>
          )}

          {user.id ? (
            <></>
          ) : (
            <li className="mt-2">
              <Link to={"/register"} className="hover:text-gray-300">
                Register
              </Link>
            </li>
          )}
          {user.id ? (
            <>
              <p className="text-cyan-400 hover:text-cyan-500">
                Welcome {user.name}!
              </p>
              <img src="" />
            </>
          ) : (
            <></>
          )}
          {user.id ? (
            <li>
              <>
                <Link
                  to={"login"}
                  className="hover:text-gray-300"
                  onClick={handleLogout}
                >
                  Log Out
                </Link>
              </>
            </li>
          ) : (
            <>
              <Link to={"/"} className="hover:text-gray-300 mt-2">
                Login
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
