import React, { useState, useEffect } from 'react';
import { makeOrderDetails } from './makeOrderDetails';
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
    cancelButton: {
        backgroundColor: '#D50000',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        marginRight: '5px',
        borderRadius: '5px',
    },
};

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState();
    const [orderStatus, setOrderStatus] = useState({});
    //incomplete

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await makeOrderDetails();
                console.log('Fetched data:', data);
                setOrders(data);
                const initialOrderStatus = {};
                data.forEach((order) => {
                    initialOrderStatus[order.id] = order.status;
                });
                setOrderStatus(initialOrderStatus);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleCancel = async (id) => {
        try {
            await axios.put('http://localhost:3001/cancelOrder', {
                username: sessionStorage.getItem("Username"),
                orderid: id,
            });
            setOrderStatus((prevOrderStatus) => ({
                ...prevOrderStatus,
                [id]: 'Cancelled',
            }));
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div style={styles.tableContainer}>
            <table style={styles.requestTable}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.tableCell}>Order Number</th>
                        <th style={styles.tableCell}>Cart Items</th>
                        <th style={styles.tableCell}>Delivery Address</th>
                        <th style={styles.tableCell}>Payment Method</th>
                        <th style={styles.tableCell}>Order Status</th>
                        <th style={styles.tableCell}>Action</th>
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
                                            {`${item.medicineName}: Count ${item.count}, Price ${item.price}, Total Price ${item.totalprice}`}
                                        </div>
                                    ))
                                ) : 'N/A'}</td>
                            <td style={styles.tableCell}>
                                {console.log('order.address:', JSON.stringify(order.address))}
                                {order.address ? JSON.stringify(order.address) : 'N/A'}
                            </td>

                            <td style={styles.tableCell}>{order.payment}</td>
                            <td style={styles.tableCell}>{orderStatus[order.id]}</td>
                            <td style={styles.tableCell}>
                                <button
                                    style={styles.cancelButton}
                                    onClick={() => handleCancel(order.id)}>
                                    Cancel Order
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default OrderDetails;