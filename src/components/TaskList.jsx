import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { setUser } from "../redux/user";
import TaskItem from "./TaskItem";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const id = user.id;
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/obtener`, {
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

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); //logica [1,2,3,4,5].filter(x => x != 5)
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
              <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
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
          <p className=" mb-4 text-2xl text-red-700 font-mono">
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

// Otra opcion es hacer un taskItem en donde haces un map de taskItem.jsx
