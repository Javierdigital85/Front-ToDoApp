import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSubmitted, sendEmailSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value, "el valor");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      console.log("please, enter a email!");
    }
    axios
      .put("http://localhost:8000/api/usuarios/forgotpassword", { email })
      .then((res) => {
        if (res.status === 200) {
          sendEmailSubmitted(true);
        }
      })
      .then(() => {
        toast.success("Email sent to your email account");
      });
  };

  return (
    <div className=" h-screen items-center flex flex-col justify-center">
      <h1 className="text-white font-mono mb-4">Please, enter your email</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 shadow-md border p-6 w-full max-w-md rounded-lg"
      >
        <label htmlFor="email" className="font-mono">
          E-mail:
        </label>
        <input
          value={email}
          type="email"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="text-white font-mono mb-4 p-2 w-full bg-blue-500 hover:bg-blue-600 rounded mt-2"
        >
          Enviar
        </button>
        {emailSubmitted ? (
          <p className="text-green-700">Email enviado</p>
        ) : (
          <p></p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
