import { useState, useEffect } from "react";
import axios from "axios";

function GetCart({ medicineName, count, price }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let username = sessionStorage.getItem("Username");

                const res = await axios.get("http://localhost:3001/getcart", {
                    params: { username }
                }).then(res => {
                    console.log(res);
                    if (Array.isArray(res.data.cart)) {
                        setCart(res.data.cart);
                        //onUpdateCart(res.data); // Notify the parent component about the updated cart
                    } else {
                        console.error('Invalid data format received:', res.data.cart);
                    }
                });

            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        }

        fetchData();
    }, [medicineName, count, price]);

    return cart;
}

export default GetCart;