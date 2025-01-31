import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

import styles from "./logo.module.scss";

interface Props {
  className?: string;
}

export const Logo: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(styles.logo, className)}>
      <Image
        className={styles.default}
        src="/img/logo.svg"
        width={100}
        height={15}
        alt="AUKYGRAM logo"
      />
      <Image
        className={styles.mini}
        src="/img/mini-logo.svg"
        width={28}
        height={15}
        alt="AUKYGRAM logo"
      />
    </div>
  );
};
