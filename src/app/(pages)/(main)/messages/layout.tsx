import styles from "./messagesLayout.module.scss";
import { MessagesSideBar } from "@/app/components/messagesSideBar/messagesSideBar";

export const MessagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className={styles.section}>
      {children}
      <MessagesSideBar />
    </section>
  );
};
export default MessagesLayout;
