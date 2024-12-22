import style from "./mainLayout.module.scss";
import { MainSideBar } from "@/app/components/mainSideBar/mainSideBar";

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={style.main}>
      <MainSideBar />
      {children}
    </main>
  );
};
export default MainLayout;
