import { useState, useEffect } from "react";
import axios from "axios";

function GetAddress({ state, city, street, apartment }) {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3001/getAddress", {
          params: {
            state,
            city,
            street,
            apartment,
          },
        });
        if (Array.isArray(res.data)) {
          // Assuming res.data is an array of objects with keys {state, city, street, apartment}
          // Modify this line to extract the necessary information you want to display
          const addresses = res.data.map(item => `${item.state}, ${item.city}, ${item.street}, ${item.apartment}`);
          setAddress(addresses);
        } else {
          console.error('Invalid data format received:', res.data);
        }
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    }

    fetchData();
  }, [state, city, street, apartment]);

  return address;
}

export default GetAddress;