import dotenv from 'dotenv/config';
import express from 'express';
import db from './config/db.js';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server listening on port 5000');
});

// Base url => 'http://localhost:5000/api/todo-api/todos'
app.use('/api/todo-api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on "http://localhost:${PORT}"`);
});
