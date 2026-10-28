import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from '../controllers/todoController.js';

const router = Router();

// Base url => 'http://localhost:5000/api/todo-api/todos'

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/create-new', createTodo);
router.put('/update/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
