import { h, FunctionalComponent } from 'preact';

interface ICheckboxProps {
  label: string;
  checked: boolean;
  onChange: JSX.GenericEventHandler;
}

const Checkbox: FunctionalComponent<ICheckboxProps> = (props: ICheckboxProps) => (
  <label className="option-label">
    <input
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
    />
    {props.label}
  </label>
);

export default Checkbox;
