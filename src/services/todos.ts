import { TodoItem } from '../components/app';

const STORAGE_KEY = 'todos';

// Получение задач: сначала localStorage, потом data.json
export const getTodos = async (): Promise<TodoItem[]> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved) as TodoItem[];
  }

  const response = await fetch('/data.json');
  const todos: TodoItem[] = await response.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  return todos;
};

// Сохраняет массив задач
export const saveTodos = (todos: TodoItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Добавление задачи
export const addTodo = async (newTodo: TodoItem): Promise<TodoItem[]> => {
  const todos = await getTodos();
  const updated = [...todos, newTodo];
  saveTodos(updated);
  return updated;
};

// Удаление задачи по ID
export const deleteTodo = async (id: number): Promise<TodoItem[]> => {
  const todos = await getTodos();
  const updated = todos.filter(todo => todo.id !== id);
  saveTodos(updated);
  return updated;
};

// Обновление задачи
export const updateTodo = async (updatedTodo: TodoItem): Promise<TodoItem[]> => {
  const todos = await getTodos();
  const updated = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
  saveTodos(updated);
  return updated;
};
