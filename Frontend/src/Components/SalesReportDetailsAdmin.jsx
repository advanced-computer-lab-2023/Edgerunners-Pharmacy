import React, { useState, useEffect } from 'react';
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
};

const SalesReportDetailsAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                // Replace SalesReportDetails() with the actual function or API call to fetch data
                const data = await SalesReportDetailsAdmin();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSort = (type) => {
        setSortBy(type);
        // Implement sorting logic here
        // For example, you can modify the 'orders' array based on the selected type
    };

    const handleMedicineChange = (event) => {
        setSelectedMedicine(event.target.value);
        // Implement logic to update orders based on selected medicine
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        // Implement logic to update orders based on selected month
    };

    return (
        <div style={styles.tableContainer}>
            <div className="items-center flex justify-center">
                <h2 style={{ color: '#93AFDA' }}>Sales Report</h2>
            </div>
            <div className="flex justify-end pb-4 space-x-4">
                {/* Dropdown menu for sorting by date */}
                <div>
                    <label className="text-gray-700">Sort by Date:</label>
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="text-sky-600 outline w-40 h-9 rounded-md -mt-60 shadow -mb-4"
                    >
                        <option value="">Select Month</option>
                        {/* Populate options based on your data */}
                        <option value="January">January</option>
                        <option value="February">February</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            </div>
            <table style={styles.requestTable}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Medicine Name</th>
                        <th style={styles.tableCell}>Sales</th>
                        <th style={styles.tableCell}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr
                            key={order.id}
                            style={index % 2 === 0 ? styles.evenRow : {}}
                        >
                            <td style={styles.tableCell}>{order.id}</td>
                            <td style={styles.tableCell}>
                                {order.cartItems ? (
                                    order.cartItems.map((item, index) => (
                                        <div key={index}>
                                            {item.medicineName}
                                        </div>
                                    ))
                                ) : 'N/A'}
                            </td>
                            <td style={styles.tableCell}>
                                {order.cartItems ? (
                                    order.cartItems.map((item, index) => (
                                        <div key={index}>
                                            {item.count}
                                        </div>
                                    ))
                                ) : 'N/A'}
                            </td>
                            <td style={styles.tableCell}>
                                {order.cartItems ? (
                                    order.cartItems.map((item, index) => (
                                        <div key={index}>
                                            {item.date}
                                        </div>
                                    ))
                                ) : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReportDetailsAdmin;
