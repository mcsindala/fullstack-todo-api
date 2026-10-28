// import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import ListTodos from './components/ListTodos';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

const API_URL = 'http://localhost:5000/api/todo-api/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const getTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = await res.data;
      console.log('Response: ', data);
      setTodos(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="min-h-screen bg-gray-800 mx-auto flex justify-center items-center p-8">
      <div className="bg-white p-5 flex flex-col gap-5 rounded-lg">
        <h1 className="font-bold text-3xl text-gray-700">TODO API</h1>
        {/* <Divider flexItem className="w-full" /> */}
        <AddTodo getTodos={getTodos} />
        <ListTodos
          todos={todos}
          setTodos={setTodos}
          showSnackbar={showSnackbar}
        />
      </div>
      {/* MUI Notification Popup */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
