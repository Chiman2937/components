import { forwardRef } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { useFormField } from './FormField';

// interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { name } = useFormField();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;
  const { ref: registerRef, ...registerProps } = register(name);

  return (
    <input
      aria-invalid={!!error}
      id={name}
      className=''
      aria-describedby={error ? `${name}-error` : undefined}
      {...registerProps}
      {...props}
      ref={(e) => {
        registerRef(e);
        if (typeof ref === 'function') {
          ref(e);
        } else if (ref) {
          ref.current = e;
        }
      }}
    />
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
