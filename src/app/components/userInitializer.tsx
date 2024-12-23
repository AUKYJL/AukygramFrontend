"use client";

import { useEffect } from "react";

import { USER } from "../shared/consts/consts";

import { useUserStore } from "@/app/store/userStore";

export const UserInitializer = () => {
  const userStore = useUserStore();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem(USER) || "{}");
    userStore.setId(localStorageUser.id || null);
    userStore.setTagName(localStorageUser.tagName || "");
  }, []);

  return null;
};
