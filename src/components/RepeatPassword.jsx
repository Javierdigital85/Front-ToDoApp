import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import closeEye from "../assets/Eye.svg";
import openEye from "../assets/OpenEye.svg";

const RepeatPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormdata] = useState({
    password: "",
    repeatPassword: "",
  });
  const [submit, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleRepeatpassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSubmmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.repeatPassword) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/usuarios/usuario/validate-token/${token}`
        )
        .then((res) => {
          const user = res.data;
          axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/usuarios/overwrite-password/${user.id}`,
            {
              password: formData.password,
            }
          );
        })
        .then(() => {
          toast.success("password changed");
          navigate("/");
        })
        .then((res) => {
          if (res.status === 200) {
            setSubmitted(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            const errorMessage = error.response.data;
            toast.warning(errorMessage);
          }
        });
    } else {
      toast.warning("password must be the same");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          className="bg-gray-300 shadow-md border p-6 w-full max-w-md rounded-lg flex flex-col"
          onSubmit={handleSubmmit}
        >
          <h2 className="text-center font-mono mb-6">Complete the fields</h2>
          <label className="font-mono">password</label>
          <div className="relative">
            <input
              value={formData.password}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              required
            />
            <div
              className="absolute inset-y-1 right-0 pr-3 mb-3 flex items-center cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <img src={openEye} /> : <img src={closeEye} />}
            </div>
          </div>
          <label className="font-mono">Repeat password</label>
          <div className="relative">
            <input
              type={showRepeatPassword ? "text" : "password"}
              value={formData.repeatPassword}
              name="repeatPassword"
              placeholder="new password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              required
            />
            <div
              className="absolute inset-y-1 right-0 pr-3 mb-3 flex items-center cursor-pointer"
              onClick={toggleRepeatpassword}
            >
              {showRepeatPassword ? (
                <img src={openEye} />
              ) : (
                <img src={closeEye} />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white px-4 rounded-md py-2 hover:bg-blue-600 mb-4 font-mono"
          >
            Enviar
          </button>
          {submit ? (
            <p className="text-green-500 font-mono">password changed</p>
          ) : (
            <p></p>
          )}
        </form>
      </div>
    </>
  );
};

export default RepeatPassword;
