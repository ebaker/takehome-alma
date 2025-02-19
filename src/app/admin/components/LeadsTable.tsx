"use client";
import { useState } from "react";
import { leadsData } from "./mockLeadsData";

type LeadStatusFilter = "ALL" | "PENDING" | "REACHED_OUT";
type SortField = "fullName" | "submittedAt" | "status" | "country";
type SortDirection = -1 | 1;

const ITEMS_PER_PAGE = 8;

import styles from "./LeadsTable.module.css";

export default function SubmissionsTable() {
  const [data, setData] = useState(leadsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatusFilter>("ALL");
  const [sortField, setSortField] = useState<SortField>("submittedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
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

  const filteredAndSortedData = getSortedData(
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
          {filteredAndSortedData
            .slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            )
            .map((submission) => (
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
        <tfoot>
          <tr>
            <td colSpan={5} className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ❮
              </button>
              
              <span>
                {pageNumbers.map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`${styles.pageNumber} ${
                      currentPage === pageNum ? styles.active : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </span>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                ❯
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
