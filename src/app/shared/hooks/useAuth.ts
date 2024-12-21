import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

import { ACCESS_TOKEN, USER } from "../consts/consts";

export const useAuth = <T>(authFn: (data: T) => Promise<AxiosResponse>) => {
  const [formError, setFormError] = useState<string[]>([]);
  const onSubmit = (data: T) => {
    mutate(data);
  };

  const { mutate } = useMutation({
    mutationFn: authFn,
    onSuccess: (res: {
      data: { accessToken: string; id: number; tagName: string };
    }) => {
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      localStorage.setItem(
        USER,
        JSON.stringify({ id: res.data.id, tagName: res.data.tagName }),
      );
      window.location.href = "/";
    },
    onError: (err: any) => {
      const message = err.response.data.message;

      setFormError(Array.isArray(message) ? [...message] : [message]);
    },
  });
  return { formError, onSubmit };
};
