import { useState, useEffect } from "react";
import axios from "axios";

export default function GetMedicinalUse() {
    const [MedicinalUse, setMedicinalUse] = useState([]);

    useEffect(() => {
        async function getMedicinalUse() {
            try {
                const res = await axios.get(`http://localhost:3001/getMedicinalUse`);
                setMedicinalUse(res.data);
            } catch (error) {
                console.error("Error fetching medicinal uses:", error);
            }
        }
        getMedicinalUse();
    }, []);
    return MedicinalUse;
}