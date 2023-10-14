import React, { useState, useEffect } from 'react';
import { makeRequestTable } from './makeRequestTable'; 
import axios from 'axios';

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
};

const RequestTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await makeRequestTable();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleAccept = async (username) => {
    try {
      await axios.put('http://localhost:3001/updatePharmacist', {
        Username : username, 
        ReqStatus: 'Accepted',
      });
      const updatedRequests = requests.map((request) =>
        request.username === username ? { ...request, reqStatus: 'Accepted' } : request
      );

      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error updating data:', error);
      console.error('MongoDB Error:', error.response.data);
    }
  };

  const handleReject = async (username) => {
    try {
      await axios.put('http://localhost:3001/updatePharmacist', {
        Username : username,
        ReqStatus: 'Rejected',
      });

      const updatedRequests = requests.map((request) =>
        request.username === username ? { ...request, reqStatus: 'Rejected' } : request
      );

      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const pendingRequests = requests.filter((request) => request.reqStatus === 'Pending');

  return (
    <div style={styles.tableContainer}>
      <table style={styles.requestTable}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Username</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Email</th>
            <th style={styles.tableCell}>Date of Birth</th>
            <th style={styles.tableCell}>Hourly Rate</th>
            <th style={styles.tableCell}>Affiliation</th>
            <th style={styles.tableCell}>Educational Background</th>
            <th style={styles.tableCell}>Status</th>
            <th style={styles.tableCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request, index) => (
            <tr
              key={request.id}
              style={index % 2 === 0 ? styles.evenRow : {}}
            >
              <td style={styles.tableCell}>{request.id}</td>
              <td style={styles.tableCell}>{request.username}</td>
              <td style={styles.tableCell}>{request.fullName}</td>
              <td style={styles.tableCell}>{request.email}</td>
              <td style={styles.tableCell}>{request.dateOfBirth}</td>
              <td style={styles.tableCell}>{request.hourlyRate}</td>
              <td style={styles.tableCell}>{request.affiliation}</td>
              <td style={styles.tableCell}>{request.educationalBackground}</td>
              <td style={styles.tableCell}>{request.reqStatus}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.acceptButton}
                  onClick={() => handleAccept(request.username)}
                >
                  Accept
                </button>
                <button
                  style={styles.rejectButton}
                  onClick={() => handleReject(request.username)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;