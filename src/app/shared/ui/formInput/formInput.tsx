import { Input } from "antd";
import clsx from "clsx";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

import styles from "./formInput.module.scss";

type Props<T extends FieldValues> = {
  className?: string;
  title: string;
  name: Path<T>;
  control: Control<T>;
  rules?: object;
  placeholder?: string;
  errors?: Partial<Record<keyof T, { message?: string }>>;
  type?: "text" | "password";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = <T extends FieldValues>({
  className,
  title,
  name,
  control,
  rules,
  placeholder,
  errors,
  type = "text",
  onChange,
}: Props<T>) => {
  const onChangeFn = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    field.onChange(e);
    if (onChange) onChange(e);
  };
  return (
    <div className={clsx(className, styles.field)}>
      <h5>{title}</h5>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            {type === "password" ? (
              <Input.Password
                {...field}
                placeholder={placeholder}
                status={errors && errors[name] ? "error" : undefined}
                onChange={(e) => onChangeFn(e, field)}
              />
            ) : (
              <Input
                {...field}
                placeholder={placeholder}
                status={errors && errors[name] ? "error" : undefined}
                onChange={(e) => onChangeFn(e, field)}
              />
            )}
            {errors && errors[name] && (
              <span className={styles.error}>
                {errors[name]?.message?.toString()}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};
