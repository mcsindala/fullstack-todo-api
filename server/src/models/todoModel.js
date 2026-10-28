import db from '../config/db.js';

export const createTodoModel = async (description, completed = false) => {
  const stmt =
    'INSERT INTO todos (description, completed) VALUES ($1, $2) RETURNING *';
  const values = [description, completed];
  const result = await db.query(stmt, values);
  return result.rows[0];
};

export const getAllTodosModel = async () => {
  const stmt = 'SELECT * FROM todos';
  const result = await db.query(stmt);
  return result.rows;
};

export const updateTodoModel = async (todoId, description, completed) => {
  const stmt =
    'UPDATE todos SET description = $1, completed = $2 WHERE id = $3 RETURNING *';
  const values = [description, completed, todoId];
  const result = await db.query(stmt, values);
  return result.rows[0];
};

export const getTodoItemModel = async (todoId) => {
  const stmt = 'SELECT * FROM todos WHERE id = $1';
  const result = await db.query(stmt, [todoId]);
  return result.rows[0];
};

export const deleteTodoModel = async (todoId) => {
  const stmt = 'DELETE FROM todos WHERE id = $1 RETURNING *';
  const result = await db.query(stmt, [todoId]);
  return result.rows[0];
};
