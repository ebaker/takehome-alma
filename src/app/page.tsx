import styles from "./page.module.css";
import Logo from "./components/Logo";

const Header = () => (
  <div className={styles.header}>
    <div className={styles.headerLogo}>
      <Logo />
    </div>
    <div className={styles.headerText}>
      <div>Get An Assessment</div>
      <div>Of Your Immigratin Case</div>
    </div>
  </div>
);

const Subheader = () => (
  <div className={styles.subheader}>
    <img src="/info.png" />
    <h2>Want to understand your visa options?</h2>
    <div>
      Submit the form below and our team of experienced attorneys will review
      your information and send a preliminary assessment of your case based oon
      your goals.
    </div>
  </div>
);

export default function Home() {
  return (
    <div>
      <Header />
      <Subheader />
    </div>
  );
}
