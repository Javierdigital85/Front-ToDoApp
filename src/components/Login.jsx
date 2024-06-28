import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";
import { useDispatch } from "react-redux";
//import googleButton from "../assets/google_signing_buttons/google.svg";
import { toast } from "sonner";
// import GoogleLogin from "react-google-login";
// import { gapi } from "gapi-script";

//Aqui solo usamos el dispatch y el setUser de redux para avisar al Store que hubo cambios

// const navigate = (url) => {
//   window.location.href = url;
// };

// async function auth() {
//   const response = await axios.post("http://localhost:8000/request");
//   navigate(response.data.url);
// }

const Login = () => {
  // const user = useSelector((state) => state.user);
  // const name = user.name;
  // const clientId =
  //   "1065357848546-u8k0oc8ad4aoaamtrnkl0qn8ui6osg2j.apps.googleusercontent.com";

  // useEffect(() => {
  //   gapi.load("client:auth2", () => {
  //     gapi.auth2.init({ clientId: clientId });
  //   });
  // }, []);
  // const responseGoogle = (response) => {
  //   console.log(response);
  //   // props.response(response);
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const userName = user ? user.name : "You are not logged in!";
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
        console.log(res, "esto es el res.dataaaa");
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

  // const handleGoogleAuth = () => {
  //   try {
  //     window.location.href = "http://localhost:8000/auth/google/callback";
  //   } catch (error) {
  //     console.log(error, "Something went wrong");
  //   }
  // };

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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 rounded-md py-2 hover:bg-blue-600 mb-4"
          >
            Login
          </button>
          {/* /// */}
          {/* <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
          {/* /// */}
          {/* <button
            className="w-full flex flex-row bg-slate-800 items-center justify-center p-2 rounded-md text-white h-10"
            type="button"
            onClick={handleGoogleAuth}
          >
            <img
              src={googleButton}
              alt="sing in button"
              className="w-6 h-6 mr-2"
            />
            Sing in with Google
          </button> */}
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
