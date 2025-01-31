import clsx from "clsx";
import { FC, useState } from "react";

import styles from "./menu.module.scss";

interface Props {
  className?: string;
  onClick: () => void;
}

export const Menu: FC<Props> = ({ className, onClick }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className={clsx(styles.menu, className, active && styles._active)}
      onClick={() => {
        setActive(!active);
        onClick();
      }}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
