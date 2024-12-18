import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { IUser } from "../../types/types";

import styles from "./messageSender.module.scss";

interface Props {
  sender: IUser;
  isOwn: boolean;
}

export const MessageSender: React.FC<Props> = ({ sender, isOwn }) => {
  return (
    <>
      <p className={clsx(styles.name, isOwn && styles.own)}>{sender.name}</p>

      <Image
        className={clsx(styles.img, isOwn && styles.own)}
        src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
        width={50}
        height={50}
        alt="avatar"
      />
    </>
  );
};
