import classes from './crossButton.module.css';

interface CrossButtonProps {
  onClick: () => void;
}

const CrossButton = ({ onClick }: CrossButtonProps) => {
  return (
    <button
      className={classes.deleteButton}
      onClick={onClick}
      aria-label="close"
    />
  );
};

export default CrossButton;
