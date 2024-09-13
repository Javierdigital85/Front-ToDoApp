import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { taskPropType, onDeletePropType } from "./TaskItemPropTypes";

const TaskItem = ({ task, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/delete/${taskId}`
      );
      onDelete(task.id);
      toast.success("You have deleted a task!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-5 bg-slate-700 p-5 flex flex-col md:flex-row justify-between items-start md:items-center rounded-md">
      <div>
        <h2 className="text-white">Title: {task.title}</h2>
        <p className="text-gray-400">Description: {task.description}</p>
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
  );
};

TaskItem.propTypes = {
  task: taskPropType.isRequired,
  onDelete: onDeletePropType.isRequired,
};

export default TaskItem;
