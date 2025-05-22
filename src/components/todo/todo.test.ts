import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './index';

const mockTodo = {
  id: 1,
  title: 'Test Task',
  text: 'This is a test',
  isDone: false,
};

describe('Todo component', () => {
  it('renders title and text', () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test/i)).toBeInTheDocument();
  });

  it('enters edit mode when title is clicked', () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/Test Task/i));
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('calls onUpdate when checkbox is clicked', () => {
    const updateMock = jest.fn();

    render(
      <Todo
        todo={mockTodo}
        deleteTodo={jest.fn()}
        onUpdate={updateMock}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(updateMock).toHaveBeenCalledWith({ ...mockTodo, isDone: true });
  });

  it('calls deleteTodo when close is clicked outside editing', () => {
    const deleteMock = jest.fn();

    render(
      <Todo
        todo={mockTodo}
        deleteTodo={deleteMock}
        onUpdate={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(deleteMock).toHaveBeenCalled();
  });
});
