"use client";

import { Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdDashboard, MdGroups } from "react-icons/md";

import { Logo } from "../../logo";
import { UserProfile } from "../../userProfile";
import { IMainSideBarLink } from "../model/link.interface";

import styles from "./mainSideBar.module.scss";
import { Menu } from "./menu/menu";

interface Props {
  className?: string;
}
interface Link {
  title: string;
  href: string;
}
export const MainSideBar: FC<Props> = ({ className }) => {
  const router = usePathname();
  const links: IMainSideBarLink[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <MdDashboard />,
    },
    { title: "Messages", href: "/messages", icon: <IoChatbubblesOutline /> },
    { title: "Groups", href: "/groups", icon: <MdGroups /> },
  ];
  const [active, setActive] = useState(false);
  return (
    <aside
      className={clsx(className, styles.sideBar, active && styles._active)}
    >
      <Logo className={styles.logo} />

      <ul className={styles.list}>
        <Menu
          className={styles.menu}
          onClick={() => {
            setActive(!active);
          }}
        />
        {links.map((link) => (
          <li key={link.href}>
            <Tooltip
              className={clsx(
                styles.listItem,
                router.startsWith(link.href) && styles._active,
              )}
              mouseEnterDelay={0.7}
              arrow={false}
              placement="top"
              title={link.title}
            >
              <div className={styles.left}>
                {link.icon}
                <Link href={link.href}>{link.title}</Link>
              </div>
              <div className={styles.notification}>999+</div>
            </Tooltip>
          </li>
        ))}
      </ul>
      <UserProfile className={styles.userProfile} />
    </aside>
  );
};
