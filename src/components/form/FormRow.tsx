import { ChangeEvent } from 'react';
import './style.scss';

type Props = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  value: string | undefined;
  labelText?: string;
  disabled?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FormRow = ({
  name,
  type,
  value,
  labelText,
  disabled,
  handleChange,
}: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        className="form-input"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};
