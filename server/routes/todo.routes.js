import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.controllers.js";
import isAuthenticated from "../midlleware/isAuthenticated.js";

const router = express.Router();
router.route("/").post(isAuthenticated, createTodo).get(getAllTodos);
router
  .route("/:todoId")
  .put(isAuthenticated, updateTodo)
  .delete(isAuthenticated, deleteTodo);
  // router.route("/:todoId").delete(deleteTodo);
  
  
  export default router;
  