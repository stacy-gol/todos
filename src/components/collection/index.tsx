import Todo from '../todo';
import { Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TodoItem } from '../app';

interface CollectionProps {
  todos: TodoItem[];
  addTodo: () => void;
  deleteTodo: (id: number) => void;
  onUpdate: (updatedTodo: TodoItem) => void;
}

const Collection = ({ todos, addTodo, deleteTodo, onUpdate }: CollectionProps) => {
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {todos.map((todo) => (
        <Grid key={todo.id}>
          <Todo
            todo={todo}
            deleteTodo={() => deleteTodo(todo.id)}
            onUpdate={onUpdate}
          />
        </Grid>
      ))}

      <Grid>
        <Fab color="primary" onClick={addTodo} aria-label="add">
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default Collection;
