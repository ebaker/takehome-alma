import styles from "./page.module.css";
import Logo from "../components/Logo";

function AdminPage() {
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={`${styles.navItem} ${styles.active}`}>Leads</div>
        <div className={styles.navItem}>Settings</div>
      </nav>
      <main className={styles.content}>
        <h2>Leads</h2>
        <p>Main content area</p>
      </main>
    </div>
  );
}

export default AdminPage;
