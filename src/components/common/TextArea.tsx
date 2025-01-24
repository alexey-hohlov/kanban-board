import { useController, useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  rules?: Record<string, any>;
  className?: string;
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
}

const TextArea: React.FC<Props> = ({
  className,
  placeholder,
  rows,
  name,
  rules,
  defaultValue = '',
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
    <textarea
      className={`resize-none rounded-lg w-full py-0.5 px-2 border-2 outline-none transition-colors bg-slate-900 ${
        error
          ? ' border-rose-500 focus:border-rose-500 bg-rose-400/15'
          : 'border-transparent focus:border-blue-500 bg-slate-900'
      } ${className}`}
      placeholder={placeholder}
      rows={rows}
      {...field}
      onBlur={trimValue}
    ></textarea>
  );
};

export default TextArea;
