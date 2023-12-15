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
    const [salesInfo, setSalesInfo] = useState([]);
    const [salesID, setSalesID] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("http://localhost:3001/getSales", {
                    params: { month: selectedMonth },
                });
                setSalesInfo(res.data);

                const generatedSalesIDs = res.data.map((_, index) => index + 1);
                setSalesID(generatedSalesIDs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [selectedMonth]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div style={styles.tableContainer}>
            <div className="items-center flex justify-center">
                <h2 style={{ color: '#93AFDA' }}>Sales Report</h2>
            </div>
            <div className="flex justify-end pb-4 space-x-4">
                {/* Dropdown menu for sorting by month */}
                <div>
                    <label className="text-gray-700">Choose Month:</label>
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="text-sky-600 outline w-40 h-9 rounded-md -mt-60 shadow -mb-4"
                    >
                        <option value={""}>Select Month</option>
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>December</option>
                    </select>
                </div>
            </div>
            <table style={styles.requestTable}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Sales ID</th>
                        <th style={styles.tableCell}>Medicine Name</th>
                        <th style={styles.tableCell}>Number of sales</th>
                        <th style={styles.tableCell}>Price</th>
                        <th style={styles.tableCell}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {salesInfo.map((sale, index) => (
                        <tr key={salesID[index]} style={index % 2 === 0 ? styles.evenRow : {}}>
                            <td style={styles.tableCell}>{salesID[index]}</td>
                            <td style={styles.tableCell}>{sale.medicineName}</td>
                            <td style={styles.tableCell}>{sale.quantity}</td>
                            <td style={styles.tableCell}>{sale.price}</td>
                            <td style={styles.tableCell}>{sale.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReportDetailsAdmin;
