import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";

const TaskForm = () => {
  const user = useSelector((state) => state.user);
  const id = user.id;
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  console.log(task.description, "TASK task");
  const [originalTask, setOriginalTask] = useState({
    title: "",
    description: "",
  });
  console.log(originalTask.description, "Original task");

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const loadTask = async (id) => {
    try {
      console.log("esta entrando", id);
      const res = await axios.get(
        `http://localhost:8000/api/tasks/obtener/${id}`
      );
      console.log(res.data, "llega???");
      const data = res.data;
      console.log("esta es la data", data);
      setTask({ title: data.title, description: data.description });
      setOriginalTask({ title: data.title, description: data.description });
      setEditing(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.id) {
      loadTask(params.id); //esta seteando apenas entramos a la vista a true el editing!
      console.log(params.id);
    }
  }, [params.id]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (editing) {
      if (
        task.title === originalTask.title &&
        task.description === originalTask.description
      ) {
        // const error = error.response.data;
        toast.warning("You have to edit a task");
        setLoading(false);
        return;
        // navigate("/tasklist");
      }
      axios
        .put(`http://localhost:8000/api/tasks/${params.id}`, {
          title: task.title,
          description: task.description,
        })
        .then((res) => {
          res.data;
          console.log("lo que me devuelve el update", res.data);
        })
        .then(() => navigate("/tasklist"));
      toast.success(`You have edited task ${params.id}!`).catch((error) => {
        console.log(error, "Error en hacer la solicitud");
      });
    } else {
      axios
        .post(
          "http://localhost:8000/api/tasks/crear",
          // {
          //   params: { userId: id },
          // },
          {
            userId: id,
            title: task.title,
            description: task.description,
          }
        )
        .then((res) => {
          res.data;
          console.log(res, "sin data");
          console.log(res.data, "con el data");
        })
        .then(() => {
          setLoading(false);
          toast.success("You have created a task successfully!");
          navigate("/tasklist");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {user.id ? (
        <div className="flex flex-col items-center justify-center mt-10 w-full">
          <form
            onSubmit={handleSubmit}
            className="border-white bg-slate-800 p-5 my-10 w-2/4"
            // className="w-2/5 border-white bg-slate-800 p-2 h-full my-10"
          >
            {editing ? (
              <h3 className="font-bold text-2xl my-3 text-white">Edit Task</h3>
            ) : (
              <h3 className="font-bold text-2xl my-3 text-white">
                Create Task
              </h3>
            )}
            <label className="text-white" htmlFor="titulo">
              Title
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="titulo"
              name="title"
              value={task.title}
              placeholder="Write your title"
              className="border border-gray-400 p-2 rounded block my-2 w-full bg-gray-700 text-white"
              autoFocus
            />
            <label className="text-white" htmlFor="descripcion">
              Description
            </label>
            <textarea
              onChange={handleChange}
              name="description"
              id="descripcion"
              value={task.description}
              rows={4}
              placeholder="Write your description"
              className="boder border-gray-400 p-2 rounded-mb block my-2 w-full bg-gray-700 text-white h-72"
            ></textarea>
            <div className="flex justify-center align-middle items-center text-2xl">
              <button
                type="submit"
                disabled={!task.title || !task.description}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded w-40"
              >
                {loading ? (
                  <div className="sweet-loading flex flex-row justify-center gap-3">
                    <p>Loading...</p>
                    <ClipLoader
                      color="fff"
                      loading={loading}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : editing ? (
                  "Edit Task"
                ) : (
                  "New Task"
                )}
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded w-40 ml-5"
                onClick={() => {
                  navigate("/tasklist"),
                    toast.info("You has cancel an edition");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center align-middle items-center h-screen flex-col text-white">
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

export default TaskForm;
