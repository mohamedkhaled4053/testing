import React from 'react';
import './style.scss';
import { Select } from 'antd';
import { ICourse, Ivideo } from '../../types/types';

type Props = {
  name: string;
  labelText?: string;
  handleChange: (val: string[]) => void;
  list: ICourse[] | Ivideo[];
  defaultValue?: string[];
  single?: boolean;
};

export const FormRowArray = ({
  name,
  labelText,
  handleChange,
  list,
  defaultValue,
  single,
}: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <Select
        mode={single ? undefined : 'multiple'}
        showSearch
        id={name}
        className="form-select"
        onChange={handleChange}
        placeholder={labelText}
        value={defaultValue}
        filterOption={(input, option) =>
          option?.children
            ?.toString()
            .toLocaleLowerCase()
            .indexOf(input.toLowerCase())! >= 0
        }
      >
        {list.map((option) => (
          <Select.Option key={option._id} value={option._id}>
            {option.title}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
