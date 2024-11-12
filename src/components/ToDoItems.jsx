import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";

export const ToDoItems = ({
  text,
  id,
  isComplete,
  deleteToDo,
  completeToDo,
  editToDo,
}) => {
  return (
    <div className="flex items-center my-3 gap-2 ">
      <div
        onClick={() => {
          completeToDo(id);
        }}
        className="flex flex-1 items-center cursor-pointer overflow-auto"
      >
        <img
          src={isComplete ? tick : not_tick}
          alt="tick icon"
          className="w-7"
        />

        <p
          className={`tex-slate-700 ml-4 text-[17px] decoration-slate-700 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>

      <div className=" flex gap-1.5 mr-6 w-5 cursor-pointer">
        <img
          onClick={() => {
            editToDo(id);
          }}
          src={edit_icon}
          alt="edit icon"
        />
        <img
          onClick={() => {
            deleteToDo(id);
          }}
          src={delete_icon}
          alt="delete icon"
        />
      </div>
    </div>
  );
};
