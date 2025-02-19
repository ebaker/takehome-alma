import styles from "./Section.module.css";
import { ReactNode } from "react";

const Section = ({
  title,
  imageUrl,
  children,
}: {
  title: string;
  imageUrl: string;
  children: ReactNode;
}) => (
  <div className={styles.subheader}>
    <img src={imageUrl} />
    <h2>{title}</h2>
    {children && <div>{children}</div>}
  </div>
);

export default Section;
