import { useState, useEffect } from "react";
import axios from "axios";

export default function GetAlternatives({ medicinename, OverTheCounter }) {
    const [Medicine, setMedicine] = useState([]);

    useEffect(() => {
        getMedicine();
        async function getMedicine() {
            const res = await axios.get(`http://localhost:3001/showAlternatives`, {
                params: {
                    medicinename,
                    OverTheCounter,
                },
            });
            setMedicine(res.data);
        }
    }, [medicinename]);

    return Medicine;
}
