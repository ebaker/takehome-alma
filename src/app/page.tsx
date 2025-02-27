import styles from "./page.module.css";
import Logo from "./components/Logo";
import LeadForm from "./components/LeadForm";

const Header = () => (
  <div className={styles.headerWrapper}>
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <Logo />
      </div>
      <div className={styles.headerText}>
        <div>Get An Assessment</div>
        <div>Of Your Immigratin Case</div>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div>
      <Header />
      <LeadForm />
    </div>
  );
}
