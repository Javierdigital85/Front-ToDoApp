import axios from "axios";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGoogleUser } from "../redux/googleUser";

const LogOutGoogle = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const logout = () => {
    console.log("logout successfully");
    axios
      .post(
        "http://localhost:8000/api/authRoutes/google/callback/logout",
        {
          name: user,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(setGoogleUser(""));
        // eslint-disable-next-line react/prop-types
        props.response();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clientId =
    "1065357848546-u8k0oc8ad4aoaamtrnkl0qn8ui6osg2j.apps.googleusercontent.com";

  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={logout}
    ></GoogleLogout>
  );
};

export default LogOutGoogle;
