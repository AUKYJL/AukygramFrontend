"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Logo } from "../logo/logo";
import { UserProfile } from "../userProfile/userProfile";

import style from "./mainSideBar.module.scss";

interface Props {
  className?: string;
}
interface Link {
  title: string;
  href: string;
}
export const MainSideBar: React.FC<Props> = ({ className }) => {
  const router = usePathname();
  const links: Link[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Messages", href: "/messages" },
    { title: "Groups", href: "/groups" },
  ];
  return (
    <aside className={clsx(className, style.sideBar)}>
      <Logo className={style.logo} />
      <ul className={style.list}>
        {links.map((link) => (
          <li
            key={link.href}
            className={clsx(
              style.listItem,
              router.startsWith(link.href) && style._active,
            )}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <UserProfile className={style.userProfile} />
    </aside>
  );
};
