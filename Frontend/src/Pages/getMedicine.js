import { useState, useEffect } from "react";
import axios from "axios";

export default function GetMedicine({ Name, Description}) {
    const [Medicine, setMedicine] = useState([]);
  
    useEffect(() => {
      getMedicine();
      async function getMedicine() {
        const res = await axios.get(`http://localhost:3001/getMedicine`, {
          params: {
            Name,
            Description,
          },
        });
        setMedicine(res.data);
      }
    }, [Name, Description]); // Include the filter parameters in the dependency array
  
    return Medicine;
  }
