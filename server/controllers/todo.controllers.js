import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({
        message: "Title and description are required",
      });
    }
    const todo = new Todo({ title, description });
    todo.save();
    return res.status(201).json({
      message: "Todo created successfully",
      todo,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create todo",
      });
  }
};
// get the todos list
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      todos,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//update a todo
export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true }
    );
    await todo.save();

    return res.status(200).json({
      message: "Todo updated successfully",
      todo,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todo = await Todo.findByIdAndDelete(todoId);

    return res.status(200).json({
      message: "Todo deleted successfully",
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
