import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setUser } from "../redux/user";
import { toast } from "sonner";

const TaskList = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const id = user.id;
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:8000/api/tasks/obtener", {
          params: { userId: id },
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data);
          if (Array.isArray(res.data)) {
            setTasks(res.data);
          } else {
            console.error("error");
          }
        });
    }
  }, [id]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/delete/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId)); //logica [1,2,3,4,5].filter(x => x != 5)
      toast.success("You have deleted a task!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {id ? (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold flex justify-center text-white mt-10 mb-10">
            Welcome to My TO DO APP
          </h1>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="mb-5 bg-slate-700 p-5 flex flex-col md:flex-row justify-between items-start md:items-center rounded-md"
              >
                <div>
                  <h2 className="text-white">Title: {task.title}</h2>
                  <p className="text-gray-400">
                    Description: {task.description}
                  </p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0 justify-center md:justify-end w-full md:w-auto">
                  <button
                    id="cypress-edit"
                    className="bg-orange-600 hover:bg-orange-700 w-full text-lg text-white p-2 rounded"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    id="cypress-delete"
                    className="bg-red-800 hover:bg-red-900 w-full text-lg text-white p-2 rounded"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
              <h2 className="text-white flex justify-center items-center text-2xl  h-40">
                Write a new task on New Task!
              </h2>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col text-white h-screen">
          <h1 className="font-mono text-2xl mb-4">Welcome to my TO-DO-APP</h1>
          <p className="mb-4 text-2xl text-red-700 font-mono">
            You must be registered and logged in to use the Application.
          </p>
          <button
            className="text-white  bg-blue-600 hover:bg-blue-700 p-2 rounded-md"
            onClick={() => navigate("/")}
          >
            Login here!
          </button>
        </div>
      )}
    </>
  );
};

export default TaskList;
