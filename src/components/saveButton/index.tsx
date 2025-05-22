import classes from './saveButton.module.css';

interface SaveButtonProps {
  saveButton: () => void;
}

const SaveButton = ({ saveButton }: SaveButtonProps) => {
  return (
    <div className={classes.card}>
      <button className={classes.saveButton} onClick={saveButton} aria-label="save" />
    </div>
  );
};

export default SaveButton;
