import { useCallback, useState } from 'react';

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const input = event.target;
    const name = input.name;
    const value = input.value;
    const namePattern = /^[A-Za-zА-Яа-яЁё /s -]+$/;
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());

    if (name === 'name') {
      if (namePattern.test(value)) {
        setErrors({ ...errors, [name]: input.validationMessage });
      } else if (!value) {
        setErrors({ ...errors, [name]: input.validationMessage });
      } else {
        setErrors({
          ...errors,
          [name]: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис',
        });
      }
    }

    if (name === 'email') {
      if (emailPattern.test(value)) {
        setErrors({ ...errors, [name]: input.validationMessage });
      } else if (!value) {
        setErrors({ ...errors, [name]: input.validationMessage });
      } else {
        setErrors({
          ...errors,
          [name]: 'Адрес почты введён некорректно',
        });
      }
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}

export default useFormWithValidation;
