import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import axios from 'axios';

const AddTodo = ({ getTodos }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Description is required'); // Prevent adding empty todos
      return;
    }
    try {
      setError(''); // Clear any prev errors before sending
      await axios.post('http://localhost:5000/api/todo-api/todos/create-new', {
        description,
        completed: false,
      });

      setDescription('');
      getTodos();
    } catch (err) {
      console.error(err.message);
      setError('Failed to add todo. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-5">
      <TextField
        variant="outlined"
        size="small"
        label="New Task"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (error) setError('');
        }}
        error={Boolean(error)}
        helperText={error}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disableElevation
        startIcon={<AddIcon />}
      >
        Add Task
      </Button>
    </form>
  );
};

export default AddTodo;
