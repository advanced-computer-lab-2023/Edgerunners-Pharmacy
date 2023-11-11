import { useState, useEffect } from "react";
import axios from "axios";

function GetOrders({ orderid, cartItems, orderAddress, paymentMethod, orderStatus }) {
    const [order, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let username = sessionStorage.getItem("Username");

                const res = await axios.get("http://localhost:3001/getOrder", {
                    params: { username }
                }).then(res => {
                    console.log(res);
                    if (Array.isArray(res.data.order)) {
                        setOrders(res.data.order);
                    } else {
                        console.error('Invalid data format received:', res.data.order);
                    }
                });

            } catch (error) {
                console.error('Error fetching orders data:', error);
            }
        }

        fetchData();
    }, [orderid, cartItems, orderAddress, paymentMethod, orderStatus]);

    return order;
}

export default GetOrders;