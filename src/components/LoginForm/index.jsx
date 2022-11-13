import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
const INITIAL_FORM = { email: '', password: '' };
const VALIDATION = {
  email: [
    {
      validate: (value) => !!value,
      message: 'is required'
    },
    {
      validate: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'is not an email'
    }
  ],
  password: [
    {
      validate: (value) => !!value,
      message: 'is required'
    }
  ]
};

const getErrorFields = (form) => {
  return Object.keys(form).reduce((acc, key) => {
    const errorsPerField = VALIDATION[key]
      .map((validation) => {
        return {
          isValid: validation.validate(form[key]),
          message: validation.message
        };
      })
      .filter((errorPerField) => !errorPerField.isValid);
    return { ...acc, [key]: errorsPerField };
  }, {});
};
const getDirtyFields = (form) => {
  return Object.keys(form).reduce((acc, key) => {
    const isDirty = form[key] !== INITIAL_FORM[key];
    return { ...acc, [key]: isDirty };
  }, {});
};
const Form = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const { login } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    const hasError = Object.values(errorFields).flat().length;
    if (hasError) return;
    login();
  };
  const handleFormUpdate = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };
  const dirtyFields = getDirtyFields(form);
  const hasChanges = Object.values(dirtyFields).some(
    (dirtyField) => dirtyField
  );
  const errorFields = getErrorFields(form);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={form.email}
          onChange={handleFormUpdate}
        />
        {errorFields.email.length ? (
          <span style={{ color: 'red' }}> {errorFields.email[0].message}</span>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={handleFormUpdate}
        />
        {errorFields.password.length ? (
          <span style={{ color: 'red' }}>
            {errorFields.password[0].message}
          </span>
        ) : null}
      </div>
      <button type="submit" disabled={!hasChanges}>
        Sign In
      </button>
    </form>
  );
};

export default Form;
