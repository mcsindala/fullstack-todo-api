import {
  createTodoModel,
  deleteTodoModel,
  getAllTodosModel,
  getTodoItemModel,
  updateTodoModel,
} from '../models/todoModel.js';

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await getAllTodosModel();
    if (todos.length === 0) {
      return res.status(404).json({ message: 'No todo items found.', todos });
    }
    res.status(200).json(todos);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: 'Failed to fetch todos. Please try again later.' });
  }
};

// Get a todo item with its id
const getTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    const todo = await getTodoItemModel(todoId);
    if (!todo) {
      return res.status(404).json({ error: 'Todo item not found!' });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    res
      .status(500)
      .json({ error: 'Failed to get todo item. Please try again!' });
  }
};

// Create a new todo item
const createTodo = async (req, res) => {
  const { description, completed } = req.body;

  try {
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    const newTodo = await createTodoModel(description, completed);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong. Todo not created.' });
  }
};

// Update a todo item
const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { description, completed } = req.body;

  try {
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    const updatedTodo = await updateTodoModel(todoId, description, completed);
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo item not found.' });
    }
    res
      .status(200)
      .json({ message: 'Successfully updated todo item!', updatedTodo });
  } catch (err) {
    console.error('ERROR: ', err.message);
    res
      .status(500)
      .json({ error: 'Error updating todo item, please try again.' });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await deleteTodoModel(todoId);
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ error: 'Could not delete todo item. Please try again later!' });
    }

    res
      .status(200)
      .json({ message: 'Successfully deleted todo item', deletedTodo });
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    res
      .status(500)
      .json({ error: 'Error deleting todo item. Please try again later!' });
  }
};

export { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
