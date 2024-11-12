import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import { ToDoItems } from "./ToDoItems";

const ToDo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos")) // the parse converts the data from string to array
      : []
  );
  const addInputRef = useRef();
  const editInputRef = useRef();

  const add = () => {
    const inputText = addInputRef.current.value.trim(); // trim removes spaces from start/end
    if (inputText === "") return;

    const newInput = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      isEditing: false,
    };
    setTodoList((prev) => [...prev, newInput]);
    addInputRef.current.value = ""; // Clear the input after adding the task
  };

  const deleteToDo = (id) => {
    setTodoList((prevToDo) => prevToDo.filter((item) => item.id !== id));
  };

  const editToDo = (id) => {
    setTodoList((prevToDo) => {
      return prevToDo.map((item) => {
        if (item.id === id) return { ...item, isEditing: !item.isEditing };
        return item;
      });
    });
  };

  const updateToDo = (id, newText) => {
    if (newText === "") return;

    setTodoList((prevToDo) => {
      return prevToDo.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText, isEditing: false }; // Save the edited task
        }
        return item;
      });
    });
    editInputRef.current.value = ""; // Clear the input after adding the task
  };

  const completeToDo = (id) => {
    setTodoList((prevToDo) => {
      return prevToDo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-xl flex flex-col p-7 min-h-[550px] rounded-xl">
      {/*------ TITLE --------*/}
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="To-Do Icon" />
        <h1 className="text-black text-3xl font-semibold">To-Do List</h1>
      </div>

      {/*------ INPUT BOX --------*/}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={addInputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          Add
        </button>
      </div>

      {/*------ TODO ITEMS --------*/}
      <div>
        {todoList.map((item, index) =>
          item.isEditing ? (
            // Edit mode view
            <div
              key={item.id}
              className="flex items-center w-10/12 bg-gray-200 rounded-full"
            >
              <input
                ref={editInputRef}
                defaultValue={item.text}
                className="bg-transparent border-0 outline-none flex-1 h-10 w-20 pl-6 pr-2"
                type="text"
              />
              <button
                onClick={() =>
                  updateToDo(item.id, editInputRef.current.value.trim())
                }
                className="border-none rounded-full bg-green-600 h-10 w-20 text-white text-lg font-medium cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            // View mode
            <ToDoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteToDo={deleteToDo}
              completeToDo={completeToDo}
              editToDo={editToDo}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ToDo;
