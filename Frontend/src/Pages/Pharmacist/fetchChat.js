import { useState, useEffect } from "react";
import axios from "axios";

export function FetchPatients() {
  const [patient, setpatient] = useState([]);

  useEffect(() => {
    fetchPatients();
    async function fetchPatients() {
      try {
        const response = await axios.get(
          "http://localhost:3001/getPatientsChat"
        );
        if (response.data.success) {
          setpatient(response.data.data);
        } else {
          console.error(response.data.message);
        }

        //console.log(doctors);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    }
  }, []);

  return patient;
}