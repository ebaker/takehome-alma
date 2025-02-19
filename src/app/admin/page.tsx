import styles from "./page.module.css";
import Logo from "../components/Logo";
import LeadsTable from "./components/LeadsTable";

function AdminPage() {
  const USERNAME = "Admin";
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={`${styles.navItem} ${styles.active}`}>Leads</div>
        <div className={styles.navItem}>Settings</div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>{USERNAME.charAt(0)}</div>
          <span>{USERNAME}</span>
        </div>
      </nav>
      <main className={styles.content}>
        <h2>Leads</h2>
        <LeadsTable />
      </main>
    </div>
  );
}

export default AdminPage;
