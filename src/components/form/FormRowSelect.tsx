import React, { ChangeEvent } from 'react';
import './style.scss';

type Props = {
  name: string;
  value: string | undefined;
  labelText?: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  list: readonly any[];
};

export const FormRowSelect = ({
  name,
  value,
  labelText,
  handleChange,
  list,
}: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        value={value}
        onChange={handleChange}
      >
        <option value="" disabled>
          اختر {labelText || name}
        </option>

        {list.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
