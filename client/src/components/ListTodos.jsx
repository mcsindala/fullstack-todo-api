import { useState } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const API_URL = 'http://localhost:5000/api/todo-api/todos';

const ListTodos = ({ todos, setTodos, showSnackbar }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState();

  const handleToggleComplete = async (todo) => {
    try {
      const updatedStatus = !todo.completed;
      const res = await axios.put(`${API_URL}/update/${todo.id}`, {
        description: todo.description,
        completed: updatedStatus,
      });

      // Update state locally
      setTodos((prev) =>
        prev.map((item) => (item.id === todo.id ? res.data : item))
      );

      showSnackbar(
        updatedStatus ? 'Task marked as completed!' : 'Task marked as active'
      );
    } catch (err) {
      console.error(err.message);
      showSnackbar('Error updating task status', 'error');
    }
  };

  // const handleEdit = async () => {};

  const handleStartEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.description);
  };

  const handleSaveEdit = async (id, isCompleted) => {
    if (!editText.trim()) return;

    try {
      const res = await axios.put(`${API_URL}/update/${id}`, {
        description: editText,
        completed: isCompleted,
      });

      setTodos((prev) =>
        prev.map((item) => (item.id === id ? res.data : item))
      );

      setEditId(null);
      showSnackbar('Task updated successfully!');
    } catch (err) {
      console.error(err.message);
      showSnackbar('Failed to save task update', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((item) => item.id !== id));
      showSnackbar('Task deleted successfully!');
    } catch (err) {
      console.error(err.message);
      showSnackbar('Failed to delete task', 'error');
    }
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p>No Tasks available. Add a new task</p>
      ) : (
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <div
              className="border flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-slate-100 transition"
              key={todo.id}
            >
              {/* <IconButton color="success">
                <Checkbox />
              </IconButton>
              <p>{todo.description}</p>
              <IconButton>
                <EditIcon color="success" fontSize="small" />
              </IconButton>
              <IconButton>
                <DeleteIcon color="error" fontSize="small" />
              </IconButton> */}

              {editId === todo.id ? (
                <div className="flex items-center gap-2 w-full">
                  <TextField
                    size="small"
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                  <IconButton
                    color="success"
                    onClick={() => handleSaveEdit(todo.id, todo.completed)}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="default" onClick={() => setEditId(null)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon color="primary" />}
                      checked={Boolean(todo.completed)}
                      onChange={() => handleToggleComplete(todo)}
                    />
                    <span
                      className={`text-slate-700 font-medium ${
                        todo.completed ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {todo.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => handleStartEdit(todo)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTodos;
