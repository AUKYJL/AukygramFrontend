"use client";

import { Button } from "antd";
import { useForm } from "react-hook-form";

import styles from "./registerPage.module.scss";
import { authService } from "@/app/services/authService";
import { useAuth } from "@/app/shared/hooks/useAuth";
import { FormInput } from "@/app/shared/ui/formInput/formInput";

type formInputs = {
  name: string;
  tagName: string;
  phone: string;
  email: string;
  password: string;
  repeatedPassword: string;
};
export const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<formInputs>({ mode: "onChange" });
  const { onSubmit, formError } = useAuth<formInputs>(authService.register);

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, "");
    setValue("phone", formattedValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormInput<formInputs>
        title="Name"
        name="name"
        control={control}
        errors={errors}
        placeholder="nickname (will show for other users)"
        rules={{ required: "Name is required" }}
      />
      <FormInput<formInputs>
        title="Tag name"
        name="tagName"
        control={control}
        errors={errors}
        placeholder="tag name (unique name)"
        rules={{ required: "Tag name is required" }}
      />
      <FormInput<formInputs>
        title="Phone"
        name="phone"
        control={control}
        errors={errors}
        placeholder="Enter phone"
        rules={{ required: "Phone is required" }}
        onChange={onChangePhone}
      />
      <FormInput<formInputs>
        title="Email"
        name="email"
        control={control}
        errors={errors}
        placeholder="Enter email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
      />
      <FormInput<formInputs>
        title="Password"
        name="password"
        control={control}
        errors={errors}
        placeholder="Enter password"
        rules={{ required: "password is required" }}
        type="password"
      />
      <FormInput<formInputs>
        title="Repeated password"
        name="repeatedPassword"
        control={control}
        errors={errors}
        placeholder="Repeat passowrd"
        rules={{
          validate: () => {
            return watch("password") === watch("repeatedPassword")
              ? true
              : "Passwords do not match";
          },
        }}
        type="password"
      />
      {formError && (
        <ul className={styles.formError}>
          {formError.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
      <Button htmlType="submit" type="primary" disabled={!isValid}>
        Sign up
      </Button>
    </form>
  );
};
export default RegisterPage;
