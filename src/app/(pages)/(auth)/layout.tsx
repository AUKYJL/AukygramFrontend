"use client";

import Link from "antd/es/typography/Link";
import { usePathname } from "next/navigation";

import { Logo } from "../../components/logo/logo";

import styles from "./authLayout.module.scss";

export const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isLogin = usePathname() === "/login";
  return (
    <main className={styles.main}>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}>
        <Logo className={styles.logo} />
        <div className={styles.middleBlock}>
          <div className={styles.topText}>
            <h1 className={styles.title}>
              {isLogin ? "Welcome Back" : "Welcome"}
            </h1>
            <p className={styles.desc}>
              {isLogin
                ? "Enter your data to access your account"
                : "Enter your data to sign up"}
            </p>
          </div>
          {children}
        </div>

        <div className={styles.bottomText}>
          {isLogin ? (
            <>
              Dont have an account? <Link href={"/register"}>Sign up</Link>
            </>
          ) : (
            <>
              Already have an account? <Link href={"/login"}>Sign in</Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
export default AuthLayout;
