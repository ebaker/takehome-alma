import styles from "./Section.module.css";
import { ReactNode } from "react";

const Section = ({
  title,
  imageUrl,
  description,
  children,
}: {
  title: string;
  imageUrl: string;
  description?: string;
  children: ReactNode;
}) => (
  <div className={styles.subheader}>
    <img src={imageUrl} />
    <h2 className={styles.title}>{title}</h2>
    {description && <div className={styles.description}>{description}</div>}
    <div style={{ maxWidth: "25rem", margin: "0 auto" }}>{children}</div>
  </div>
);

export default Section;
