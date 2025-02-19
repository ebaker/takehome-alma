import styles from "./LeadsTable.module.css";

const data = [];

export default function SubmissionsTable() {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Submitted At</th>
          <th>Status</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((submission, index) => (
          <tr key={index}>
            <td>{submission.fullName}</td>
            <td>{formatDate(submission.submittedAt)}</td>
            <td>
              <span className={`${styles.status} ${styles[submission.status]}`}>
                {submission.status}
              </span>
            </td>
            <td>{submission.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
