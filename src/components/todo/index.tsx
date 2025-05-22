import classes from './todo.module.css';
import Checkbox from '../checkbox';
import CrossButton from '../crossButton';
import SaveButton from '../saveButton';
import { useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface TodoItem {
  id: number;
  title: string;
  text: string;
  isDone: boolean;
}

interface TodoProps {
  todo: TodoItem;
  deleteTodo: () => void;
  onUpdate: (updated: TodoItem) => void;
}

const Todo = ({ todo, deleteTodo, onUpdate }: TodoProps) => {
  const { id, title, text, isDone } = todo;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editHeading, setEditHeading] = useState<string>(title);
  const [editText, setEditText] = useState<string>(text);

  const handleHeadingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditHeading(e.target.value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleSave = () => {
    onUpdate({ id, title: editHeading, text: editText, isDone });
    setIsEditing(false);
  };

  const handleCrossClick = () => {
    if (!isEditing) {
      deleteTodo();
    } else {
      setIsEditing(false);
      setEditHeading(title);
      setEditText(text);
    }
  };

  const handleCheckboxClick = () => {
    onUpdate({ ...todo, isDone: !isDone });
  };

  return (
    <div className={classes.todo}>
      {!isEditing ? (
        <>
          <div className={classes.cardTitle}>
            <Checkbox isChecked={isDone} onClick={handleCheckboxClick} />
            <p className={classes.title} onClick={() => setIsEditing(true)}>
              {title}
            </p>
            <CrossButton onClick={handleCrossClick} />
          </div>
          <div className={classes.cardText}>
            <p onClick={() => setIsEditing(true)} className={classes.text}>
              {text}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={classes.cardTitle}>
            <SaveButton saveButton={handleSave} />
            <TextField
              className={classes.headingOnEdit}
              value={editHeading}
              onChange={handleHeadingChange}
            />
            <CrossButton onClick={handleCrossClick} />
          </div>
          <div className={classes.cardText}>
            <TextField multiline value={editText} onChange={handleTextChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
