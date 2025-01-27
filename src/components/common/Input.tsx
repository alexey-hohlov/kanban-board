import { useController, useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
  placeholder?: string;
  type?: string;
  rules?: Record<string, any>;
  name: string;
  defaultValue?: string;
  autoFocus?: boolean;
}

const Input: React.FC<Props> = ({
  className,
  placeholder,
  rules,
  name,
  type = 'text',
  defaultValue = '',
  autoFocus = false,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: rules,
    defaultValue: defaultValue,
  });

  const { setValue } = useFormContext();

  const trimValue = () => {
    field.value && setValue(name, field.value.replace(/\s+/g, ' ').trim());
  };

  return (
    <input
      className={`rounded-lg w-full py-0.5 px-2 border-2 outline-none transition-colors ${
        error
          ? ' border-rose-500 focus:border-rose-500 bg-rose-400/15'
          : 'border-transparent focus:border-blue-500 bg-slate-900'
      } ${className}`}
      type={type}
      placeholder={placeholder}
      {...field}
      onBlur={trimValue}
      autoFocus={autoFocus}
    />
  );
};

export default Input;
