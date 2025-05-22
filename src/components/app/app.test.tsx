import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import App from './index';
import * as todosService from '../../services/todos';

jest.mock('../../services/todos');

const mockTodos = [
  { id: 1, title: 'Todo 1', text: 'Text 1', isDone: false },
  { id: 2, title: 'Todo 2', text: 'Text 2', isDone: true },
];

const mockedTodosService = todosService as jest.Mocked<typeof todosService>;

describe('App', () => {
  beforeEach(() => {
    mockedTodosService.getTodos.mockResolvedValue(mockTodos);
    mockedTodosService.addTodo.mockImplementation((todo) =>
      Promise.resolve([...mockTodos, todo])
    );
    mockedTodosService.deleteTodo.mockResolvedValue([mockTodos[1]]);
    mockedTodosService.updateTodo.mockResolvedValue(mockTodos);
  });

  it('renders initial todos', async () => {
    render(<App />);
    expect(await screen.findByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('filters active todos', async () => {
    render(<App />);
    await screen.findByText('Todo 1');
    fireEvent.click(screen.getByRole('button', { name: /active/i }));
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    render(<App />);
    await screen.findByText('Todo 1');
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => {
      expect(mockedTodosService.addTodo).toHaveBeenCalled();
    });
  });
});
