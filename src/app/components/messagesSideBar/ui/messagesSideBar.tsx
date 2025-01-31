"use client";

import clsx from "clsx";
import React from "react";

import { ChatBlockList } from "../../chatBlockList";

import styles from "./messagesSideBar.module.scss";

interface Props {
  className?: string;
}

export const MessagesSideBar: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx(className, styles.sideBar)}>
      <h2 className={styles.title}>Messages</h2>
      <ChatBlockList />
    </div>
  );
};
