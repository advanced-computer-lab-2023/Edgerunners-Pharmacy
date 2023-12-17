import { useState, useEffect } from "react";
import axios from "axios";

export function FetchDoctors() {
  const [doctors, setdoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
    async function fetchDoctors() {
      try {
        const response = await axios.get(
          "http://localhost:3001/getDoctorsChat"
        );
        if (response.data.success) {
          setdoctors(response.data.data);
        } else {
          console.error(response.data.message);
        }

        //console.log(doctors);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    }
  }, []);

  return doctors;
}