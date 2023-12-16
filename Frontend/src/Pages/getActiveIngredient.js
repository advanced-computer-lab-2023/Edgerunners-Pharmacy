import { useState, useEffect } from "react";
import axios from "axios";

export default function GetActiveIngredient() {
    const [ActiveIngredient, setActiveIngredient] = useState([]);

    useEffect(() => {
        async function getActiveIngredient() {
            try {
                const res = await axios.get(`http://localhost:3001/getActiveIngredient`);
                setActiveIngredient(res.data);
            } catch (error) {
                console.error("Error fetching active ingredients:", error);
            }
        }
        getActiveIngredient();
    }, []);
    return ActiveIngredient;
}