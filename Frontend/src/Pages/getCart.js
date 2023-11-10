import { useState, useEffect } from "react";
import axios from "axios";

function GetCart({ medicineName, count, price, onUpdateCart }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("http://localhost:3001/getcart", {
                    params: {
                        medicineName,
                        count,
                        price,
                    },
                });
                if (Array.isArray(res.data)) {
                    setCart(res.data);
                    onUpdateCart(res.data); // Notify the parent component about the updated cart
                } else {
                    console.error('Invalid data format received:', res.data);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        }

        fetchData();
    }, [medicineName, count, price, onUpdateCart]);

    return cart;
}

export default GetCart;