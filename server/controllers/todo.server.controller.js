import mongoose from "mongoose";
import Rx from "rxjs";
import { map } from "rxjs/operators";

//import models
import Todo from "../models/todo.server.model";

export const getTodos = (req, res) => {
  Todo.find().exec((err, todos) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }

    return res
      .json({
        success: true,
        message: "Todos fetched successfully",
        todos
      })
      .pipe(
        map(res => {
          if (res) {
            return true;
          }
          return false;
        })
      );
  });
};

export const addTodo = (req, res) => {
  console.log(req.body);
  const newTodo = new Todo(req.body);
  newTodo.save((err, todo) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }

    return res
      .json({
        success: true,
        message: "Todo added successfully",
        todo
      })
      .pipe(
        map(res => {
          if (res) {
            return true;
          }
          return false;
        })
      );
  });
};

export const updateTodo = (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.body.id },
    req.body,
    { new: true },
    (err, todo) => {
      if (err) {
        return res
          .json({ success: false, message: "Some Error", error: err })
          .pipe(
            map(res => {
              if (res) {
                return true;
              }
              return false;
            })
          );
      }
      console.log(todo);
      return res
        .json({ success: true, message: "Updated successfully", todo })
        .pipe(
          map(res => {
            if (res) {
              return true;
            }
            return false;
          })
        );
    }
  );
};

export const getTodo = (req, res) => {
  Todo.find({ _id: req.params.id }).exec((err, todo) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }
    if (todo.length) {
      return res
        .json({
          success: true,
          message: "Todo fetched by id successfully",
          todo
        })
        .pipe(
          map(res => {
            if (res) {
              return true;
            }
            return false;
          })
        );
    } else {
      return res
        .json({
          success: false,
          message: "Todo with the given id not found"
        })
        .pipe(
          map(res => {
            if (res) {
              return true;
            }
            return false;
          })
        );
    }
  });
};

export const deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) {
      return res.json({ success: false, message: "Some Error" });
    }

    return res
      .json({
        success: true,
        message: todo.todoText + " deleted successfully"
      })
      .pipe(
        map(res => {
          if (res) {
            return true;
          }
          return false;
        })
      );
  });
};
