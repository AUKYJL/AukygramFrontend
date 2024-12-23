"use client";

import { USER } from "../consts/consts";

import { useUserStore } from "@/app/store/userStore";

export const useUser = () => {
  const userStore = useUserStore();

  const init = () => {
    const localStorageUser = JSON.parse(localStorage.getItem(USER) || "{}");
    userStore.setId(localStorageUser.id || null);
    userStore.setTagName(localStorageUser.tagName);
  };
  return { init };
};
