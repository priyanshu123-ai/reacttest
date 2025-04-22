import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Des = () => {
  const [tasks, setTasks] = useState([]);

  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const desc = e.target.desc.value;

    const newTask = {
      id: Date.now(),
      title,
      desc,
      done: false,
      edit: false,
    };
    if (!title || !desc) {
      notify("Task not added");
      return;
    }

    setTasks([newTask, ...tasks]);
    e.target.reset();
    notify("Task added successfully!");
  };

  const updateTask = (id, e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const desc = e.target.desc.value;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, desc, edit: false } : task
      )
    );
    notify("Task edited successfully!");
  };

  const toggle = (id, field) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, [field]: !task[field] } : task
      )
    );

    if (field === "done") {
      notify("Task  complete!");
    } else if (field === "edit") {
      notify("Edit mode enabled!");
    }
  };

  const remove = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    notify("Task deleted successfully!");
  };

  return (
    <div className="mt-10 justify-center  bg-gray-700 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">
        My Todos
      </h1>

      <form
        onSubmit={addTask}
        className="bg-zinc-800 p-4 rounded w-full max-w-2xl mb-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <input
            name="title"
            placeholder="Add title?"
            className="flex-1 px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700 text-[20px]"
          />
          <input
            name="desc"
            placeholder="Add description?"
            className="flex-1 px-3 py-2 rounded bg-zinc-900 text-white border border-zinc-700  text-[20px]"
          />
          <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded text-xl">
            Add
          </button>
        </div>
      </form>

      <div className="w-full max-w-2xl space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-zinc-900 p-4 rounded">
            {task.edit ? (
              <form
                onSubmit={(e) => updateTask(task.id, e)}
                className="space-y-2"
              >
                <input
                  name="title"
                  defaultValue={task.title}
                  className="w-full px-3 py-1 rounded bg-zinc-800 text-white border border-zinc-700 text-2xl"
                />
                <input
                  name="desc"
                  defaultValue={task.desc}
                  className="w-full px-3 py-1 rounded bg-zinc-800 text-white border border-zinc-700 text-xl"
                />
                <button className="bg-blue-500 px-3 py-1 rounded text-black">
                  Save
                </button>
              </form>
            ) : (
              <div>
                <h2>{task.title}</h2>
                <p className="text-sm text-zinc-400">{task.desc}</p>
                {task.done && (
                  <p className="text-green-500 text-sm mt-1">Task completed!</p>
                )}
              </div>
            )}

            {!task.edit && !task.done && (
              <div className="flex gap-4 mt-3 text-sm items-center">
                <button
                  onClick={() => toggle(task.id, "edit")}
                  className="text-blue-400  flex items-center gap-1 text-[18px]"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => remove(task.id)}
                  className="text-red-400  flex items-center gap-1 text-[18px]"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={() => toggle(task.id, "done")}
                  className="text-green-400  text-[18px]"
                >
                  Complete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Des;
