import { ChangeEvent, useState } from 'react';

export function useForm<Body>(initialState: Body) {
  let [values, setValues] = useState<Body>(initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      return setValues({ ...values, image: e.target.files?.[0] });
    }
    setValues({ ...values, [name]: value });
  }

  return { values, handleChange, setValues };
}
