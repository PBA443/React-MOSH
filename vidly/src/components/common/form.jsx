import React, { useState, useEffect } from "react";
import Joi from "joi-browser";

const Form = ({ schema, doSubmit, children, defaultValues = {} }) => {
  const [data, setData] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(defaultValues);
    setErrors({});
  }, [defaultValues]);

  const validate = () => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    if (!schema[name]) return null;
    const obj = { [name]: value };
    const fieldSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, fieldSchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    doSubmit(data);
  };

  const handleChange = ({ target: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          onChange: handleChange,
          value: data[child.props.name] || "",
          error: errors[child.props.name],
        });
      })}
    </form>
  );
};

export default Form;
