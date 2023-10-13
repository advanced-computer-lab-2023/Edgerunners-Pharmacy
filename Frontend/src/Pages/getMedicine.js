import { useState, useEffect } from "react";
import axios from "axios";

export default function GetMedicine({ Name, MedicinalUse}) {
    const [Medicine, setMedicine] = useState([]);
  
    useEffect(() => {
      getMedicine();
      async function getMedicine() {
        const res = await axios.get(`http://localhost:3001/getMedicine`, {
          params: {
            Name,
            MedicinalUse,
          },
        });
        setMedicine(res.data);
      }
    }, [Name, MedicinalUse]); // Include the filter parameters in the dependency array
  
    return Medicine;
  }
