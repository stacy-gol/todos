import { render, screen, fireEvent } from '@testing-library/react';
import Collection from './index';

const mockTodos = [
  { id: 1, title: 'Todo 1', text: 'Text 1', isDone: false },
  { id: 2, title: 'Todo 2', text: 'Text 2', isDone: true },
];

describe('Collection', () => {
  it('renders all todos', () => {
    render(
      <Collection
        todos={mockTodos}
        addTodo={jest.fn()}
        deleteTodo={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('calls addTodo when the add button is clicked', () => {
    const addMock = jest.fn();

    render(
      <Collection
        todos={[]}
        addTodo={addMock}
        deleteTodo={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    expect(addMock).toHaveBeenCalled();
  });
});
