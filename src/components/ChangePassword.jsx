import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
// import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const id = user.id;
  // const { id } = useParams();
  const [formData, setFormdata] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.oldPassword !== formData.newPassword) {
      toast.warning("passwo");
      return;
    }
    axios
      .put(
        `http://localhost:8000/api/usuarios/changepassword/${id}`,
        {
          oldPassword: formData.oldPassword,
          password: formData.newPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        toast.success("You have changed the password successfully");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          className="bg-gray-300 shadow-md border p-6 w-full max-w-md rounded-lg flex flex-col"
          onSubmit={handleSubmit}
        >
          <label>Old password</label>
          <input
            value={formData.oldPassword}
            type="text"
            name="oldPassword"
            placeholder="old password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <label>New password</label>
          <input
            type="text"
            value={formData.newPassword}
            name="newPassword"
            placeholder="new password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 rounded-md py-2 hover:bg-blue-600 mb-4"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
