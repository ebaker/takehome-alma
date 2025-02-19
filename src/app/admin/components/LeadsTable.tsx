"use client";
import { useState } from "react";

type LeadStatusFilter = "ALL" | "PENDING" | "REACHED_OUT";
type SortField = "fullName" | "submittedAt" | "status" | "country";
type SortDirection = -1 | 1;
import styles from "./LeadsTable.module.css";

const leadsData = [
  {
    id: 1,
    fullName: "Sarah Chen Wilson",
    submittedAt: 1708327425000, // 2025-02-19T08:23:45Z
    status: "PENDING",
    country: "Singapore",
  },
  {
    id: 2,
    fullName: "James Rodriguez",
    submittedAt: 1708289732000, // 2025-02-18T21:15:32Z
    status: "REACHED_OUT",
    country: "Mexico",
  },
  {
    id: 3,
    fullName: "Emily Thompson",
    submittedAt: 1708283112000, // 2025-02-18T19:45:12Z
    status: "PENDING",
    country: "United Kingdom",
  },
  {
    id: 4,
    fullName: "Mohammed Al-Rashid",
    submittedAt: 1708272800000, // 2025-02-18T16:33:20Z
    status: "REACHED_OUT",
    country: "United Arab Emirates",
  },
  {
    id: 5,
    fullName: "Sofia Andersson",
    submittedAt: 1708265538000, // 2025-02-18T14:22:18Z
    status: "PENDING",
    country: "Sweden",
  },
  {
    id: 6,
    fullName: "Lucas da Silva",
    submittedAt: 1708257945000, // 2025-02-18T12:05:45Z
    status: "REACHED_OUT",
    country: "Brazil",
  },
  {
    id: 7,
    fullName: "Marie Dupont",
    submittedAt: 1708247843000, // 2025-02-18T09:17:23Z
    status: "PENDING",
    country: "France",
  },
  {
    id: 8,
    fullName: "Yuki Tanaka",
    submittedAt: 1708238531000, // 2025-02-18T06:42:11Z
    status: "REACHED_OUT",
    country: "Japan",
  },
];

export default function SubmissionsTable() {
  const [data, setData] = useState(leadsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatusFilter>("ALL");
  const [sortField, setSortField] = useState<SortField>("submittedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>(-1);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((sortDirection * -1) as SortDirection);
    } else {
      setSortField(field);
      setSortDirection(1);
    }
  };

  const getSortedData = (data) => {
    return [...data].sort((a, b) => {
      switch (sortField) {
        case "fullName":
          return sortDirection * a.fullName.localeCompare(b.fullName);
        case "submittedAt":
          return sortDirection * (a.submittedAt - b.submittedAt);
        case "status":
          return sortDirection * a.status.localeCompare(b.status);
        case "country":
          return sortDirection * a.country.localeCompare(b.country);
        default:
          return 0;
      }
    });
  };

  const filteredData = getSortedData(
    data.filter((submission) => {
      const matchesSearch = submission.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || submission.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleMarkReachedOut = (id: number) =>
    setData((prev) =>
      prev.map((submission) =>
        submission.id === id
          ? { ...submission, status: "REACHED_OUT" }
          : submission
      )
    );

  return (
    <div>
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as LeadStatusFilter)}
          className={styles.statusSelect}
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="REACHED_OUT">Reached Out</option>
        </select>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("fullName")}>
              Full Name
              <span
                className={`${styles.sortIcon} ${
                  sortField === "fullName" && sortDirection === 1
                    ? styles.asc
                    : ""
                }`}
              />
            </th>
            <th onClick={() => handleSort("submittedAt")}>
              Submitted
              <span
                className={`${styles.sortIcon} ${
                  sortField === "submittedAt" && sortDirection === 1
                    ? styles.asc
                    : ""
                }`}
              />
            </th>
            <th onClick={() => handleSort("status")}>
              Status
              <span
                className={`${styles.sortIcon} ${
                  sortField === "status" && sortDirection === 1
                    ? styles.asc
                    : ""
                }`}
              />
            </th>
            <th onClick={() => handleSort("country")}>
              Country
              <span
                className={`${styles.sortIcon} ${
                  sortField === "country" && sortDirection === 1
                    ? styles.asc
                    : ""
                }`}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.fullName}</td>
              <td>{formatDate(submission.submittedAt)}</td>
              <td>
                <span
                  className={`${styles.status} ${styles[submission.status]}`}
                >
                  {submission.status === "REACHED_OUT"
                    ? "Reached Out"
                    : "Pending"}
                </span>
              </td>
              <td>{submission.country}</td>
              <td>
                <button
                  onClick={() => handleMarkReachedOut(submission.id)}
                  style={{
                    visibility: `${
                      submission.status === "PENDING" ? "visible" : "hidden"
                    }`,
                  }}
                >
                  Mark Reached Out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
