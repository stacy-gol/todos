import classes from './checkbox.module.css';

interface CheckboxProps {
  isChecked: boolean;
  onClick: () => void;
}

const Checkbox = ({ isChecked, onClick }: CheckboxProps) => {
  const handleChange = () => {
    onClick();
  };

  return (
    <div className={classes.checkbox}>
      <input
        className={classes.icon}
        checked={isChecked}
        onChange={handleChange}
        type="checkbox"
      />
    </div>
  );
};

export default Checkbox;
