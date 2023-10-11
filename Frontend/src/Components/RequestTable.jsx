import React, { useState, useEffect } from 'react';
import { makeRequestTable } from './makeRequestTable'; // Import the data generator
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
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

const RequestTable = () => {

  const [requests, setRequests] = useState([]); // Generate 10 random requests initially
  const [editMode, setEditMode] = useState({}); // Replace initialEditModeValue with your initial state value.
  const [forceEffect, setForceEffect] = useState(false); // Replace initialForceEffectValue with your initial state value.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getPharmacist");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setForceEffect(false);
  }, [forceEffect]);

  const handleAccept = async (email) => {
    // Find the request with the specified email and update its status to 'Accepted'
    const updatedRequests = requests.map((request) =>
      request.email === email ? { ...request, status: 'Accepted' } : request
    );

    try {
      // Send a PUT request to the server to update the status
      await axios.put('http://localhost:3001/updatePharmacist', {
        email, // Include the email of the request to update
        status: 'Accepted',
      });

      // Update the state with the modified requests
      setRequests(updatedRequests);

      // Update the editMode for the 'Accepted' status
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        'Accepted': false,
      }));

      // Set forceEffect or perform any other actions needed.
      setForceEffect(true);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handleReject = async (email) => {
    // Find the request with the specified email and update its status to 'Rejected'
    const updatedRequests = requests.map((request) =>
      request.email === email ? { ...request, status: 'Rejected' } : request
    );

    try {
      // Send a PUT request to the server to update the status
      await axios.put('http://localhost:3001/updatePharmacist', {
        email, // Include the email of the request to update
        status: 'Rejected',
      });

      // Update the state with the modified requests
      setRequests(updatedRequests);

      // Update the editMode for the 'Rejected' status
      setEditMode((prevEditMode) => ({
        ...prevEditMode,
        'Rejected': false,
      }));

      // Set forceEffect or perform any other actions needed.
      setForceEffect(true);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const pendingRequests = requests.filter((request) => request.status === 'Pending');

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
          {pendingRequests.map((request, index) => (
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
                <button
                  style={styles.acceptButton}
                  onClick={() => handleAccept(request.email)}
                >
                  Accept
                </button>
                <button
                  style={styles.rejectButton}
                  onClick={() => handleReject(request.email)}
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