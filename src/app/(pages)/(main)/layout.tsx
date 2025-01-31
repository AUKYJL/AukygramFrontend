import styles from "./mainLayout.module.scss";
import { MainSideBar } from "@/app/components/mainSideBar";

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={styles.main}>
      <MainSideBar />
      {children}
    </main>
  );
};
export default MainLayout;
