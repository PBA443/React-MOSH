import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

const Form = ({
  schema,
  doSubmit,
  children,
  defaultValues = {},
  formError = null,
  setFormError = null,
  successMessage = null,
}) => {
  const [data, setData] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setData(defaultValues);
    setErrors({});
    if (setFormError) setFormError(null);
  }, [defaultValues, setFormError]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    setIsSubmitting(true);
    if (setFormError) setFormError(null);

    try {
      await doSubmit(data);
      if (successMessage) {
        toast.success(successMessage);
      }
    } catch (error) {
      if (setFormError) {
        setFormError(error.response?.data?.message || "An error occurred");
        toast.error(error.response?.data?.message || "An error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
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
      {formError && <div className="alert alert-danger">{formError}</div>}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onChange: handleChange,
            value: data[child.props.name] || "",
            error: errors[child.props.name],
            disabled: isSubmitting,
          });
        }
        return child;
      })}
    </form>
  );
};

export default Form;
