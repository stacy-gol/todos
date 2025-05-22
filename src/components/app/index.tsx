import { useState, useEffect, FormEvent } from 'react';
import {
  Container,
  Typography,
  ButtonGroup,
  Button,
  Box,
  Paper
} from '@mui/material';

import {
  getTodos,
  addTodo as addTodoToStorage,
  deleteTodo as deleteTodoFromStorage,
  updateTodo as updateTodoInStorage
} from '../../services/todos';

import Collection from '../collection';

export interface TodoItem {
  id: number;
  title: string;
  text: string;
  isDone: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    getTodos().then((initialTodos) => setTodos(initialTodos));
  }, []);

  const addTodo = (event?: FormEvent) => {
    event?.preventDefault();
    const newTodo: TodoItem = {
      id: Date.now(),
      title: 'What needs to be done?',
      text: 'Description',
      isDone: false
    };
    addTodoToStorage(newTodo).then(setTodos);
  };
  

  const deleteTodo = (id: number) => {
    deleteTodoFromStorage(id).then(setTodos);
  };

  const updateTodo = (newTodo: TodoItem) => {
    updateTodoInStorage(newTodo).then(setTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.isDone;
    if (filter === 'completed') return todo.isDone;
    return true;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Todos
        </Typography>

        <Box display="flex" justifyContent="center" mb={3}>
          <ButtonGroup variant="outlined">
            <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'contained' : 'outlined'}
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'contained' : 'outlined'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </ButtonGroup>
        </Box>

        <Collection
          todos={filteredTodos}
          addTodo={addTodo}
          deleteTodo={deleteTodo}
          onUpdate={updateTodo}
        />
      </Paper>
    </Container>
  );
}

export default App;
