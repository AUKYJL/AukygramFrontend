"use client";

import { Button, Select } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./loginPage.module.scss";
import { authService } from "@/app/services/authService";
import { LoginByOptions } from "@/app/shared/consts/consts";
import { useAuth } from "@/app/shared/hooks/useAuth";
import { FormInput } from "@/app/shared/ui/formInput";

type formInputs = {
  tagName?: string;
  phone?: string;
  email?: string;
  password: string;
};
export const LoginPage = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<formInputs>({ mode: "onChange" });
  const [loginBy, setLoginBy] = useState<LoginByOptions>(
    LoginByOptions.TAG_NAME,
  );
  const { onSubmit, formError } = useAuth<formInputs>(authService.login);

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, "");
    setValue("phone", formattedValue);
  };
  const handleSelectChange = (value: string) => {
    setLoginBy(value as LoginByOptions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Select
        defaultValue={LoginByOptions.TAG_NAME}
        onChange={handleSelectChange}
        options={Object.values(LoginByOptions).map((v) => {
          return { value: v, label: `Login with ${v}` };
        })}
      />
      {loginBy === LoginByOptions.TAG_NAME && (
        <FormInput<formInputs>
          title="Tag name"
          name="tagName"
          control={control}
          errors={errors}
          placeholder="tag name (unique name)"
        />
      )}
      {loginBy === LoginByOptions.PHONE && (
        <FormInput<formInputs>
          title="Phone"
          name="phone"
          control={control}
          errors={errors}
          placeholder="Enter phone"
          onChange={onChangePhone}
        />
      )}
      {loginBy === LoginByOptions.EMAIL && (
        <FormInput<formInputs>
          title="Email"
          name="email"
          control={control}
          errors={errors}
          placeholder="Enter email"
          rules={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
      )}

      <FormInput<formInputs>
        title="Password"
        name="password"
        control={control}
        errors={errors}
        placeholder="Enter password"
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
        Sign in
      </Button>
    </form>
  );
};
export default LoginPage;
