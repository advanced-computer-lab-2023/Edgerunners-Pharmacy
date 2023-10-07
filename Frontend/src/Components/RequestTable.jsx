import React, { useState } from 'react';
import { makeRequestTable } from './makeRequestTable'; // Import the data generator

const styles = {
  tableContainer: {
    margin: '20px',
  },
  requestTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  acceptButton: {
    backgroundColor: '#198D19',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '5px',
    borderRadius: '5px',
  },
  rejectButton: {
    backgroundColor: '#D50000',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '5px',
    borderRadius: '5px',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

const RequestTable = () => {

    const [requests, setRequests] = useState(makeRequestTable(10)); // Generate 10 random requests initially

    const handleAccept = (id) => {
        // Find the request with the specified id
        const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request, status: 'Accepted' } : request
        );

        // Update the state with the modified requests
        setRequests(updatedRequests);
    };

    const handleReject = (id) => {
        // Find the request with the specified id
        const updatedRequests = requests.map((request) =>
        request.id === id ? { ...request, status: 'Rejected' } : request
        );

        // Update the state with the modified requests
        setRequests(updatedRequests);
    };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.requestTable}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Username</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Email</th>
            <th style={styles.tableCell}>Password</th>
            <th style={styles.tableCell}>Date of Birth</th>
            <th style={styles.tableCell}>Hourly Rate</th>
            <th style={styles.tableCell}>Affiliation</th>
            <th style={styles.tableCell}>Educational Background</th>
            <th style={styles.tableCell}>Status</th>
            <th style={styles.tableCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr
              key={request.id}
              style={index % 2 === 0 ? styles.evenRow : {}}
            >
              <td style={styles.tableCell}>{request.id}</td>
              <td style={styles.tableCell}>{request.username}</td>
              <td style={styles.tableCell}>{request.name}</td>
              <td style={styles.tableCell}>{request.email}</td>
              <td style={styles.tableCell}>{request.password}</td>
              <td style={styles.tableCell}>{request.dob}</td>
              <td style={styles.tableCell}>${request.hourlyRate}</td>
              <td style={styles.tableCell}>{request.affiliation}</td>
              <td style={styles.tableCell}>{request.education}</td>
              <td style={styles.tableCell}>{request.status}</td>
              <td style={styles.tableCell}>
                {request.status === 'Pending' && (
                  <>
                    <button
                      style={styles.acceptButton}
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>
                    <button
                      style={styles.rejectButton}
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;