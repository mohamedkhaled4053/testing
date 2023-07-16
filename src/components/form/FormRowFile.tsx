import { ChangeEvent } from 'react';
import './style.scss';

type Props = {
  name: string;
  labelText?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string | undefined;
};

export const FormRowFile = ({
  name,
  labelText,
  handleChange,
  imageUrl,
}: Props) => {
  return (
    <div className="form-row file">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <div className="inputs">
        <input
          id={name + 'Url'}
          name={name + 'Url'}
          type="text"
          value={imageUrl || ''}
          className="form-input"
          onChange={handleChange}
        />
        <span>أو</span>
        <input
          id={name}
          name={name}
          type="file"
          className="form-input"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
