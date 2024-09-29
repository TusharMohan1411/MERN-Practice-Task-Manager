import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { CreateTask, deleteTaskById, GetAllTasks, UpdateTaskById } from "./api";
import { notify } from "../utilities/util";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = () => {
    if (updateTask && task) {
      console.log('update api call');
      const obj = {
        taskName: task,
        isDone: updateTask.isDone,
        _id: updateTask._id
      }
      handleUpdateItem(obj)
      setUpdateTask(null)
    } else if (updateTask === null && task) {
      handleAddTask();
    }
  };

  useEffect(() => {
    if (updateTask) {
      setTask(updateTask.taskName);
    }
  }, [updateTask]);

  async function handleAddTask() {
    const obj = {
      taskName: task,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setTask("");
      fetchAllTasks();
    } catch (error) {
      notify("failed to create task", "error");
    }
  }

  async function fetchAllTasks() {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllTasks();
  }, []);

  async function handleDeleteTask(id) {
    try {
      const { success, message } = await deleteTaskById(id);

      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (error) {
      notify("failed to delete task", "error");
    }
  }

  async function handleCompleteTask(item) {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };

    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setTask("");
      fetchAllTasks();
    } catch (error) {
      notify("failed to create task", "error");
    }
  }

  const handleUpdateItem = async (item) => {
    const { _id, isDone, taskName } = item;

    const obj = {
      taskName,
      isDone,
    };

    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setTask("");
      fetchAllTasks();
    } catch (error) {
      notify("failed to create task", "error");
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter(task => task.taskName.toLowerCase().includes(term))
    setTasks(results)
  }

  return (
    <div className="w-screen mt-10 bg-black h-full">
      <div className="w-[80%] flex gap-4 mx-auto h-full flex-col items-center">
        <h1 className="font-bold text-cyan-400"> Task Manager MERN Stack</h1>
        <div className="w-[90%] px-6 border border-black h-[400px] py-4 bg-">
          <div className="w-full flex md:flex-row text-xl flex-col gap-2 justify-center">
            <div className="flex">
              <input
                className="border bg-black text-white border-cyan-400 px-4 py-2"
                type="text"
                name="addTodo"
                placeholder="Add Tasks"
                id="addTodo"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button onClick={handleTask} className="bg-black text-white">
                <IoIosAddCircle />
              </button>
            </div>

            <div className="flex">
              <input
                className="border bg-black focus: text-white border-cyan-400 px-4 py-2"
                type="text"
                placeholder="Search Tasks"
                name="todoSearch"
                id="todoSearch"
                onChange={handleSearch}
              />
              <button className="bg-black text-white">
                <IoSearch />
              </button>
            </div>
          </div>
          <div className="mt-5 w-[87%] mx-auto">
            {tasks.map((item) => (
              <div
                key={item._id}
                className="border-green-400 border gap-4 px-3 py-2 text-white flex justify-between items-center text-xl"
              >
                <p className={item.isDone ? "text-red-500" : "text-white"}>
                  {item.taskName}
                </p>
                <div className="flex gap-2 ">
                  <span
                    className="text-green-500 hover:scale-110 duration-200"
                    onClick={() => handleCompleteTask(item)}
                  >
                    <FaCheck />
                  </span>
                  <span
                    onClick={() => setUpdateTask(item)}
                    className="text-red-500 hover:scale-110 duration-200 px-3"
                  >
                    <ImCross />
                  </span>
                  <span
                    className="text-yellow-500 hover:scale-110 duration-200"
                    onClick={() => handleDeleteTask(item._id)}
                  >
                    <MdDelete />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
