import { TodoItem } from '../types';

const STORAGE_KEY = 'todos';

export const getTodos = async (): Promise<TodoItem[]> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }

  return [];
};

export const saveTodos = (todos: TodoItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const addTodo = async (newTodo: TodoItem): Promise<TodoItem[]> => {
  const todos = await getTodos();
  const updated = [...todos, newTodo];
  saveTodos(updated);
  return updated;
};

export const deleteTodo = async (id: number): Promise<TodoItem[]> => {
  const todos = await getTodos();
  const updated = todos.filter(todo => todo.id !== id);
  saveTodos(updated);
  return updated;
};

export const updateTodo = async (updatedTodo: TodoItem): Promise<TodoItem[]> => {
  const todos = await getTodos();
  const updated = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
  saveTodos(updated);
  return updated;
};
