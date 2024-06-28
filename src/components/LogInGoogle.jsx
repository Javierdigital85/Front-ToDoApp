import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setGoogleUser } from "../redux/googleUser";
import { useDispatch } from "react-redux";

const LogInGoogle = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clientId =
    "1065357848546-u8k0oc8ad4aoaamtrnkl0qn8ui6osg2j.apps.googleusercontent.com";

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);
  const responseGoogle = (response) => {
    console.log(response, "esto que devuelve?");
    // eslint-disable-next-line react/prop-types
    // props.response(response);
    axios
      .post("http://localhost:8000/api/authRoutes", {
        idToken: response.tokenId,
      })
      .then((response) => {
        console.log(response);
        // eslint-disable-next-line react/prop-types
        props.response(response);
        dispatch(setGoogleUser(response.data));
        navigate("/tasklist");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default LogInGoogle;
